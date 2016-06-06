
module.exports = function(props) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: props.appname // Default to current folder name
        },
        {
            type: 'input',
            name: 'username',
            message: 'Your github user/organisation name',
            store: true
        },
        {
            type: 'input',
            name: 'port',
            message: 'What port would you like the development server to run on?',
            default: 3000
        }
    ];
}
