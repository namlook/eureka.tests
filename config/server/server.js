
var pkg = require('../../package.json');

module.exports = {
    name: pkg.name,
    version: 1,
    port: 7999,
    database: {
        adapter: 'rdf',
        config: {
            store: 'virtuoso',
            host: process.env.DB_PORT_8890_TCP_ADDR,
            port: process.env.DB_PORT_8890_TCP_PORT,
            graphURI: 'http://eurekatest.com'
        }
    }
};
