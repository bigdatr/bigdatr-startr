var BROWSERS = ['Firefox', 'Chrome'];

module.exports = function(config) {
    config.set({
        browsers: BROWSERS,
        frameworks: ['jasmine', 'sinon'],
        files: [
            '../src/**/*-test.js'
        ],
        preprocessors: {
            '../src/**/*-test.js': ['webpack', 'sourcemap']
        },
        reporters: ['coverage', 'junit'],
        singleRun: true,
        autoWatch: false,
        autoWatchBatchDelay: 400,
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx', '.md']
            },
            module: {
                preLoaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules\/(?!<%= name %>).*/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules\/(?!<%= name %>).*|tests/,
                        loader: 'isparta'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true,
            stats: {
                colors: true,
                chunks: false,
                timings: true
            }
        },
        coverageReporter: {
            dir: process.env.CIRCLE_ARTIFACTS || 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'cobertura', subdir: '.', file: 'coverage.xml' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },
        junitReporter: {
            outputDir: process.env.CIRCLE_TEST_REPORTS || 'junit'
        }
    });
};


