'use strict';
var yeoman = require('yeoman-generator');
var getPrompts = require('./constants/prompts');

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
}

module.exports = yeoman.extend({
    init: function() {
        this.appname = this.appname.replace(/\s+/g, '-');
    },
    prompting: function () {
        return this.prompt(getPrompts(this)).then(function (props) {
            this.props = props;
            this.props.nameConstant = props.name.replace(/\W|-/g,"_").toUpperCase();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyTpl.bind(this);
            copy('_babelrc',            '.babelrc');
            copy('_circle.yml',         'circle.yml');
            copy('_editorconfig',       '.editorconfig');
            copy('_env',                '.env');
            copy('_eslintignore',       '.eslintignore');
            copy('_eslintrc',           '.eslintrc');
            copy('_flowconfig',         '.flowconfig');
            copy('_gitignore',          '.gitignore');
            copy('_jsdoc-config.json',  'jsdoc-config.json');
            copy('_package.json',       'package.json');
            copy('_README.md',          'README.md');
            copy('_s3_website-template.yml',     's3_website-template.yml');
            copy('_webpack.config.js',  'webpack.config.js');
            copy('_pretest.js',         'pretest.js');
            copy('decls/_gitkeep',      'decls/.gitkeep');

            // Deploy scripts
            copy('scripts/_findDistribution.js', 'scripts/findDistribution.js');
            copy('scripts/_getBranch.js', 'scripts/getBranch.js');
            copy('scripts/_notifyPrPreview.js', 'scripts/notifyPrPreview.js');
            copy('scripts/_prepareS3WebsiteYml.js', 'scripts/prepareS3WebsiteYml.js');
            copy('scripts/_safeBranchName.js', 'scripts/safeBranchName.js');

        },

        projectfiles: function() {
            var copy = copyTpl.bind(this);

            var MODULE_PATH = 'src/' + this.props.name

            // Base files
            copy('src/_client.js',          MODULE_PATH + '/client.js');
            copy('src/_index.static.jsx',   MODULE_PATH + '/index.static.jsx');
            copy('src/_prerender.js',       MODULE_PATH + '/prerender.js');
            copy('src/_reducers.js',        MODULE_PATH + '/reducers.js');
            copy('src/_routeHandlers.js',   MODULE_PATH + '/routeHandlers.js');
            copy('src/_routes.js',          MODULE_PATH + '/routes.js');
            copy('src/_store.js',           MODULE_PATH + '/store.js');
            copy('src/_meta.js',            MODULE_PATH + '/meta.js');
            if(this.props.segment) {
                copy('src/_tracking.js',    MODULE_PATH + '/tracking.js');
            }




            // Entity stuff
            copy('src/entity/_EntityQuery.js',                     MODULE_PATH + '/entity/EntityQuery.js');
            copy('src/entity/_EntitySchema.js',                    MODULE_PATH + '/entity/EntitySchema.js');
            copy('src/entity/_EntityConstructor.js',               MODULE_PATH + '/entity/EntityConstructor.js');
            copy('src/entity/_BaseRecord.js',                      MODULE_PATH + '/entity/BaseRecord.js');
            copy('src/entity/user/_UserRecord.js',                 MODULE_PATH + '/entity/user/UserRecord.js');
            copy('src/entity/__test__/_EntityQuery-test.js',       MODULE_PATH + '/entity/__test__/EntityQuery-test.js');
            copy('src/entity/__test__/_EntitySchema-test.js',      MODULE_PATH + '/entity/__test__/EntitySchema-test.js');
            copy('src/entity/__test__/_EntitySchema-test.js',      MODULE_PATH + '/entity/__test__/EntitySchema-test.js');
            copy('src/entity/__test__/_BaseRecord-test.js',        MODULE_PATH + '/entity/__test__/BaseRecord-test.js');
            copy('src/entity/__test__/_EntityConstructor-test.js', MODULE_PATH + '/entity/__test__/EntityConstructor-test.js');

            // Base file tests
            copy('src/__test__/_index.static-test.js',          MODULE_PATH + '/__test__/index.static-test.js');
            copy('src/__test__/_reducer-test.js',               MODULE_PATH + '/__test__/reducer-test.js');
            copy('src/__test__/_routes-test.js',                MODULE_PATH + '/__test__/routes-test.js');
            copy('src/__test__/_store-emulate-browser-test.js', MODULE_PATH + '/__test__/store-emulate-browser-test.js');
            copy('src/__test__/_store-test.js',                 MODULE_PATH + '/__test__/store-test.js');

            // Utils
            copy('src/util/_request.js',                        MODULE_PATH + '/util/request.js');
            copy('src/util/__test__/_request-test.js',          MODULE_PATH + '/util/__test__/request-test.js');

            // Stubbed file for if you don't want cognito
            if(!this.props.cognito) {
                copy('src/util/_getJwtToken.js',                MODULE_PATH + '/util/getJwtToken.js');
                copy('src/util/__test__/_getJwtToken-test.js',  MODULE_PATH + '/util/__test__/getJwtToken-test.js');
            }

            // Use custom copy here - copyTpl does weird stuff with binary files
            this.copy(this.templatePath('src/assets/_15.png'), this.destinationPath(MODULE_PATH + '/assets/15.png'));

            copy('src/components/_AppHandler.jsx',                   MODULE_PATH + '/components/AppHandler.jsx');
            copy('src/components/_ErrorHandler.jsx',                 MODULE_PATH + '/components/ErrorHandler.jsx');
            copy('src/components/_MainPage.jsx',                     MODULE_PATH + '/components/MainPage.jsx');
            copy('src/components/_Viewer.jsx',                       MODULE_PATH + '/components/Viewer.jsx');

            copy('src/components/__test__/_AppHandler-test.js',     MODULE_PATH + '/components/__test__/AppHandler-test.js');
            copy('src/components/__test__/_ErrorHandler-test.js',   MODULE_PATH + '/components/__test__/ErrorHandler-test.js');
            copy('src/components/__test__/_MainPage-test.js',       MODULE_PATH + '/components/__test__/MainPage-test.js');
            copy('src/components/__test__/_Viewer-test.js',         MODULE_PATH + '/components/__test__/Viewer-test.js');

            if(this.props.cognito) {
                copy('src/components/_SignUpPage.jsx',               MODULE_PATH + '/components/SignUpPage.jsx');
                copy('src/components/__test__/_SignUpPage-test.js',  MODULE_PATH + '/components/__test__/SignUpPage-test.js');
            }

            copy('src/sass/_styles.scss',   MODULE_PATH + '/sass/styles.scss');

        }
    },

    install: function () {
        const install = this.spawnCommand('yarn', ['install', '--force']);
        install.on('close', (code) => {
            if(!code) {
                this.spawnCommand('yarn', ['run', 'build-dev']);
            }
        });
    }
});
