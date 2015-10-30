
module.exports = function(props) {
    return [{
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : props.appname // Default to current folder name
    },
    {
        type    : 'input',
        name    : 'username',
        message : 'Your github user/organisation name'
    }
    ]
}
