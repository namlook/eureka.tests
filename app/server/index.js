
var Eurekapi = require('eurekapi');

var config = require('../../config/server');
config.schemas = require('../schemas');

// custom root to allow the client to drop the db (for tests)
config.customRoutes = [
    {
        method: 'delete',
        url: '/',
        func: function(req, res) {
            req.db.clear(function(err){
                if (err) {
                    return res.json(500, {status: 'fail'});
                }
                return res.json(200, {status: 'ok'});
            });
        }
    }
];

var server = new Eurekapi(config);
server.start();
