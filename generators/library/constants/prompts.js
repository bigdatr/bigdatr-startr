module.exports = function(props) {
    return [
        {
            type: 'confirm',
            name: 'example',
            message: 'Would you like a static examples site?',
            default: true,
            store: true
        },
    ];
}
