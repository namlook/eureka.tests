
var serverConfig = require('../server');

module.exports = {
    name: serverConfig.name,
    logoURL: "assets/images/logo.jpg",
    apiURL: '/api/'+serverConfig.version,
    environment: process.env.NODE_ENV || 'development'
};
