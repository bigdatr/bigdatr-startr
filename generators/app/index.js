var chalk = require('chalk');
module.exports = require('yeoman-generator').Base.extend({
    initializing: function () {

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

        return this.prompt([{
            name: 'generator',
            type: 'list',
            message: 'Choose a generator',
            choices: Object
                .keys(this.env.store._meta)
                .filter(function(ii) {
                    return ii.indexOf('bigdatr-startr:app') === -1
                })
                .map(function(ii) {
                    return ii.split(':')[1]
                })
        }]).then(function(prompt){
            this.composeWith('bigdatr-startr:'+ prompt.generator);
        }.bind(this))
    }
});
