'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    var promptValues = this.config.get('promptValues');

    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), {
        ...promptValues,
        varname: promptValues.name.replace(/[^a-zA-Z]/g, '')
    });
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
            copy('src/_index.js', 'src/index.js');
            copy('src/_index-test.js', 'src/index-test.js');
            copy('scripts/_publish.js', 'scripts/publish.js');
            copy('_babelrc', '.babelrc');


            if(this.config.get('promptValues').example) {
                copy('_example-babelrc', 'example/.babelrc');
                copy('example/**', 'example');
            }
        }
    }
});
