var generators = require('yeoman-generator');
var ejs = require('ejs');
var services;
var prompts;
var actions;
var preActions;
var templateActions;
var _this;


/**
 * Generator object for inheritance of Yeoman.Base with different services, prompts and actions files.
 * To use the generator in you Yeoman generator, create a new Generator instance with your local files and export the return value of Generator.getInstance()
 * @param externalService - local generator services.js file
 * @param externalPrompts - local generator prompts.json file
 * @param externalActions - local generator actions.json file
 * @constructor
 */
function Generator (externalService, externalPrompts, externalActions) {
    services = externalService;
    prompts = externalPrompts;
    actions = externalActions;
    preActions  = actions.actions;
    templateActions = actions.templates;

}

/**
 * Get instance will create extension to the Yeoman Base with your local dependencies
 * @returns {Object} Yeoman Base extended object
 */
Generator.prototype.getInstance = function () {
    return generators.Base.extend({
        initializing: function () {
            _this = this;
        },
        prompting: function () {
            return this.prompt(prompts).then(function(props){
                this.props = props;
            }.bind(this));
        },
        writing:  function () {
            templateActions.map(function(file){
                console.log(this.props);
                this.fs.copyTpl(
                    this.templatePath(ejs.render(file.templatePath, this.props)),
                    this.destinationPath(ejs.render(file.destinationPath, this.props)),
                    this.props
                )
            }.bind(this))
            //this.log(this.props);
        },
        end:  function () { /* ... */  }
    });
};

module.exports = Generator;
