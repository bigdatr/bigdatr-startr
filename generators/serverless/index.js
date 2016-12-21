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
            copy('interfaces/_awslambda.js',  'interfaces/awslambda.js');
        },



        projectfiles: function() {
            var copy = copyTpl.bind(this);
            const appRootPath = 'src/' + this.appname + '/';

            copy('src/_index.js',       appRootPath + '/index.js');

            if(this.props.graphql) {
                copy('src/graphql/_graphql.js',                 appRootPath + '/graphql/graphql.js');
                copy('src/graphql/_index.js',                   appRootPath + '/graphql/index.js');
                copy('src/graphql/_resolvers.js',               appRootPath + '/graphql/resolvers.js');
                copy('src/graphql/_schemas.js',                 appRootPath + '/graphql/schemas.js');

                copy('src/shared/models/_BaseModel.js',                 appRootPath + '/shared/models/BaseModel.js');

                copy('src/graphql/types/User/_UserModel.js',       appRootPath + '/graphql/types/User/UserModel.js');
                copy('src/graphql/types/User/_UserSchema.graphql',       appRootPath + '/graphql/types/User/UserSchema.graphql');
                copy('src/graphql/types/Viewer/_ViewerModel.js',       appRootPath + '/graphql/types/Viewer/ViewerModel.js');
                copy('src/graphql/types/Viewer/_ViewerResolver.js',       appRootPath + '/graphql/types/Viewer/ViewerResolver.js');
            }


        }
    },

    install: function () {
        const install = this.spawnCommand('yarn', ['install', '--ignore-engines']);
    }
});
