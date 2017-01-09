'use strict';
require('babel-register');

require('app-module-path').addPath('./src');

module.exports = require('<%= name %>/index.js');
