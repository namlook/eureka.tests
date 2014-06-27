
// Adding ember-testing container
document.write(
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>'
);

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
    App.deferReadiness();


var dropDB = function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
            url: 'http://localhost:7999/api/1/',
            type: 'delete',
            error: function(jqXHR) {
                console.log('XXX error:', jqXHR.responseText);
                return reject(jqXHR.responseText);
            },
            success: function() {
                return resolve('ok');
            }
        });
    });
};
