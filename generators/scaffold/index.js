'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
}

module.exports = yeoman.extend({
    prompting: function () {
        return this.prompt(getPrompts(this)).then(function (props) {
            this.props = props;
            this.props.nameConstant = props.name.replace(/\W/,"_").toUpperCase();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyTpl.bind(this);
            copy('_Gruntfile.js',       'Gruntfile.js');
            copy('_README.md',          'README.md');
            copy('_babelrc',            '.babelrc');
            copy('_editorconfig',       '.editorconfig');
            copy('_env',                '.env');
            copy('_eslintrc',           '.eslintrc');
            copy('_gitignore',          '.gitignore');
            copy('_package.json',       'package.json');
            copy('_webpack.config.js',  'webpack.config.js');
        },

        projectfiles: function() {
            var copy = copyTpl.bind(this);

            var MODULE_PATH = 'src/' + this.props.name

            //
            // Server
            copy('server/_index.js',                    'index.js');
            copy('_modulePackage.json',                 MODULE_PATH + '/package.json');
            copy('server/_server.js',                   MODULE_PATH + '/server/server.js');
            copy('server/_elephasConfig.js',            MODULE_PATH + '/server/elephasConfig.js');
            copy('server/_exampleRoutes--routes.js',    MODULE_PATH + '/server/exampleRoutes--routes.js');
            copy('server/_index.static.jsx',            MODULE_PATH + '/server/index.static.jsx');

            //
            // Client Files
            copy('client/_client.js',                   MODULE_PATH + '/client/client.js');
            copy('client/_EntitySchema.js', MODULE_PATH + '/client/EntitySchema.js');
            copy('client/_store.js',                    MODULE_PATH + '/client/store.js');
            copy('client/_reducers.js',                 MODULE_PATH + '/client/reducers.js');
            copy('client/_routes.jsx',                  MODULE_PATH + '/client/routes.jsx');
            copy('client/components/_AppHandler.jsx',   MODULE_PATH + '/client/components/AppHandler.jsx');
            copy('client/components/_ErrorHandler.jsx', MODULE_PATH + '/client/components/ErrorHandler.jsx');
            copy('client/components/_MainPage.jsx',     MODULE_PATH + '/client/components/MainPage.jsx');
            copy('client/components/_OtherPage.jsx',    MODULE_PATH + '/client/components/OtherPage.jsx');

            //
            // Styles Files
            copy('client/sass/_styles.scss',            MODULE_PATH + '/client/sass/styles.scss');
            copy('client/sass/__config.scss',           MODULE_PATH + '/client/sass/_config.scss');

            //
            // Public Files
            copy('public/_robots.txt',                  MODULE_PATH + '/public/robots.txt');
            this.fs.copy(this.templatePath('public/_favicon.ico'), this.destinationPath(MODULE_PATH + '/public/favicon.ico'), this.props);

            //
            // Tests
            copy('test/_karma.conf.js',                 'test/karma.conf.js');
            copy('test/_exampleTest-test.js',           MODULE_PATH + '/client/components/exampleTest-test.js');

        }
    },

    install: function () {
        this.installDependencies({
            bower: false
        });
    }
});
