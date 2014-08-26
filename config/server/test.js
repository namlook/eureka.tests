
var config = require('./server');

config.port = 7357;
config.enableCORS = true;
config.database.config.graphURI = 'http://eurekatest.com';

module.exports = config;
