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
            name: 'cognito',
            message: 'Do you want cognito? (note that prerendering is not compatible with cognito)',
            default: true,
            store: true
        },
        {
            type: 'confirm',
            name: 'segment',
            message: 'Would you like segment tracking?',
            default: true,
            store: true
        }
    ];
}
