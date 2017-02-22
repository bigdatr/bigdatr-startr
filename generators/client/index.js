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
            copy('.env');
            copy('_gitignore', '.gitignore');
            copy('package.json');
            copy('s3_website-template.yml');
            copy('webpack.config.js');
            copy('_babelrc', '.babelrc');

            // Deploy scripts
            copy('scripts/**', 'scripts');
        },

        projectfiles() {
            var copy = copyTpl.bind(this);
            const {segment, cognito, name} = this.config.get('promptValues');
            var MODULE_PATH = `src/${name}`;

            copy('src/**', MODULE_PATH);

            if(!segment) {
                this.fs.delete(this.destinationPath(`${MODULE_PATH}/tracking.js`));
            }

            // Remove non cognito stubs
            if(cognito) {
                this.fs.delete(this.destinationPath(`${MODULE_PATH}/util/getJwtToken.js`));
                this.fs.delete(this.destinationPath(`${MODULE_PATH}/util/__test__/getJwtToken-test.js`));
            }

            // Use custom copy here - copyTpl does weird stuff with binary files
            this.fs.copy(this.templatePath('src/assets/15.png'), this.destinationPath(MODULE_PATH + '/assets/15.png'));
        }
    },
    install: function () {
        const install = this.spawnCommand('yarn', ['install']);
        install.on('close', (code) => {
            if(!code) {
                this.spawnCommand('yarn', ['run', 'build-dev']);
            }
        });
    }
});
