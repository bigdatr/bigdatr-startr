module.exports = function(props) {
    return [
        {
            type: 'input',
            name: 'sprucePrefix',
            message: 'What is your spruce component name prefix?',
            default: 'Spruce', // Default to current folder name
            store: true
        },
    ];
}
