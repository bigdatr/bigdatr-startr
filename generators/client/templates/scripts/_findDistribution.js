const AWS = require('aws-sdk');
const cloudfront = new AWS.CloudFront({apiVersion: '2016-11-25'});

new AWS.Config({
    credentials: {
        accessKeyId: process.env.<%= nameConstant %>_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.<%= nameConstant %>_AWS_SECRET_ACCESS_KEY
    }
})

module.exports = (subfolder, region, bucket) => {
    return new Promise((resolve, reject) => {
        cloudfront.listDistributions({}, (err, data) => {
            if(err) return reject(err);

            const matchingDistributions = data.DistributionList.Items.filter(distribution => {
                const origin = distribution.Origins.Items[0];
                if(!origin) return false;
                return origin.DomainName === `${bucket}.s3-website-${region}.amazonaws.com` &&
                       origin.OriginPath === `/${subfolder}`;
            });

            if(matchingDistributions.length > 1) {
                reject(new Error('More than one possible distribution found'));
            } else {
                if(matchingDistributions.length === 1) {
                    const distribution = matchingDistributions[0];
                    resolve(distribution);
                } else {
                    resolve(null);
                }
            }

        });
    });
};