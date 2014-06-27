
var Eurekapi = require('eurekapi');

var server = new Eurekapi({
    name: 'EurekaTest',
    version: 1,
    port: 7999,
    enableCORS: true,
    database: {
        adapter: 'rdf',
        config: {
            store: 'virtuoso',
            graphURI: 'http://eurekatest.com'
        }
    },
    schemas: require('./schemas'),

    // custom root to allow the client to drop the db
    customRoutes: [
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
    ]
});
server.start();

