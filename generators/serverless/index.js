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
            console.log(typeof this.props.graphql);
            this.props.graphql = this.props.graphql === 'false' ? false : true;
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
            copy('_yarn.lock',          'yarn.lock');
            copy('_dev.js',             'dev.js');
            copy('_prod.js',            'prod.js');
            copy('_serverless.yml',     'serverless.yml');
            copy('scripts/_bundle.js',  'scripts/bundle.js');
        },



        projectfiles: function() {
            var copy = copyTpl.bind(this);
            copy('src/_index.js',       'src/index.js');

            if(this.props.graphql) {
                copy('src/graphql/_graphql.js',                 'src/graphql/graphql.js');
                copy('src/graphql/_index.js',                   'src/graphql/index.js');
                copy('src/graphql/_resolvers.js',               'src/graphql/resolvers.js');
                copy('src/graphql/_schemas.js',                 'src/graphql/schemas.js');
                copy('src/graphql/demo/_DemoResolver.js',       'src/graphql/demo/DemoResolver.js');
                copy('src/graphql/demo/_DemoSchema.graphql',    'src/graphql/demo/DemoSchema.graphql');
            }


        }
    },

    install: function () {
        const install = this.spawnCommand('yarn', ['install', '--ignore-engines']);
    }
});