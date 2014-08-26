
var config = require('./frontend');
var serverConfig = require('../server');

config.apiURI = "http://localhost:"+serverConfig.port+"/api/"+serverConfig.version;

module.exports = config;
