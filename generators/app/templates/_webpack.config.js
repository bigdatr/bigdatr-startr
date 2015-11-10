require('es6-promise').polyfill();
var webpack = require('webpack');
var path = require('path');
var create = require('lodash/object/create');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');




var SRC = './src/<%= name %>/client/client.js';
var DEST = './src/<%= name %>/client/<%= name %>.js';

//
// Loaders
//
var JS_LOADER = {
    test: /\.jsx?$/,
    exclude: /node_modules\/(?!<%= name %>)/,
    loaders: ['babel']
};
var JSON_LOADER = {
    test: /\.json$/,
    loader: 'json-loader'
};
var FONT_LOADER = {
    test: /\.(otf|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader',
    query: {
        limit: '10000',
        name: '[name].[ext]'
    }
};


//
// Development/base configuration
//
var development = {
    devtool: 'source-map',
    cache: true,
    entry: [
        'webpack-hot-middleware/client?http://0.0.0.0:3000',
        SRC
    ],
    output: {
        path: path.resolve(__dirname, DEST),
        filename: '<%= name %>.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            react: path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")}})
    ],
    module: {
        loaders: [
            JS_LOADER,
            JSON_LOADER,
            FONT_LOADER,
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({browsers: ['last 2 version', 'ie 9']})
        ];
    },
    eslint: {
        configFile: '.eslintrc',
        formatter: require('eslint-simple-formatter')
    }
};


//
// Production config
// Extends the development options and then tweaks some things
//
// Uglyfies and merges components
// Uses the extract text plugin to serve uninlined css
// Minifies css and packs medai queries together
// Uses the external builds for core libraries
//
var production = create(development, {
    devtool: undefined,
    cache: false,
    entry: SRC,
    plugins: [
        new webpack.BannerPlugin('"use strict";', {raw: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: process.env.NODE_ENV || JSON.stringify('production')}}),
        new ExtractTextPlugin("<%= name %>.css")
    ],
    module: {
        loaders: [
            JS_LOADER,
            JSON_LOADER,
            FONT_LOADER,
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer({browsers: ['last 2 version', 'ie 9']}),
            mqpacker,
            csswring
        ];
    },
    externals: {
        react: 'React',
        'react/addons': 'React',
        immutable: 'Immutable'
    }
});

module.exports = {
    development: development,
    production: production
};
