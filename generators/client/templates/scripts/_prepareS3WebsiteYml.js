require('dotenv').config({silent: true});

const fs = require('fs');
const AWS = require('aws-sdk');
const mustache = require('mustache');
const getBranch = require('./getBranch');
const safeBranchName = require('./safeBranchName');
const findDistribution = require('./findDistribution');

const region = process.env.<%= nameConstant %>_AWS_S3_ENDPOINT;
const bucket = process.env.<%= nameConstant %>_AWS_S3_BUCKET_NAME;

const getOriginPath = () => {
    console.log('Finding branch...');
    return getBranch()
        .then(branch => {
            const safeBranch = safeBranchName(branch);

            if(safeBranch === 'master') {
                console.log(`On master branch - setting origin path and s3 key prefix to '' so that site is not deployed to subfolder`);
                return {subfolder: ''};
            } else {
                console.log(`Using ${safeBranch} as subfolder name`);
                return {subfolder: safeBranch};
            }
        });
};

const getDistributionID = (result) => {
    const {subfolder} = result;
    console.log('Finding distribution');
    return findDistribution(subfolder, region, bucket)
        .then(distribution => {
            if(distribution) {
                const distributionId = distribution.Id;
                console.log(`Found distribution with ID ${distributionId}`);
                return {subfolder, distribution: distributionId};
            } else {
                console.log(`No matching distribution found - but don't worry, a new one will be created`);
                return {subfolder, distribution};
            }
        });
};

const getCredentials = (result) => {
    return new Promise((resolve, reject) => {
        const config = new AWS.Config();
        config.getCredentials(function(err, credentials){
            if(err) return reject(err);
            resolve(Object.assign({}, result, {credentials}));
        });
    });
};


const getConfigTemplate = (result) => {
    const {subfolder, distribution, credentials} = result;
    return new Promise((resolve, reject) => {
        console.log('Getting s3_website config template');
        fs.readFile('s3_website-template.yml', 'utf8', (err, template) => {
            if(err) return reject(err);
            resolve({template, distribution, subfolder, credentials});
        });
    });
};

const generateConfigFile = (result) => {
   const {subfolder, distribution, template, credentials} = result;

    return new Promise((resolve, reject) => {
        console.log('Writing s3_website config file');
        let config = mustache.render(template, {
            aws_id: credentials.accessKeyId,
            aws_secret: credentials.secretAccessKey,
            s3_bucket: bucket,
            cloudfront_distribution: distribution,
            s3_endpoint: region,
            s3_subfolder: subfolder
        });

        if(!distribution) {
            // @TODO be smarter about this...
            config = config.replace(/cloudfront_distribution_id:\s*?\n/, '');
            config = config.replace(/\borigin_path:\s*?\/\n/, 'origin_path: ""\n');
            config = config.replace(/\bs3_key_prefix:\s*?\n/, '');
        }
        fs.writeFile('s3_website.yml', '# THIS FILE IS AUTO GENERATED - DO NOT EDIT – DO NOT COMMIT INTO SOURCE CONTROL\n\n' + config, (err) => {
            if(err) return reject(err);
            console.log('Great success!');
            resolve();
        });
    });
};

getOriginPath()
    .then(getDistributionID)
    .then(getCredentials)
    .then(getConfigTemplate)
    .then(generateConfigFile)
    .catch(err => {console.error(err); process.exit(1)});

