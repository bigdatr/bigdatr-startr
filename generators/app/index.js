'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var getPrompts = require('./constants/prompts');

function copyFiles(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
}

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the radical ' + chalk.magenta('BigdatrStartr') + ' generator!'
        ));

        this.prompt(getPrompts(this), function (props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyFiles.bind(this);
            copy('_editorconfig',       '.editorconfig');
            copy('_eslintrc',           '.eslintrc');
            copy('_gitignore',          '.gitignore');
            copy('_Gruntfile.js',       'Gruntfile.js');
            copy('_package.json',       'package.json');
            copy('_README.md',          'README.md');
            copy('_webpack.config.js',  'webpack.config.js');
        },

        projectfiles: function() {
            var copy = copyFiles.bind(this);
            copy('server/_index.js',  'index.js');
        }
    },

    install: function () {
        this.installDependencies({
            bower: false
        });
    }
});
