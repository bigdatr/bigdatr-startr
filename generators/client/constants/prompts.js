const path = require('path');
module.exports = function(props) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'What is your project name?',
            default: path.parse(process.cwd()).name, // Default to current folder name
            store: true
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a short project description:',
            default: '',
            store: true
        },
        {
            type: 'input',
            name: 'version',
            message: 'What semver version should the project start on?',
            default: '0.0.0',
            store: true
        },
        {
            type: 'input',
            name: 'license',
            message: 'What license is the project distributed under?',
            default: 'UNLICENSED',
            store: true
        },
        {
            type: 'confirm',
            name: 'private',
            message: 'Is this a private project?',
            default: true,
            store: true
        },
        {
            type: 'input',
            name: 'author',
            message: 'Who/what is the author of this project?',
            default: '',
            store: true
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your github user/organisation name?',
            store: '',
            store: true
        },
        {
            type: 'input',
            name: 'port',
            message: 'What port would you like the development server to run on?',
            default: 3000,
            store: true
        },
        {
            type: 'confirm',
            name: 'cognito',
            message: 'Do you want cognito? (note that prerendering is not compatible with cognito)',
            default: true,
            store: true
        },
        {
            type: 'confirm',
            name: 'prerender',
            message: 'Do you want prerendering? (note that prerendering is not compatible with cognito)',
            default: false,
            store: true
        },
        {
            type: 'confirm',
            name: 'segment',
            message: 'Would you like segment tracking?',
            default: true,
            store: true
        },
        {
            type: 'input',
            name: 'segmentID',
            message: 'What is your segment tracking account ID (leave blank if you don\'t know)',
            default: '',
            when: function(answers) {
                return answers.segment; // Only ask this if user wanted segment
            },
            store: true
        }

    ];
}
