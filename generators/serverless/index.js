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
            this.props.nameConstant = props.name.replace(/\W/g,"_").toUpperCase();
        }.bind(this));
    },

    writing: {
        app: function() {
            var copy = copyTpl.bind(this);
            copy('_babelrc',            '.babelrc');
            copy('_circle.yml',         'circle.yml');
            copy('_dev.js',             'dev.js');
            copy('_editorconfig',       '.editorconfig');
            copy('_env',                '.env');
            copy('_eslintrc',           '.eslintrc');
            copy('_flowconfig',         '.flowconfig');
            copy('_gitignore',          '.gitignore');
            copy('_jsdoc-config.json',  'jsdoc-config.json');
            copy('_package.json',       'package.json');
            copy('_pretest.js',         'pretest.js');
            copy('_prod.js',            'prod.js');
            copy('_local.js',           'local.js');
            copy('_README.md',          'README.md');
            copy('_serverless.yml',     'serverless.yml');
            copy('interfaces/_awslambda.js.flow',  'interfaces/awslambda.js.flow');
            copy('interfaces/_ava.js.flow',  'interfaces/ava.js.flow');
            copy('scripts/_bundle.js',  'scripts/bundle.js');
        },



        projectfiles: function() {
            var copy = copyTpl.bind(this);
            const appRootPath = 'src/' + this.appname + '/';

            copy('src/_index.js',       appRootPath + '/index.js');
            if(this.props.graphql) {
                copy('src/__tests__/_index-test.js',       appRootPath + '/__tests__/index-test.js');
                copy('src/graphql/_graphql.js',                 appRootPath + '/graphql/graphql.js');
                copy('src/graphql/_index.js',                   appRootPath + '/graphql/index.js');
                copy('src/graphql/_loaders.js',                 appRootPath + '/graphql/loaders.js');
                copy('src/graphql/_resolvers.js',               appRootPath + '/graphql/resolvers.js');
                copy('src/graphql/_schemas.js',                 appRootPath + '/graphql/schemas.js');

                copy('src/shared/models/__tests__/_BaseModel-test.js',                 appRootPath + '/shared/models/__tests__/BaseModel-test.js');
                copy('src/shared/models/_BaseModel.js',                 appRootPath + '/shared/models/BaseModel.js');

                copy('src/shared/utils/__tests__/_createLoader-test.js',                 appRootPath + '/shared/utils/__tests__/createLoader-test.js');
                copy('src/shared/utils/_createLoader.js',                 appRootPath + '/shared/utils/createLoader.js');

                copy('src/graphql/types/User/__tests__/_UserModel-test.js',       appRootPath + '/graphql/types/User/__tests__/UserModel-test.js');
                copy('src/graphql/types/User/__tests__/_UserLoader-test.js',       appRootPath + '/graphql/types/User/__tests__/UserLoader-test.js');
                copy('src/graphql/types/User/_UserLoader.js',       appRootPath + '/graphql/types/User/UserLoader.js');
                copy('src/graphql/types/User/_UserModel.js',       appRootPath + '/graphql/types/User/UserModel.js');
                copy('src/graphql/types/User/_UserSchema.graphql',       appRootPath + '/graphql/types/User/UserSchema.graphql');

                copy('src/graphql/types/Viewer/__tests__/_dataloaders-test.js',       appRootPath + '/graphql/types/Viewer/__tests__/dataloaders-test.js');
                copy('src/graphql/types/Viewer/__tests__/_ViewerResolver-test.js',       appRootPath + '/graphql/types/Viewer/__tests__/ViewerResolver-test.js');
                copy('src/graphql/types/Viewer/_dataloaders.js',       appRootPath + '/graphql/types/Viewer/dataloaders.js');
                copy('src/graphql/types/Viewer/_ViewerModel.js',       appRootPath + '/graphql/types/Viewer/ViewerModel.js');
                copy('src/graphql/types/Viewer/_ViewerResolver.js',       appRootPath + '/graphql/types/Viewer/ViewerResolver.js');
            }
        }
    },

    install: function () {
        const install = this.spawnCommand('yarn', ['install', '--ignore-engines']);
    }
});
