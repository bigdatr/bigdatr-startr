
var elephas_config = {
    __dirname: __dirname,
    routes_root_path: __dirname + '/',
    services_root_path: __dirname + '/',
    static_root_path: __dirname.replace('server', 'public') + '/',
    httpsOnly: false,
    server: {
        port: process.env['<%= nameConstant %>_PORT'] || process.env.PORT || 3000,
    },
    csp: false
};

module.exports = elephas_config;

