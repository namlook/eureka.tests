

App = EurekaTest = Eurekapp({
    name: 'EurekaTest',
    apiURI: 'http://localhost:7999/api/1',
    schemas: require('../schemas')
});


// Custom router
// overload custom_template.edit route
EurekaTest.Router.map(function() {
    this.resource('custom_template', function(){
        this.route('edit', {path: '/:id/edit'});
   });
});


EurekaTest.CustomTemplateEditRoute = EurekaTest.GenericModelEditRoute.extend({
    model: function(params) {
        params.modelType = 'CustomTemplate';
        var model = this._super(params);
        model.then(function(model) {
            model.set('routeField', 'hi!');
        });
        return model;
    }
});


// custom model
EurekaTest.CustomTemplateModel = EurekaTest.Model.extend({
    customField: function() {
        return "custom "+this.get('title');
    }.property('title')
});


// custom controller: overload GenericModelEditController
EurekaTest.CustomTemplateEditController = EurekaTest.GenericModelEditController.extend({
    ctrlField: function() {
        return this.get('model.title')+' from controller';
    }.property('model.title')
});


// custom action
EurekaTest.LiteralDisplayController = EurekaTest.GenericModelDisplayController.extend({
    actions: {
        divideFloatBy2: function() {
            var model = this.get('model');
            model.set('float', model.get('float')/2);
            var _this = this;
            model.save().then(function(newModel) {
                _this.set('model', newModel);
            });
        },
        toggleBoolean: function() {
            var model = this.get('model');
            model.toggleProperty('boolean');
            var _this = this;
            model.save().then(function(newModel) {
                _this.set('model', newModel);
            });
        }
    }
});


/*
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

