
import elephasConfig from './elephasConfig';
import webpack from 'webpack';
import webpackConfig from '../../../webpack.config.js';
import fs from 'fs';
import express from 'express';

var elephas = require('elephas/lib/framework')(elephasConfig);
const indexHTML = fs.readFileSync('./src/<%= name%>/public/index.html');

elephas.createServer({
    beforeMiddleware: (done, app) => {
        //
        // Webpack hot module replacement
        // Make sure this stays behind a dev feature flag
        if (process.env.NODE_ENV !== 'production') {
            var compiler = webpack(webpackConfig.development);

            app.use(require('webpack-dev-middleware')(compiler, {
                noInfo: true,
                publicPath: webpackConfig.development.output.publicPath
            }));

            app.use(require('webpack-hot-middleware')(compiler));
        }

        return done();
    },
    afterRoutes: (done, app) => {

        // Simple Static
        app.use('/', express.static('src/<%= name %>/public'));

        // General Errors
        app.use((err, req, res, next) => {
            console.error(err);
            return res.status(500).end(indexHTML);
        });

        // General 404's
        app.use('*', (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            return res.status(404).end(indexHTML);
        });

        return done();
    }
});
