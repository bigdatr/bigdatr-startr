// @flow

//
// Shim the graphql syntax requires so
// that they return as strings
var fs = require('fs');
require.extensions['.graphql'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = require('./graphql');
