'use strict';
var chalk = require('chalk');
var Generator = require('yeoman-generator');
var pkg = require('../../package.json');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('generator', {
            type: String,
            required: false
        });
    }
    initializing() {
        const version = pkg.version;
        const spaces = 26 - version.length;
        const leftSpaces = Math.floor(spaces / 2);
        const rightSpaces = Math.ceil(spaces / 2);
        const paddedVersion = new Array(leftSpaces + 1).join(' ') + version + new Array(rightSpaces + 1).join(' ');


        this.log(chalk.magenta('\n'
            + "                    `:/+++:.                                     \n"
            + "                   `++++++++-                                    \n"
            + "    `://///////////++++++++++:-`     .--------------------------.\n"
            + "    /+++++++++++++++++++++++/+++`    |        Welcome to        |\n"
            + "    ++++++++++++++++++++++++:/++:    |      bigdatr startr!     |\n"
            + "    +++++++++++++//+++++++++++++:    |"     +paddedVersion+    "|\n"
            + "    ++++++++++++/  /++++++++++++:    '--------------------------'\n"
            + "    ++++++++++++/  /+++++/--++++:                                \n"
            + "    ++++/``/++++/  /+++++- `++++:                                \n"
            + "    ++++/  /++++/  /+++++- `++++:                                \n"
            + "    ++++/  /++++/  /+++++- `++++:                                \n"
            + "    `````  ``````  ``````   ````                                 \n"
        ));

        var prompt = Promise.resolve(this.options);

        if(!this.options.generator) {
            prompt = this
                .prompt([{
                    name: 'generator',
                    type: 'list',
                    message: 'Choose a generator',
                    choices: Object
                        .keys(this.env.store._meta)
                        .filter(ii => ii.indexOf(':app') === -1 && ii.indexOf(':app-core') === -1)
                        .map(ii => ii.split(':')[1])
                }])
        }

        return prompt
            .then(prompt => {
                this.composeWith(require.resolve('../app-core'));
                this.composeWith(require.resolve('../' + prompt.generator));
            })
    }
};
