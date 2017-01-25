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
    writing() {
        var copy = copyTpl.bind(this);
        const {name} = this.config.get('promptValues');
        var MODULE_PATH = `src/${name}`;

        // Configs
        copy('Gruntfile.js');
        copy('.babelrc');
        copy('.env');
        copy('package.json');
        copy('webpack.config.js');
        copy('index.js');

        // Folders
        copy('src/**', MODULE_PATH);

        this.fs.copy(
            this.templatePath('src/public/favicon.ico'),
            this.destinationPath(`${MODULE_PATH}/public/favicon.ico`),
            this.config.get('promptValues')
        );
    }
});
