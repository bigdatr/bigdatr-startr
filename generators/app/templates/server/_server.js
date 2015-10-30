

// Routers

import elephasConfig from './elephasConfig';
import elephas from 'elephas/lib/framework')(elephasConfig;

import webpack from 'webpack';
import webpackConfig from '../../../../webpack.config.js';

import fs from 'fs';

const indexHTML = fs.readFileSync('./src/<%= name %>/public/index.html');

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
        app.use('*', function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            return res.end(indexHTML);
        });

        app.use(function(err, req, res, next) {
            var status = err.status || 500;
            console.error(err.stack);
            return res.status(status).send(err);
        });

        return done();
    }
});
