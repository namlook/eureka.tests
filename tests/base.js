
// Adding ember-testing container
document.write(
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>'
);

// in order to see the app running inside the runner
App.rootElement = '#ember-testing';

Ember.Test.adapter = Ember.Test.MochaAdapter.create();
App.setupForTesting();
App.injectTestHelpers();

beforeEach(function(done) {
    App.reset();
    Ember.$.ajax({
        url: 'http://localhost:7357/api/1/',
        type: 'delete',
        error: function(jqXHR) {
            console.log('XXX error:', jqXHR.responseText);
        }
    }).success(function() {
        done();
    });
});