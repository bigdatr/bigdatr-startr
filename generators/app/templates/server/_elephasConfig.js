
// if (process.env.NODE_ENV !== 'production') {
//     connectSrc.push("ws://*:7000");
// }

var elephas_config = {
    __dirname: __dirname,

    routes_root_path: __dirname + '/src/<% name %>/server/',
    services_root_path: __dirname + '/src/<% name %>/server/',
    static_root_path: __dirname + '/src/<% name %>/public/',
    server: {
        port: process.env['<%= name.replace(/\W/,"_").toUpperCase() %>_PORT'] || 3000,
    }
};

module.exports = elephas_config;

