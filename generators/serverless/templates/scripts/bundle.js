const glob = require('glob-all');
const yaml = require('js-yaml');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

/**
 *
 * Empties bundle folder so that changes to package config will be accurately reflected by files.
 */
const emptyBundle = () => {
    return new Promise((resolve, reject) => {
        fse.emptyDir('bundle', (err) => {
            if(err) return reject(err);
            resolve();
        });
    });
};


/**
 *
 * Loads and parses serverless config
 */
const getServerlessConfig = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('serverless.yml', 'utf8', (err, data) => {
            if(err) return reject(err);
            resolve(yaml.safeLoad(data));
        });
    })
};

/**
 * Globs files following a similar process that serverless uses.
 * The main notable difference is that serverless prepends a '**' glob to your globs which means
 * that the entire node_modules directory is traversed - which is _extremely_ slow. This instead
 * uses a whitelist and explicitly excludes copying node modules - seeing as `yarn install --prod`
 * will be run within the bundle folder after bundling is complete.
 * 
 * @param {Object} confg - Serverless config
 */

const globFiles = (config) => {
    return new Promise((resolve, reject) => {
        const exclude = (config && config.package && config.package.exclude || []).map(pattern => {
            if (pattern.charAt(0) !== '!') {
                return `!${pattern}`;
            } else {
                return pattern.substring(1);
            }
        });
        const include = config && config.package && config.package.include || [];

        const packageInclude = Object.keys(config.functions || {}).reduce((include, funcName) => {
            const func = config.functions[funcName];
            if(!func.package || !func.package.include) return include;
            return include.concat(func.package.include);
        }, []);

        const patterns = []
            .concat(exclude)
            .concat(include)
            .concat(packageInclude)
            .concat([
                // Add other required files
                'yarn.lock',
                'package.json',
                '.env',
                'serverless.yml'
            ])
            .filter(pattern => !pattern.match(/node_modules/)); // don't include node modules

        glob(patterns, function(err, files){
            if(err) return reject(err);
            resolve(files);
        });
    })
};

/**
 *
 * Move the globbed files into the bundle folder.
 */
const moveFiles = (files) => {
    return new Promise((resolve, reject) => {
        files.reduce((promiseChain, file) => {
            return promiseChain.then(() => new Promise((resolve, reject) => {
                fs.stat(file, (err, stats) => {
                    if(err) return reject(err);
                    if(stats.isDirectory()) return resolve(file);

                    console.log('copying: ' + file);
                    fse.copy(file, path.join('bundle', file), (err) => {
                        if(err) return reject(err);
                        resolve(file);
                    });
                });
            }))
        }, Promise.resolve())
            .then(resolve)
            .catch(reject);

    });
};

console.log('Preparing bundle...');
// Execute things in order
Promise.resolve()
    .then(emptyBundle)
    .then(getServerlessConfig)
    .then(globFiles)
    .then(moveFiles)
    .catch((err) => console.error(err));
