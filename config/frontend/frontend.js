
var serverConfig = require('../server');

module.exports = {
    name: serverConfig.name,
    apiURI: '/api/'+serverConfig.version,
    environment: process.env.NODE_ENV || 'development'
};
