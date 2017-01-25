'use strict';
require('babel-register');
require('dotenv').config({silent: true});
require('app-module-path').addPath('./src');

module.exports = require('<%= name %>/index.js');
