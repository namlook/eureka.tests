
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

    it('disaply a new literal form', function(done) {
        visit("/literal");
        andThen(function() {
            click('.model-to-new.literal');
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

                equal(find('.eureka-result-item .eureka-item-description').length, 0, "The result has no description");
                equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");


                click('.eureka-result-item .eureka-item-title a:contains("Hello World")');
                andThen(function() {
                    equal(currentPath(), 'generic_model.display');
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


    it('Edit a Basic relation from a Literal', function() {
        Ember.run(function() {
            App.db.Basic.get('model').create({content: {
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

            equal(find('.eureka-result-item .eureka-item-description').length, 0, "The result has no description");
            equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");

            click('.eureka-result-item:eq(0) a');
        });

        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "basic", "the second field name is 'basic'");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "basic title", "basic is correctly filled");
            click('.eureka-document .eureka-field:eq(1) .eureka-field-value a');
        });

        andThen(function() {
            equal(find('.eureka-document-title.basic:contains("basic title")').length, 1, 'display the basic title');
            click('.model-to-edit.basic');
        });

        andThen(function() {
            assert.match(currentURL(), /^\/basic\/\w+\/edit/, 'We are editing a basic page');
        });
    });

    it('Create a literal with relation', function(done) {
        this.timeout(3500);
        App.db.Basic.get('model').create({content: {
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

                        equal(find('.eureka-result-item .eureka-item-description').length, 0, "The result has no description");
                        equal(find('.eureka-result-item .eureka-item-thumb').length, 0, "The result has no thumb");


                        click('.eureka-result-item .eureka-item-title a:contains("Hello World")');

                        andThen(function() {
                            equal(currentPath(), 'generic_model.display');
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

});