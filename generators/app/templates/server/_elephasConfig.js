
var elephas_config = {
    __dirname: __dirname,
    routes_root_path: __dirname + '/',
    services_root_path: __dirname + '/',
    static_root_path: __dirname + '/',
    httpsOnly: false,
    server: {
        port: process.env['<%= nameConstant %>_PORT'] || 3000,
    },
    csp: false
};

module.exports = elephas_config;

