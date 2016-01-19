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
        this.log(chalk.magenta('\n'
            + "                    `:/+++:.                                     \n"
            + "                   `++++++++-                                    \n"
            + "    `://///////////++++++++++:-`     .--------------------------.\n"
            + "    /+++++++++++++++++++++++/+++`    |        Welcome to        |\n"
            + "    ++++++++++++++++++++++++:/++:    |      bigdatr startr!     |\n"
            + "    +++++++++++++//+++++++++++++:    '--------------------------'\n"
            + "    ++++++++++++/  /++++++++++++:                                \n"
            + "    ++++++++++++/  /+++++/--++++:                                \n"
            + "    ++++/``/++++/  /+++++- `++++:                                \n"
            + "    ++++/  /++++/  /+++++- `++++:                                \n"
            + "    ++++/  /++++/  /+++++- `++++:                                \n"
            + "    `````  ``````  ``````   ````                                 \n"
        ));

        this.prompt(getPrompts(this), function (props) {
            this.props = props;
            this.props.nameConstant = props.name.replace(/\W/,"_").toUpperCase();
            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyFiles.bind(this);
            copy('_Gruntfile.js',       'Gruntfile.js');
            copy('_README.md',          'README.md');
            copy('_babelrc',            '.babelrc');
            copy('_editorconfig',       '.editorconfig');
            copy('_env',                '.env');
            copy('_eslintrc',           '.eslintrc');
            copy('_gitignore',          '.gitignore');
            copy('_package.json',       'package.json');
            copy('_webpack.config.js',  'webpack.config.js');
            copy('bin/preInstall.sh',  '/bin/preInstall.sh');
        },

        projectfiles: function() {
            var copy = copyFiles.bind(this);

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
            copy('client/_devtools.js',                 MODULE_PATH + '/client/devtools.js');
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

            //
            // Tests
            copy('test/_karma.conf.js',                 'test/karma.conf.js');
            copy('test/_exampleTest-test.js',                MODULE_PATH + '/client/components/exampleTest-test.js');

        }
    },

    install: function () {
        this.installDependencies({
            bower: false
        });
    },
    end: function () {
        this.spawnCommand('npm', ['run', 'link']);
    }
});
