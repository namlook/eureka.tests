(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


App = EurekaTest = Eurekapp({
    name: 'EurekaTest',
    apiURI: 'http://localhost:7999/api/1',
    schemas: require('../schemas')
});

// EurekaTest.LiteralModel = EurekaTest.Model.extend({

    // title: function() {
    //     var _title = this.get('string');
    //     if (this.get('float') !== undefined) {
    //         _title += " <i>("+this.get('float')+")</i>";
    //     }
    //     return new Handlebars.SafeString(_title);
    // }.property('string', 'float'),

    // description: function() {
    //     var _desc = this.get('integer')+' persons where born in ';
    //     if (this.get('date')) {
    //         _desc += this.get('date').getFullYear();
    //     } else {
    //         _desc += "?";
    //     }
    //     if (this.get('boolean')) {
    //         _desc += ' woohoo !';
    //     }
    //     return _desc;
    // }.property('date', 'integer', 'boolean')

// });

/*
// Custom router
// add some routes whatever you like
EurekaTest.Router.map(function() {
   this.route('test');
   this.route('foo');
});


// overide the IndexRoute
EurekaTest.IndexRoute = EurekaTest.IndexRoute.extend({
   model: function() {
     return this._super().pushObjects([3, 4, 5, '!!!']);
   }
});


// Implement custom routes
EurekaTest.TestRoute = Ember.Route.extend({
  model: function() {
    console.log('i[oo]uu->', this.get('config'));
    return [1, 2, 3];
  }
});

// Implement custom controllers
EurekaTest.TestController = Ember.Controller.extend({
    test: "coucou!"
});


// Overload generic controller (here TypeNewController)
EurekaTest.CustomController = EurekaTest.TypeNewController.extend({
    test: "coucou!"
});


// Overload a Model
// (here: we compute the title property)
EurekaTest.TweetModel = EurekaTest.Model.extend({
    title: function() {
        return this.get('status');
    }.property('status')
});
*/


},{"../schemas":2}],2:[function(require,module,exports){
module.exports = {
    Literal: {
        __title__: {template: "{{~string}} {{#if float}}({{float}}){{/if}}"},
        schema: {
            string: {
                type: 'string',
                // required: true
            },
            boolean: {
                type: 'boolean'
            },
            integer: {
                type: 'integer',
                // required: true
            },
            float: {
                type: 'float'
                // precision: 3
            },
            date: {
                type: 'date'
            }
        }
    }
};

},{}]},{},[1])