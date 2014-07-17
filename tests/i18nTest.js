
var equal = chai.assert.equal;
var assert = chai.assert;

describe('I18n', function() {

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

    it('display a new form', function(done) {
        visit("/i18n");
        andThen(function() {
            click('.eureka-link-to-new.eureka-i18n-model');
        });

        andThen(function() {
            equal(currentURL(), '/i18n/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New Internationalization", "The string form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "string", "The first field's name is 'string'");
            equal(find('.eureka-string-field .eureka-i18n-field-input').length, 1, 'the sting input is shown');
            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "multi", "The second field's name is 'multi'");
            equal(find('.eureka-field:eq(2) .eureka-field-name').text(), "display all string", "The third field's name is 'display all string'");
            equal(find('.eureka-field:eq(3) .eureka-field-name').text(), "multi all", "The fourth field's name is 'multi all'");
        });

        // multi
        andThen(function() {
            equal(find('.eureka-multi-field input').length, 0, 'there is no multi-i18n input field shown');
            click('.eureka-multi-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-multi-field input').length, 1, 'there is one multi-i18n input field shown');

            click('.eureka-multi-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-multi-field input').length, 2, 'there is two multi-i18n input field shown');
            equal(find('.eureka-sting-all-field input').length, 0, 'there is no string-all input field shown');

            click('.eureka-string-all-field .eureka-i18n-field-add-input');
        });

        // stringAll
        andThen(function() {
            equal(find('.eureka-string-all-field input').length, 2, 'there is one string-all input field shown');
            equal(find('.eureka-multi-all-field input').length, 0, 'there is no multi-all input field shown');
            click('.eureka-multi-all-field .eureka-multi-field-add-input');
        });

        // multiAll
        andThen(function() {
            equal(find('.eureka-multi-all-field input').length, 2, 'there is no multi-all input field shown');
            done();
        });
    });


    it('create a new object', function(done) {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/i18n/new');
        });

        andThen(function() {
            fillIn('.eureka-string-field .eureka-field-input:eq(0)[name=string]', 'foo');
        });

        // multi-field
        andThen(function() {
            click('.eureka-multi-field .eureka-multi-field-add-input');
            click('.eureka-multi-field .eureka-multi-field-add-input');
        });


        andThen(function() {
            fillIn('.eureka-multi-field .eureka-field-input:eq(0)[name=multi]', 'foo');
        });

        andThen(function() {
            fillIn('.eureka-multi-field .eureka-field-input:eq(1)[name=multi]', 'bar');
        });


        // stringAll field
        andThen(function() {
            click('.eureka-string-all-field .eureka-i18n-field-add-input');
            click('.eureka-string-all-field .eureka-i18n-field-add-input');
        });

        andThen(function() {
            fillIn('.eureka-string-all-field .eureka-i18n-field-lang-input:eq(0)[name=string-all-lang]', 'en');
            fillIn('.eureka-string-all-field .eureka-field-input:eq(0)[name=string-all]', 'hi');
        });

        andThen(function() {
            fillIn('.eureka-string-all-field .eureka-i18n-field-lang-input:eq(1)[name=string-all-lang]', 'fr');
            fillIn('.eureka-string-all-field .eureka-field-input:eq(1)[name=string-all]', 'salut');
        });

        // multiAll field
        andThen(function() {
            click('.eureka-multi-all-field .eureka-multi-field-add-input');
            click('.eureka-multi-all-field .eureka-multi-field-add-input');
            click('.eureka-multi-all-field .eureka-multi-field-add-input');
            click('.eureka-multi-all-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            fillIn('.eureka-multi-all-field .eureka-i18n-field-lang-input:eq(0)[name=multi-all-lang]', 'fr');
            fillIn('.eureka-multi-all-field .eureka-field-input:eq(0)[name=multi-all]', 'toto');
        });

        andThen(function() {
            fillIn('.eureka-multi-all-field .eureka-i18n-field-lang-input:eq(1)[name=multi-all-lang]', 'fr');
            fillIn('.eureka-multi-all-field .eureka-field-input:eq(1)[name=multi-all]', 'tata');
        });


        andThen(function() {
            fillIn('.eureka-multi-all-field .eureka-i18n-field-lang-input:eq(2)[name=multi-all-lang]', 'en');
            fillIn('.eureka-multi-all-field .eureka-field-input:eq(2)[name=multi-all]', 'foo');
        });

        andThen(function() {
            fillIn('.eureka-multi-all-field .eureka-i18n-field-lang-input:eq(3)[name=multi-all-lang]', 'en');
            fillIn('.eureka-multi-all-field .eureka-field-input:eq(3)[name=multi-all]', 'bar');
        });

        // save
        andThen(function() {
            click('.eureka-save-action.eureka-i18n-model');
        });


        andThen(function() {
            equal(currentURL(), '/i18n', 'We go back to the i18ns list');
            equal(find('.eureka-result-item').length, 1, "We have now 1 result");
            equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'foo', "The result has a correct title");

            click('.eureka-result-item:eq(0) .eureka-item-title a');
        });

        // string field
        andThen(function() {
            equal(currentPath(), 'i18n.display');
            equal(find('.eureka-document-title').text().trim(), 'foo', "The document should have the correct title");

            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "string", "the first field name is 'string'");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "foo", "string english version is correctly filled");
        });

        // multi field
        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "multi", "the second field name is 'multi'");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-item:eq(0)').text().trim(), "bar", "multi english version is correctly filled (1)");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-item:eq(1)').text().trim(), "foo", "multi english version is correctly filled (2)");
        });

        // stringAll field
        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "display all string", "the third field name is 'display all string'");

            equal(find('.eureka-document .eureka-field:eq(2) .eureka-i18n-lang:eq(0)').text().trim(), "en", "the lang is english");
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-i18n-value:eq(0)').text().trim(), "hi", "stringAll english version is correctly filled");
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-i18n-lang:eq(1)').text().trim(), "fr", "the lang is french");
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-i18n-value:eq(1)').text().trim(), "salut", "stringAll french version is correctly filled");
        });

        // multiAll field
        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(3) .eureka-field-name').text(), "multi all", "the second field name is 'multi all'");

            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-lang:eq(0)').text().trim(), "en", "the lang is english (1)");
            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-value:eq(0)').text().trim(), "bar", "multiAll english version is correctly filled (1)");

            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-lang:eq(1)').text().trim(), "en", "the lang is english (2)");
            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-value:eq(1)').text().trim(), "foo", "multiAll english version is correctly filled (2)");

            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-lang:eq(2)').text().trim(), "fr", "the lang is french (1)");
            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-value:eq(2)').text().trim(), "tata", "multiAll french version is correctly filled (1)");

            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-lang:eq(3)').text().trim(), "fr", "the lang is french (2)");
            equal(find('.eureka-document .eureka-field:eq(3) .eureka-i18n-value:eq(3)').text().trim(), "toto", "multiAll french version is correctly filled (1)");

            done();
        });

    });


    it('edit an object', function(done) {
        var model = App.db.I18n.get('model');
        model.create({content: {
            string: {en: 'foo 1'},
            multi: {en: ['hi', 'hello']},
        }}).save().then(function() {
            visit('/i18n');

            andThen(function() {

                equal(find('.eureka-result-item').length, 1, "We have now 1 result");
                equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'foo 1', "The result has a correct title");

                click('.eureka-result-item:eq(0) .eureka-item-title a');
            });

            andThen(function() {
                click('.eureka-edit-action');
            });

            andThen(function() {
                fillIn('.eureka-string-field .eureka-field-input', 'bar 1');
            });

            andThen(function() {
                click('.eureka-save-action.eureka-i18n-model');
            });

            andThen(function() {
                equal(find('.eureka-string-field .eureka-field-value').text().trim(), 'bar 1', 'The title should have been modified');
            });

            andThen(function() {
                done();
            });
        });
    });


    it.skip('advanced search', function(done) {
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

    it.skip('should sort the results', function(done) {
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

});