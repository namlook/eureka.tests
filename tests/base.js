
// Adding ember-testing container
document.write(
    // '<div id="mocha">' +
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>'
);

// in order to see the app running inside the runner
App.rootElement = '#ember-testing';

Ember.Test.adapter = Ember.Test.MochaAdapter.create();
App.setupForTesting();
App.injectTestHelpers();
