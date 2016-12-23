require('dotenv').config({silent: true});

const fs = require('fs');

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


const getConfigTemplate = (result) => {
    const {subfolder, distribution} = result;
    return new Promise((resolve, reject) => {
        console.log('Getting s3_website config template');
        fs.readFile('s3_website-template.yml', 'utf8', (err, template) => {
            if(err) return reject(err);
            resolve({template, distribution, subfolder});
        });
    });
};

const generateConfigFile = (result) => {
    const {subfolder, distribution, template} = result;

    return new Promise((resolve, reject) => {
        console.log('Writing s3_website config file');
        let config = mustache.render(template, {
            aws_id: process.env.<%= nameConstant %>_AWS_ACCESS_KEY_ID,
            aws_secret: process.env.<%= nameConstant %>_AWS_SECRET_ACCESS_KEY,
            s3_bucket: bucket,
            cloudfront_distribution: distribution,
            s3_endpoint: region,
            s3_subfolder: subfolder
        });

        if(!distribution) {
            config = config.replace(/cloudfront_distribution_id.*?\n/, '');
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
    .then(getConfigTemplate)
    .then(generateConfigFile)
    .catch(err => {console.error(err); process.exit(1)});

