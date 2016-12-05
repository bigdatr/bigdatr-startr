const path = require('path');
module.exports = function(props) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'What is your project name?',
            default: path.parse(process.cwd()).name // Default to current folder name
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a short project description:',
            default: ''
        },
        {
            type: 'input',
            name: 'version',
            message: 'What semver version should the project start on?',
            default: '0.0.0'
        },
        {
            type: 'input',
            name: 'license',
            message: 'What license is the project distributed under?',
            default: 'UNLICENSED'
        },
        {
            type: 'input',
            name: 'private',
            message: 'Is this a private project? (true/false)',
            default: true
        },
        {
            type: 'input',
            name: 'author',
            message: 'Who/what is the author of this project?',
            default: ''
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your github user/organisation name?',
            store: ''
        },
        {
            type: 'input',
            name: 'port',
            message: 'What port would you like the development server to run on?',
            default: 3000
        },
        {
            type: 'input',
            name: 'graphql',
            message: 'Is this a graphql service? (true/false)',
            default: true
        }
    ];
}