'use strict';
require('dotenv').config({silent: true});
require('app-module-path').addPath('./dist');
module.exports = require('./dist/<%= name %>/index.js');