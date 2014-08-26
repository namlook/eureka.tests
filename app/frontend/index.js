
var config = require('../../config/frontend');
config.schemas = require('../schemas');
App = EurekaTest = Eurekapp(config);


/***** Custom routes ******/

/*** router ***/
// overload custom_template.edit route
App.Router.map(function() {
    this.resource('custom_template', function(){
        this.route('edit', {path: '/:id/edit'});
   });
    this.resource('literal', function() {
        this.route('truthy', {path: '/truthy'});
        this.route('falsy', {path: '/falsy'});
    });
});

/*** routes ****/
App.LiteralTruthyRoute = App.GenericModelIndexRoute.extend({
    model: function(params) {
        params.query = {boolean: true};
        return this._super(params);
    }
});


App.LiteralFalsyRoute = App.GenericModelIndexRoute.extend({
    model: function(params) {
        params.query = {boolean: false};
        return this._super(params);
    }
});


App.CustomTemplateEditRoute = App.GenericModelEditRoute.extend({
    model: function(params) {
        var model = this._super(params);
        model.then(function(model) {
            model.set('routeField', 'hi!');
        });
        return model;
    }
});


/***** Custom controllers *****/
// overload GenericModelEditController
App.CustomTemplateEditController = App.GenericModelEditController.extend({
    ctrlField: function() {
        return this.get('model.title')+' from controller';
    }.property('model.title')
});



// custom actions
App.LiteralDisplayController = App.GenericModelDisplayController.extend({
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


/***** Custom models *****/

App.CustomTemplateModel = App.Model.extend({
    customField: function() {
        return "custom "+this.get('title');
    }.property('title')
});

App.CustomDescriptorModel = App.Model.extend({
    thumbUrl: function() {
        var integer = this.get('integer');
        return "http://placekitten.com/"+integer+'/'+integer;
    }.property('integer')
});


App.PopulateModel = App.Model.extend({
    title: function() {
        return this.get('basic.title')+' and '+this.get('literal.title');
    }.property(),

    description: function() {
        return this.get('integer')+': '+this.get('literal.basic.title');
    }.property('integer', 'literal.basic.title')
});


