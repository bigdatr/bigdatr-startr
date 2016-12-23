require('dotenv').config({silent: true});

const GitHubApi = require('github');
const getBranch = require('./getBranch');
const safeBranchName = require('./safeBranchName');
const findDistribution = require('./findDistribution');
const pkg = require('../package.json');
const GitUrlParse = require("git-url-parse");

const region = process.env.<%= nameConstant %>_AWS_S3_ENDPOINT;
const bucket = process.env.<%= nameConstant %>_AWS_S3_BUCKET_NAME;
const repoUrl = GitUrlParse(pkg.repository.url);
const repo = repoUrl.name;
const owner = repoUrl.owner;

const github = new GitHubApi();

github.authenticate({
    type: 'oauth',
    token: process.env.<%= nameConstant %>_GITHUB_API_KEY
});

const getPreviewUrl = () => {
    return getBranch()
        .then(branch => safeBranchName(branch))
        .then(subfolder => findDistribution(subfolder, region, bucket))
        .then(distribution => distribution && distribution.DomainName
            ? `https://${distribution.DomainName}`
            : Promise.reject('No preview found')
        );
};


const findPR = () => {
    return getBranch()
        .then(branch => {
            return new Promise((resolve, reject) => {
                github.pullRequests.getAll({
                    owner,
                    repo,
                    state: 'open'
                }, function(err, res) {
                    if(err) return reject(err);
                    const matchedPR = res.filter(PR => PR.head.ref === branch)[0];
                    if(matchedPR) return resolve(matchedPR);
                    reject(new Error(`Couldn't find PR to post to`));
                });
            });
        });
};

const postComment = (PR, url) => {
    return new Promise((resolve, reject) => {
        github.issues.getComments({
            owner,
            repo,
            number: PR.number
        }, (err, res) => {
            if(err) return reject(err);

            if(res.length > 0 && res.filter(comment => comment.body.indexOf(url) !== -1)) {
                return reject(new Error('(not really an error per se) URL has already been posted'));
            } else {
                github.issues.createComment({
                    owner,
                    repo,
                    number: PR.number,
                    body: `You can preview this PR at [${url}](${url}).\n(it can take up to 15 minutes to show up if the cloudfront distribution has just been created)`
                }, (err, res) => {
                    if(err) reject(err);
                    resolve(res);
                });
            }
        });
    });
}

const notify = (url) => {
    return findPR()
        .then((PR) => postComment(PR, url));
};

getPreviewUrl()
    .then(notify)
    .catch(err => console.error(err));




