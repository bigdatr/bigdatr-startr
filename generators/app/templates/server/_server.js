import elephasConfig from './elephasConfig';
import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticIndex from './index.static.jsx';
import webpack from 'webpack';
import webpackConfig from '../../../webpack.config.js';

var elephas = require('elephas/lib/framework')(elephasConfig);

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

        app.use('/api/*', (req, res) => {
            return res.status(404).json({
                error: 404,
                message: 'API route not found.'
            });
        });

        // The client code
        app.use('*', (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            return res.send('<!DOCTYPE html>' + ReactDOMServer.renderToString(<StaticIndex/>));
        });

        return done();
    }
});
