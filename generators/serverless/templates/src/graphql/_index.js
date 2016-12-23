// @flow

//
// Shim the graphql syntax requires so
// that they return as strings
var fs = require('fs');

// $FlowFixMe: Supressing this error cause it ain't an issue
require.extensions['.graphql'] = (module: Object, filename: string) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = require('./graphql');
