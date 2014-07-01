
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      // TODO combine all the following files into a bundle
        "bower_components/jquery/dist/jquery.js",
        "bower_components/handlebars/handlebars.js",
        "bower_components/ember/ember.js",
        "bower_components/foundation/js/foundation.js",
        "bower_components/pickadate/lib/legacy.js",
        "bower_components/pickadate/lib/picker.js",
        "bower_components/pickadate/lib/picker.date.js",
        "bower_components/typeahead.js/dist/typeahead.bundle.js",
        "bower_components/alertify.js/lib/alertify.js",
        "bower_components/jQuery-Fakecrop/fakecrop/jquery.fakecrop.js",
        "bower_components/jquery-textcomplete/jquery.textcomplete.js",
        "bower_components/eurekapp/index.js", // TODO move index.js into dist
        "bower_components/eurekapp/dist/templates.js",

        "bower_components/ember-mocha-adapter/adapter.js",

        "public/app.js",
        "public/templates.js",

        "tests/*.js"
        // "tests/qunit/base.js",
        // "tests/qunit/customDescriptorTest.js"
    ],

    plugins: [
      // 'karma-qunit',
      'karma-mocha',
      'karma-chai',
      // 'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher'  // npm install karma-safari-launcher
    ],

    autoWatch: true,
    singleRun: true,
    reporters: ['progress'],
    browsers: [
        'PhantomJS',
        // 'Safari'
    ]
  });
};