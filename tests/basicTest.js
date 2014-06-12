
var equal = chai.assert.equal;

describe('Basic', function() {

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


    it('New basic form', function() {
        visit("/basic");

        andThen(function() {
            click('.model-to-new.basic');
        });

        andThen(function() {
            equal(currentURL(), '/basic/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New Basic", "The title form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "title", "The first field name is 'title'");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('type'), "text", "A title is a text input");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('name'), "title", "Its name is 'title'");

            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "description", "The second field name is 'description'");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('type'), "text", "A description is a text input");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('name'), "description", "Its name is 'description'");

            equal(find('.eureka-field:eq(2) .eureka-field-name').text(), "thumb", "The third field name is 'thumb'");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('type'), "text", "A thumb is a text input");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('name'), "thumb", "Its name is 'thumb'");
        });
    });


    it('Create a Basic', function() {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/basic/new');
        });

        andThen(function() {
            fillIn('.eureka-field-input[name=title]', 'The big title');
        });
        andThen(function() {
            fillIn('.eureka-field-input[name=description]', 'The best description ever');
        });
        andThen(function() {
            fillIn('.eureka-field-input[name=thumb]', "http://placekitten.com/140/140");
        });

        andThen(function() {
            click('.eureka-save-action.basic');
        });


        andThen(function() {
            equal(currentURL(), '/basic', 'We go back to the basics list');
            equal(find('.eureka-result-item').length, 1, "We have now 1 result");

            equal(find('.eureka-result-item .eureka-item-title > a').text().trim(), 'The big title', "The result has a correct title");
            equal(find('.eureka-result-item .eureka-item-description').text().trim(), "The best description ever", "The result has a correct description");
            equal(find('.eureka-result-item .eureka-item-thumb').attr('src'), "http://placekitten.com/140/140", "The result has a correct thumb");

            click('.eureka-result-item:eq(0) .eureka-item-title a');
        });
        andThen(function() {
            equal(currentPath(), 'generic_model.display');
            equal(find('.eureka-document-title:contains("The big title")').length, 1, "The document should have the correct title");

            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "title", "the first field name is 'title'");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "The big title", "title is correctly filled");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "description", "the first field name is 'description'");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "The best description ever", "description is correctly filled");

            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "thumb", "the first field name is 'thumb'");
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value').text().trim(), "http://placekitten.com/140/140", "thumb is correctly filled");
        });
    });

    it('Simple search basic', function(done) {
        var model = App.db.Basic.get('model');
        var titles = ['basic title 1', 'basic title 2',  'basic hello'];

        Ember.RSVP.all(titles.map(function(title) {
            return model.create({content: {title: title, integer: 40}}).save();
        })).then(function() {
            visit('/basic');

            andThen(function() {
                equal(find('.eureka-result-item').length, 3, "We have now 3 results");
                fillIn('.eureka-simple-query', 'basic t');
            });

            andThen(function() {
                Ember.run.later(function(){
                    equal(find('.eureka-result-item').length, 2, "We have now 2 results");
                    fillIn('.eureka-simple-query', 'basic title 1');
                }, 700);
            });

            andThen(function() {
                Ember.run.later(function(){
                    equal(find('.eureka-result-item').length, 1, "We have now 1 results");
                    done();
                }, 700);
            });

        });
    });
});
