'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.config.get('promptValues'));
}

module.exports = yeoman.extend({
    prompting() {
        return this
            .prompt(getPrompts(this))
    },
    writing: {
        app() {
            var copy = copyTpl.bind(this);
            copy('_package.json', 'package.json');
            copy('_circle.yml', 'circle.yml');
            copy('.sass-lint.yml');
            copy('src/**', 'src');
        }
    }
});
