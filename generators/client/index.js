'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
}

module.exports = yeoman.Base.extend({
    init: function() {
        this.appname = this.appname.replace(/\s+/g, '-');
    },
    prompting: function () {
        return this.prompt(getPrompts(this)).then(function (props) {
            this.props = props;
            this.props.nameConstant = props.name.replace(/\W/,"_").toUpperCase();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyTpl.bind(this);
            copy('_babelrc',            '.babelrc');
            copy('_circle.yml',         'circle.yml');
            copy('_editorconfig',       '.editorconfig');
            copy('_env',                '.env');
            copy('_eslintrc',           '.eslintrc');
            copy('_flowconfig',         '.flowconfig');
            copy('_gitignore',          '.gitignore');
            copy('_jsdoc-config.json',  'jsdoc-config.json');
            copy('_package.json',       'package.json');
            copy('_README.md',          'README.md');
            copy('_s3_website.yml',     's3_website.yml');
            copy('_webpack.config.js',  'webpack.config.js');
            copy('_yarn.lock',          'yarn.lock');
        },

        projectfiles: function() {
            var copy = copyTpl.bind(this);

            var MODULE_PATH = 'src/' + this.props.name

            copy('src/_EntitySchema.js',    MODULE_PATH + '/EntitySchema.js');
            copy('src/_client.js',          MODULE_PATH + '/client.js');
            copy('src/_index.static.jsx',   MODULE_PATH + '/index.static.jsx');
            copy('src/_prerender.js',       MODULE_PATH + '/prerender.js');
            copy('src/_reducers.js',        MODULE_PATH + '/reducers.js');
            copy('src/_routeHandlers.js',   MODULE_PATH + '/routeHandlers.js');
            copy('src/_routes.js',          MODULE_PATH + '/routes.js');
            copy('src/_store.js',           MODULE_PATH + '/store.js');

            // Use custom copy here - copyTpl does weird stuff with binary files
            this.copy(this.templatePath('src/assets/_15.png'), this.destinationPath(MODULE_PATH + '/assets/15.png'));

            copy('src/components/_AppHandler.jsx',     MODULE_PATH + '/components/AppHandler.jsx');
            copy('src/components/_ErrorHandler.jsx',   MODULE_PATH + '/components/ErrorHandler.jsx');
            copy('src/components/_Example-test.js',    MODULE_PATH + '/components/Example-test.js');
            copy('src/components/_MainPage.jsx',       MODULE_PATH + '/components/MainPage.jsx');
            copy('src/components/_OtherPage.jsx',      MODULE_PATH + '/components/OtherPage.jsx');

            copy('src/sass/_styles.scss',   MODULE_PATH + '/sass/styles.scss');

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
