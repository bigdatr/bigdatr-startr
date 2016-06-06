var Generator = require('../generator');
//var services = require('./services');
var prompts = require('./prompts');
var actions = require('./actions');

var generator = new Generator(null, prompts, actions);

module.exports = generator.getInstance();
