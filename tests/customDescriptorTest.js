
var equal = chai.assert.equal;

describe('CustomDescriptor', function() {

    beforeEach(function(done) {
        Ember.$.ajax({
            url: 'http://localhost:7999/api/1/',
            type: 'delete',
            error: function(jqXHR) {
                console.log('XXX error:', jqXHR.responseText);
            }
        }).success(function() {
            done();
        });
        App.reset();
    });


    it('Create a CustomDescriptor (boolean true)', function(done) {
        expect(10);
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/custom_descriptor/new');

            fillIn('.eureka-field-input[name=string]', 'Hello World');
            fillIn('.eureka-field-input[name=float]', '3.14');
            click('.eureka-field-input[name=boolean]');
            fillIn('.eureka-field-input[name=integer]', '142');
            click('.eureka-save-action');


            andThen(function() {
                equal(currentURL(), '/custom_descriptor', 'We go back to the custom descriptors list');
                equal(find('.eureka-result-item').length, 1, "We have now 1 result");

                equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'Hello World (3.14)', "The result has a correct title");
                equal(find('.eureka-result-item .eureka-item-description').text().trim(), '142 persons', "The result has a correct description");
                equal(find('.eureka-result-item .eureka-item-thumb').attr('src'), 'http://placekitten.com/142/142', "The result has a correct thumb url");

                click('.eureka-result-item .eureka-item-title a:contains("Hello World (3.14)")');
                andThen(function() {
                    equal(currentPath(), 'generic_model.display');
                    equal(find('.eureka-document-title:contains("Hello World (3.14)")').length, 1, "The document should have the correct title");
                    equal(find('.eureka-document-description:contains("142 persons")').length, 1, "The document should have the correct description");
                    equal(find('.eureka-document-thumb').attr('src'), "http://placekitten.com/142/142", "The document should have the correct thumb url");
                    done();
                });
            });
        });
    });

    it('Create a CustomDescriptor (boolean false)', function(done) {
        expect(10);
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/custom_descriptor/new');

            fillIn('.eureka-field-input[name=string]', 'Hello World');
            fillIn('.eureka-field-input[name=float]', '3.14');
            fillIn('.eureka-field-input[name=integer]', '142');
            click('.eureka-save-action');


            andThen(function() {
                equal(currentURL(), '/custom_descriptor', 'We go back to the custom descriptors list');
                equal(find('.eureka-result-item').length, 1, "We have now 1 result");

                equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'Hello World (3.14)', "The result has a correct title");
                equal(find('.eureka-result-item .eureka-item-description').text().trim(), 'no one', "The result has a correct description");
                equal(find('.eureka-result-item .eureka-item-thumb').attr('src'), 'http://placekitten.com/142/142', "The result has a correct thumb url");

                click('.eureka-result-item .eureka-item-title a:contains("Hello World (3.14)")');
                andThen(function() {
                    equal(currentPath(), 'generic_model.display');
                    equal(find('.eureka-document-title:contains("Hello World (3.14)")').length, 1, "The document should have the correct title");
                    equal(find('.eureka-document-description:contains("no one")').length, 1, "The document should have the correct description");
                    equal(find('.eureka-document-thumb').attr('src'), "http://placekitten.com/142/142", "The document should have the correct thumb url");
                    done();
                });
            });
        });
    });


    it('Simple search CustomDescriptor (with custom searchField)', function(done) {
        var model = App.db.CustomDescriptor.get('model');

        Ember.RSVP.all([
            model.create({content: {string: 'custom title 1', integer: 1, float: 1.0}}).save(),
            model.create({content: {string: 'custom title 2', integer: 2, float: 2.0}}).save(),
            model.create({content: {string: 'custom hello', integer: 3, float: 2.0}}).save()
        ]).then(function(data) {

            andThen(function() {
                visit('/custom_descriptor');
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 3, "We have now 3 results");
                equal(find('.eureka-search-query-input').attr('placeholder'), 'search a really custom object...', "the placeholder should be set");
                fillIn('.eureka-search-query-input', 'custom title');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 2, "We have now 2 results");
                fillIn('.eureka-search-query-input', 'custom title 1');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 1, "We have now 1 results");
                done();
            });
        });
    });

    it('should sort by a custom field', function(done) {
        var model = App.db.CustomDescriptor.get('model');
        Ember.RSVP.all([
            model.create({content: {string: 'lit1', integer: 100, float: 1.0}}).save(),
            model.create({content: {string: 'lit2', integer: 200, float: 2.0}}).save(),
            model.create({content: {string: 'lit3', integer: 300, float: 2.0}}).save(),
            model.create({content: {string: 'lit4', integer: 300, float: 3.0}}).save()
        ]).then(function(data) {

            andThen(function() {
                visit('/custom_descriptor');
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 4, "We have now 4 results");
                equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'lit3 (2)');
                equal(find('.eureka-result-item:eq(1) .eureka-item-title a').text().trim(), 'lit4 (3)');
                equal(find('.eureka-result-item:eq(2) .eureka-item-title a').text().trim(), 'lit2 (2)');
                equal(find('.eureka-result-item:eq(3) .eureka-item-title a').text().trim(), 'lit1 (1)');
                done();
            });
        });
    });
});