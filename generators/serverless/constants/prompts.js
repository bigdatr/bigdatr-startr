module.exports = function(props) {
    return [
        {
            type: 'input',
            name: 'port',
            message: 'What port would you like the development server to run on?',
            default: 3000,
            store: true
        },
        {
            type: 'confirm',
            name: 'graphql',
            message: 'Is this a graphql service?',
            default: true,
            store: true
        }
    ];
}
