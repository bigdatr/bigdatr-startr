'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to || from), this.config.get('promptValues'));
}

module.exports = yeoman.extend({
    prompting() {
        return this.prompt(getPrompts(this));
    },
    writing: {
        app() {
            var copy = copyTpl.bind(this);
            copy('circle.yml');
            copy('dev.js');
            copy('.env');
            copy('package.json');
            copy('prod.js');
            copy('local.js');
            copy('serverless.yml');
            copy('_gitignore', '.gitignore');
            copy('interfaces/**', 'interfaces');
            copy('scripts/**', 'scripts');
            copy('_babelrc', '.babelrc');
        },
        projectfiles() {
            var copy = copyTpl.bind(this);
            const {name, graphql} = this.config.get('promptValues');
            var MODULE_PATH = `src/${name}`;

            copy('src/index.js', `${MODULE_PATH}/index.js`);

            if(graphql) {
                copy('src/**', MODULE_PATH);
            }
        }
    }
});
