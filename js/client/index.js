

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

