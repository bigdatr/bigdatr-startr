# bigdatr startr


## Installation

```
npm install -g yo
npm install -g generator-bigdatr-startr
yo bigdatr-startr
```

---


## Generators


### Scaffold

Builds out a full app scaffold with client & server

#### Tasks

| Command                   | Description                                  |
|---------------------------|----------------------------------------------|
| `grunt default`           | Starts the app in development mode           |
| `grunt build`             | Builds out a production version of the app   |
| `grunt build:development` | Builds out static files without minification |
| `grunt test`              | Runs all tests                               |
| `grunt testing`           | Starts the testing environment               |


### Client

A generator for a simple static client that queries apis for dynamic data.


#### Features

- Integrated deployment to S3 Cloudfront with [s3_website](https://github.com/laurilehmijoki/s3_website)
- Hashing of asset filenames to allow for aggressive caching
- asset management and bundling with [file-loader](https://github.com/webpack/file-loader)
- Prerending of react jsx to HTML for super quick loading with [static-site-generator-webpack-plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin)
- Testing with [ava](https://github.com/avajs/ava)
- Test coverage with [nyc](https://github.com/istanbuljs/nyc)
- docs with [jsdonk](https://github.com/dxinteractive/jsdonk)
- Bundling with babel and webpack

#### Getting started

The generator will run `yarn install` and `yarn run build-dev` for you. `yarn run build-dev` will create the necessary html files to run the app locally. 

To start developing, run the watch command:

```
yarn watch
```

This will start webpack-dev-server at the port you specified in the setup.


#### S3/CloudFront Deployment setup

1. If you didn't specify a s3-bucket to deploy to in the initial setup you can do so now in the `.env` file.
2. Add your AWS credentials to the `.env` file.
3. For deployments through circleci to work, a cloudfront distribution must be created. This can be done manually through aws or automatically with s3 website. To automatically create a cloudfront distribution run `s3_website cfg apply` and when asked if you want to deliver your website via CloudFront, say yes.
4. This will automatically create the cloudfront distribution and will add the distribution ID to your `s3_website.yml` file.
5. Copy the `cloudfront_distribution_id` value from the `s3_website.yml` file and place it in the `.env` file. 
6. Remove the `cloudfront_distribution_id` line that `s3_website` added to the `s3_website.yml` so that it will be read from the `.env` file instead.

The website is now ready to be deployed and as long as the environment variables are set correctly, will deploy automatically via circle-ci when changes are merged into the master branch. 


#### Tasks

| Command                   | Description                                                                   |
|---------------------------|-------------------------------------------------------------------------------|
| `yarn run ava`            | Run ava tests                                                                 |
| `yarn run build`          | Runs a production build of the app, including prerendering and file hashing   |
| `yarn run build-dev`      | Runs a development build of the app. Needs to be run before `yarn run watch`  |
| `yarn run check-coverage` | Checks test coverage                                                          |
| `yarn run docs`           | Builds out documentation using jsdoc/jsdonk                                   |
| `yarn run flow`           | Runs a flow check of the source code                                          |
| `yarn run lint`           | Runs eslint on source code                                                    |
| `yarn run lint-fix`       | Attempts to fix eslint errors                                                 |
| `yarn run test`           | Runs tests and coverage checks                                                |
| `yarn run test-all`       | Runs all tests, flow, and linting                                             |
| `yarn run watch`          | Boots up webpack-dev-server for devving                                       |

