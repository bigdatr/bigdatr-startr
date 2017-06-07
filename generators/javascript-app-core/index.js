'use strict';

import {fromJS, List, Iterable, OrderedMap} from 'immutable';
import yeoman from 'yeoman-generator';
import getPrompts from './constants/prompts';

function copyTpl(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.config.getAll().promptValues);
}

module.exports = yeoman.extend({
    prompting() {
        return this
            .prompt(getPrompts(this))
            .then(prompt => {
                this.config.set({
                    promptValues: Object.assign({}, this.config.getAll().promptValues, {
                        nameConstant: prompt.name.replace(/\W/g,"_").toUpperCase()
                    })
                });
            })
    },

    configuring: {
        app() {
            var copy = copyTpl.bind(this);

            copy('_babelrc',            '.babelrc');
            copy('_editorconfig',       '.editorconfig');
            copy('_eslintignore',       '.eslintignore');
            copy('_eslintrc',           '.eslintrc');
            copy('_flowconfig',         '.flowconfig');
            copy('_gitignore',          '.gitignore');
            copy('_jsdoc.json',         'jsdoc.json');
            copy('_package.json',       'basePackage.json');
            copy('_pretest.js',         'pretest.js');
            copy('_README.md',          'README.md');
            copy('decls/_gitkeep',      'decls/.gitkeep');
        },
    },
    install() {
        // Merge the two packages together. This requires some ordering
        // otherwise the package just looks bonkers.
        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        const basePkg = this.fs.readJSON(this.destinationPath('basePackage.json'), {});

        function reviver(key, value) {
            return Iterable.isIndexed(value)
                ? value.toList()
                : value.toOrderedMap();
        }

        var mergedPackage = fromJS(pkg, reviver).mergeDeep(fromJS(basePkg, reviver));

        const order = List([
            'scripts',
            'dependencies',
            'devDependencies',
            'ava',
            'nyc'
        ]);

        var newPackage = order
            .reduce((reduction, ii) => {
                return reduction.set(ii, mergedPackage.get(ii));
            }, OrderedMap())
            .update(orderedPackage => {
                return mergedPackage
                    .filter((ii, key) => !order.includes(key))
                    .concat(orderedPackage);
            });

        this.fs.writeJSON(this.destinationPath('package.json'), newPackage.toJS());
        this.fs.delete(this.destinationPath('basePackage.json'));


        this.yarnInstall()
    }
});
