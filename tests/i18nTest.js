
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

    it('display a new i18n form', function(done) {
        visit("/i18n");
        andThen(function() {
            click('.eureka-link-to-new.eureka-i18n-model');
        });

        andThen(function() {
            equal(currentURL(), '/i18n/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New I18n", "The title form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "title", "The first field's name is 'title'");
            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "multi", "The second field's name is 'multi'");

            equal(find('.eureka-i18n-field-input').length, 0, 'there is no i18n input field shown');

            click('.eureka-title-field .eureka-i18n-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-i18n-field-input').length, 1, 'there is one i18n input field shown');

            click('.eureka-title-field .eureka-i18n-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-i18n-field-input').length, 2, 'there is two i18n input field shown');

            equal(find('.eureka-multi-field-input.eureka-i18n-field-inputs').length, 0, 'there is no multi-i18n input field shown');
            click('.eureka-multi-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-multi-field-input.eureka-i18n-field-inputs').length, 1, 'there is one multi-i18n input field shown');

            click('.eureka-multi-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            equal(find('.eureka-multi-field-input.eureka-i18n-field-inputs').length, 2, 'there is two multi-i18n input field shown');

            done();
        });
    });


    it('create a i18n', function(done) {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/i18n/new');
        });

        andThen(function() {
            click('.eureka-title-field .eureka-i18n-field-add-input');
            click('.eureka-title-field .eureka-i18n-field-add-input');
        });



        andThen(function() {
            fillIn('.eureka-i18n-field-lang-input:eq(0)[name=title-lang]', 'en');
            fillIn('.eureka-field-input:eq(0)[name=title]', 'foo');
        });

        andThen(function() {
            fillIn('.eureka-i18n-field-lang-input:eq(1)[name=title-lang]', 'fr');
            fillIn('.eureka-field-input:eq(1)[name=title]', 'toto');
        });

        andThen(function() {
            click('.eureka-multi-field .eureka-multi-field-add-input');
            click('.eureka-multi-field .eureka-multi-field-add-input');
            click('.eureka-multi-field .eureka-multi-field-add-input');
            click('.eureka-multi-field .eureka-multi-field-add-input');
        });

        andThen(function() {
            fillIn('.eureka-multi-field .eureka-i18n-field-lang-input:eq(0)[name=multi-lang]', 'fr');
            fillIn('.eureka-multi-field .eureka-field-input:eq(0)[name=multi]', 'toto');
        });

        andThen(function() {
            fillIn('.eureka-multi-field .eureka-i18n-field-lang-input:eq(1)[name=multi-lang]', 'fr');
            fillIn('.eureka-multi-field .eureka-field-input:eq(1)[name=multi]', 'tata');
        });



        andThen(function() {
            fillIn('.eureka-multi-field .eureka-i18n-field-lang-input:eq(2)[name=multi-lang]', 'en');
            fillIn('.eureka-multi-field .eureka-field-input:eq(2)[name=multi]', 'foo');
        });

        andThen(function() {
            fillIn('.eureka-multi-field .eureka-i18n-field-lang-input:eq(3)[name=multi-lang]', 'en');
            fillIn('.eureka-multi-field .eureka-field-input:eq(3)[name=multi]', 'bar');
        });


        andThen(function() {
            click('.eureka-save-action.eureka-i18n-model');
        });


        andThen(function() {
            equal(currentURL(), '/i18n', 'We go back to the i18ns list');
            equal(find('.eureka-result-item').length, 1, "We have now 1 result");
            equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'foo', "The result has a correct title");

            click('.eureka-result-item:eq(0) .eureka-item-title a');
        });

        andThen(function() {
            equal(currentPath(), 'i18n.display');
            equal(find('.eureka-document-title').text().trim(), 'foo', "The document should have the correct title");

            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "title", "the first field name is 'title'");

            equal(find('.eureka-document .eureka-field:eq(0) .eureka-i18n-lang:eq(0)').text().trim(), "en", "the lang is english");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-i18n-value:eq(0)').text().trim(), "foo", "title english version is correctly filled");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-i18n-lang:eq(1)').text().trim(), "fr", "the lang is french");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-i18n-value:eq(1)').text().trim(), "toto", "title french version is correctly filled");

        });

        andThen(function() {
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "multi", "the second field name is 'multi'");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-lang:eq(0)').text().trim(), "en", "the lang is english (1)");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-value:eq(0)').text().trim(), "bar", "multi english version is correctly filled (1)");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-lang:eq(1)').text().trim(), "en", "the lang is english (2)");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-value:eq(1)').text().trim(), "foo", "multi english version is correctly filled (2)");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-lang:eq(2)').text().trim(), "fr", "the lang is french (1)");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-value:eq(2)').text().trim(), "tata", "multi french version is correctly filled (1)");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-lang:eq(3)').text().trim(), "fr", "the lang is french (2)");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-i18n-value:eq(3)').text().trim(), "toto", "multi french version is correctly filled (1)");

            done();
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