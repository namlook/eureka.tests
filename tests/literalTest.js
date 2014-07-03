
var equal = chai.assert.equal;
var assert = chai.assert;

describe('Literal', function() {

    beforeEach(function(done) {
        App.reset();
        Ember.$.ajax({
            url: 'http://localhost:7999/api/1/',
            type: 'delete',
            error: function(jqXHR) {
                console.log('XXX error:', jqXHR.responseText);
            }
        }).success(function() {
            done();
        });
    });

    it('display a new literal form', function(done) {
        visit("/literal");
        andThen(function() {
            click('.eureka-link-to-new.eureka-literal-model');
        });

        andThen(function() {
            equal(currentURL(), '/literal/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New Literal", "The title form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "string", "The first field's name is 'string'");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('type'), "text", "A string is a text input");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('name'), "string", "Its name is 'string'");

            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "boolean", "The second field's name is 'boolean'");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('type'), "checkbox", "A boolean is a checkbox");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('name'), "boolean", "Its name is 'boolean'");


            equal(find('.eureka-field:eq(2) .eureka-field-name').text(), "integer", "The third field's name is 'integer'");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('type'), "number", "An integer is a number");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('name'), "integer", "Its name is 'integer'");

            equal(find('.eureka-field:eq(3) .eureka-field-name').text(), "float", "The fourth field's name is 'float'");
            equal(find('.eureka-field:eq(3) .eureka-field-input').attr('type'), "number", "An float is a number");
            equal(find('.eureka-field:eq(3) .eureka-field-input').attr('name'), "float", "Its name is 'float'");

            // date field
            equal(find('.eureka-field:eq(4) .eureka-field-name').text(), "date", "The fifth field's name is 'date'");
            equal(find('.eureka-field:eq(4) .eureka-field-input').attr('type'), "text", "An date is a text input");
            equal(find('.eureka-field:eq(4) .eureka-field-input').attr('name'), "date", "Its name is 'date'");

            equal(find('.picker').attr('aria-hidden'), "true", "The date picker is hidden");

            click('.eureka-field-input:eq(4)');

            andThen(function() {
                equal(find('.picker').attr('aria-hidden'), "false", "The date picker is visible");
                done();
            });
        });
    });


    it('create a literal', function(done) {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/literal/new');

            fillIn('.eureka-field-input[name=string]', 'Hello World');
            fillIn('.eureka-field-input[name=float]', '3.14');
            click('.eureka-field-input[name=boolean]');
            fillIn('.eureka-field-input[name=integer]', '42');
            click('.eureka-field-input[name=date]');
            click('.picker__footer > button:contains("Today")');

            click('.eureka-save-action');


            andThen(function() {
                equal(currentURL(), '/literal', 'We go back to the literals list');
                equal(find('.eureka-result-item').length, 1, "We have now 1 result");
                equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'Hello World', "The result has a correct title");

                equal(find('.eureka-result-item .eureka-item-description').text().trim(), 'bool is yes with integer 42', "The result has a description");
                equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");


                click('.eureka-result-item .eureka-item-title a:contains("Hello World")');
                andThen(function() {
                    equal(currentPath(), 'literal.display');
                    equal(find('.eureka-document-title:contains("Hello World")').length, 1, "The document should have the correct title");

                    equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "string", "the first field name is 'string'");
                    equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "Hello World", "string is correctly filled");

                    equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "boolean", "the second field name is 'boolean'");
                    equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "true", "boolean is correctly filled");

                    equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "integer", "the third field name is 'integer'");
                    equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value').text().trim(), "42", "integer is correctly filled");

                    equal(find('.eureka-document .eureka-field:eq(3) .eureka-field-name').text(), "float", "the fourth field name is 'float'");
                    equal(find('.eureka-document .eureka-field:eq(3) .eureka-field-value').text().trim(), "3.14", "float is correctly filled");

                    equal(find('.eureka-document .eureka-field:eq(4) .eureka-field-name').text(), "date", "the fifth field name is 'date'");
                    var valueYear = new Date(find('.eureka-document .eureka-field:eq(4) .eureka-field-value').text()).getFullYear();
                    var thisYear = new Date().getFullYear();
                    equal(valueYear, thisYear, "date is correctly filled");
                    done();
                });
            });
        });
    });


    it('Edit a Basic relation from a Literal', function(done) {
        Ember.run(function() {
            App.db.BasicObject.get('model').create({content: {
                title: 'basic title',
                description: 'basic description',
                thumb: 'http://placekitten.com/165/165'
            }}).save();
        });

        andThen(function(){
            visit('/literal/new');

            fillIn('.eureka-field-input[name=string]', 'hello');
            find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic t');
        });

        andThen(function() {
            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 2, "2 items in relations (including item creation)");

                find('.tt-suggestion:eq(0)').click();
            }, 700);
        });

        andThen(function() {
            equal(find('.eureka-selected-relation.basic:contains("basic title")').length, 1, 'The relation is selected');

            click('.eureka-save-action');
        });

        andThen(function() {
            equal(currentURL(), '/literal', 'We go back to the literals list');
            equal(find('.eureka-result-item').length, 1, "We have now 1 result");
            equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'hello', "The result has a correct title");

            equal(find('.eureka-result-item .eureka-item-description').length, 1, "The result has a description");
            equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");

            click('.eureka-result-item:eq(0) a');
        });

        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "basic", "the second field name is 'basic'");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "basic title", "basic is correctly filled");
            click('.eureka-document .eureka-field:eq(1) .eureka-field-value a');
        });

        andThen(function() {
            equal(find('.eureka-document-title.eureka-basic-object-model:contains("basic title")').length, 1, 'display the basic title');
            click('.eureka-edit-action.eureka-basic-object-model');
        });

        andThen(function() {
            assert.match(currentURL(), /^\/basic_object\/\w+\/edit/, 'We are editing a basic page');
            done();
        });
    });

    it('Create a literal with relation', function(done) {
        this.timeout(3500);
        App.db.BasicObject.get('model').create({content: {
            title: 'basic title',
            description: 'basic description',
            thumb: 'http://placekitten.com/165/165'
        }}).save();

        visit('/literal/new');

        fillIn('.eureka-field-input[name=string]', 'Hello World');
        fillIn('.eureka-field-input[name=float]', '3.14');
        click('.eureka-field-input[name=boolean]');
        fillIn('.eureka-field-input[name=integer]', '42');
        click('.eureka-field-input[name=date]');
        click('.picker__footer > button:contains("Today")');


        andThen(function() {
            find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic titl');

            Ember.run.later(function(){
                find('.tt-suggestion:eq(0)').click();

                andThen(function() {
                    click('.eureka-save-action');

                    andThen(function() {
                        equal(currentURL(), '/literal', 'We go back to the literals list');
                        equal(find('.eureka-result-item').length, 1, "We have now 1 result");
                        equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'Hello World', "The result has a correct title");

                        equal(find('.eureka-result-item .eureka-item-description').length, 1, "The result has a description");
                        equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");


                        click('.eureka-result-item .eureka-item-title a:contains("Hello World")');

                        andThen(function() {
                            equal(currentPath(), 'literal.display');
                            equal(find('.eureka-document-title:contains("Hello World")').length, 1, "The document should have the correct title");

                            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "string", "the first field name is 'string'");
                            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "Hello World", "string is correctly filled");

                            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "boolean", "the second field name is 'boolean'");
                            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "true", "boolean is correctly filled");

                            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "integer", "the third field name is 'integer'");
                            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value').text().trim(), "42", "integer is correctly filled");

                            equal(find('.eureka-document .eureka-field:eq(3) .eureka-field-name').text(), "float", "the fourth field name is 'float'");
                            equal(find('.eureka-document .eureka-field:eq(3) .eureka-field-value').text().trim(), "3.14", "float is correctly filled");

                            equal(find('.eureka-document .eureka-field:eq(4) .eureka-field-name').text(), "date", "the fifth field name is 'date'");
                            var valueYear = new Date(find('.eureka-document .eureka-field:eq(4) .eureka-field-value').text()).getFullYear();
                            var thisYear = new Date().getFullYear();
                            equal(valueYear, thisYear, "date is correctly filled");

                            equal(find('.eureka-document .eureka-field:eq(5) .eureka-field-name').text(), "basic", "the sixth field name is 'basic'");
                            equal(find('.eureka-document .eureka-field:eq(5) .eureka-field-value').text().trim(), "basic title", "basic is correctly filled");

                            done();
                        });
                    });
                });
            }, 500);
        });

    });

    it('advanced search', function(done) {
        var model = App.db.Literal.get('model');
        var strings = ['literal string 1', 'literal string 2',  'literal hello', 'literal hello kitty'];

        Ember.RSVP.all(strings.map(function(string, index) {
            return model.create({content: {
                string: string,
                integer: 40%(index+4),
                float: 28%(index+2),
                boolean: false,
                basic: {
                    _id: 'basic'+index%2,
                    title: 'basic title '+index%2,
                    thumb: 'http://lorempixel.com/15'+index+'/15'+index
                }
            }}).save();
        })).then(function() {
            visit('/literal');

            andThen(function() {
                equal(find('.eureka-result-item').length, 4, "We have 4 results");
                fillIn('.eureka-search-query-input', 'basic.title = basic title 1');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 2, "We have now 2 results");
                var items = find('.eureka-result-item .eureka-item-title');
                var titles = items.toArray().map(function(i){return $(i).text().trim();}).sort();
                equal(titles[0], "literal hello kitty");
                equal(titles[1], "literal string 2");
                fillIn('.eureka-search-query-input', 'basic.title = basic title 0');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 2, "We have now 2 results");
                var items = find('.eureka-result-item .eureka-item-title');
                var titles = items.toArray().map(function(i){return $(i).text().trim();}).sort();
                equal(titles[0], "literal hello");
                equal(titles[1], "literal string 1");
                done();
            });

        });
    });

    it('should sort the results', function(done) {
        var model = App.db.Literal.get('model');
        var strings = ['literal string 1', 'literal string 2',  'literal hello', 'literal hello kitty'];

        Ember.RSVP.all(strings.map(function(string, index) {
            return model.create({content: {
                string: string,
                integer: 40%(index+2),
                float: 28%(index+2),
                boolean: Boolean(2%index),
                basic: {
                    _id: 'basic'+index%2,
                    title: 'basic title '+index%2,
                    thumb: 'http://placehold.it/150x150'
                }
            }}).save();
        })).then(function() {
            visit('/literal');

            andThen(function() {
                equal(find('.eureka-result-item').length, 4, "It should have 4 items");
                equal(find('select').val(), 'boolean,-integer');
                var items = find('.eureka-result-item .eureka-item-title');
                var titles = items.toArray().map(function(i){return $(i).text().trim();});
                equal(titles[0], "literal string 2");
                equal(titles[1], "literal string 1", "the second item should be literal string 1");
                equal(titles[2], "literal hello");
                equal(titles[3], "literal hello kitty", 'the last item is literal hello kitty');
                $('select').val('string').change();
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 4, "It should have 4 items");
                equal(find('select').val(), 'string');
                var items = find('.eureka-result-item .eureka-item-title');
                var titles = items.toArray().map(function(i){return $(i).text().trim();});
                equal(titles[0], "literal hello");
                equal(titles[1], "literal hello kitty", "the second item is literal hello kitty");
                equal(titles[2], "literal string 1");
                equal(titles[3], "literal string 2");
                done();
            });
        });
    });

    it('custom simple action', function(done) {
        var model = App.db.Literal.get('model');
        var strings = ['literal string 1', 'literal string 2',  'literal hello'];

        Ember.RSVP.all(strings.map(function(string) {
            return model.create({content: {string: string, integer: 40, float: 28, boolean: false}}).save();
        })).then(function() {
            visit('/literal');

            andThen(function() {
                equal(find('.eureka-result-item').length, 3, "We have now 3 results");
                click('.eureka-result-item .eureka-link-to-display:eq(1)');
            });

            andThen(function() {
                equal(find('.eureka-action.eureka-main-action.eureka-literal-model:eq(0)').text().trim(), 'edit', "The first action's label should be edit");
                equal(find('.eureka-action.eureka-main-action:eq(0) i.glyphicon').length, 1, "The edit action should have an icon");
                equal(find('.eureka-action.eureka-main-action.eureka-literal-model:eq(1)').text().trim(), 'delete', "The second action's label should be delete");
                equal(find('.eureka-action.eureka-main-action.eureka-literal-model:eq(2)').text().trim(), 'check boolean', "The third action's label should be check boolean");
                equal(find('.eureka-action.eureka-secondary-action.eureka-literal-model:eq(0)').text().trim(), 'float/2', "The third action's label should be float/2");

                equal(find('.eureka-float-field .eureka-field-value').text().trim(), '28', "The float value is 28");
                click('.eureka-divide-float-by2-action.eureka-literal-model');
            });

            andThen(function() {
                equal(find('.eureka-float-field .eureka-field-value').text().trim(), '14', "The float value is now 14");

                equal(find('.eureka-boolean-field .eureka-field-value').text().trim(), 'false', "The boolean value is false");
                equal(find('.eureka-toggle-boolean-action.eureka-literal-model .glyphicon.glyphicon-unchecked').length, 1, "toggleBoolean action's icon should be unchecked");
                click('.eureka-toggle-boolean-action.eureka-literal-model');
            });

            andThen(function() {
                equal(find('.eureka-boolean-field .eureka-field-value').text().trim(), 'true', "The boolean value is true");
                equal(find('.eureka-action.eureka-main-action.eureka-literal-model:eq(2)').text().trim(), 'uncheck boolean', "The third action's label should now be uncheck boolean");
                equal(find('.eureka-toggle-boolean-action.eureka-literal-model .glyphicon.glyphicon-check').length, 1, "toggleBoolean action's icon should be checked");
                done();
            });
        });
    });

});