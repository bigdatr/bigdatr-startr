require('dotenv').config({silent: true});
require('app-module-path').addPath('./src');
require('babel-register');
require('./src/<%= name %>/server/server.js');
