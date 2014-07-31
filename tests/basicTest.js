
var equal = chai.assert.equal;

describe('Basic:', function() {

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


    it('display the form', function() {
        visit("/basic_object");

        andThen(function() {
            click('.eureka-link-to-new.eureka-basic-object-model');
        });

        andThen(function() {
            equal(currentURL(), '/basic_object/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New Basic", "The title form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "title", "The first field name is 'title'");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('type'), "text", "A title is a text input");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('name'), "title", "Its name is 'title'");

            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "description", "The second field name is 'description'");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('type'), "text", "A description is a text input");
            equal(find('.eureka-field:eq(1) .eureka-field-input').attr('name'), "description", "Its name is 'description'");

            equal(find('.eureka-field:eq(2) .eureka-field-name').text(), "thumbnail", "The third field name is 'thumbnail'");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('type'), "text", "A thumb is a text input");
            equal(find('.eureka-field:eq(2) .eureka-field-input').attr('name'), "thumb-url", "Its name is 'thumb-url'");

            equal(find('.eureka-field .eureka-field-input[name=hidden-field]').length, 0, "hidden field is... well, hidden");
        });
    });


    it('create an object', function() {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/basic_object/new');
        });

        andThen(function() {
            fillIn('.eureka-field-input[name=title]', 'The big title');
        });
        andThen(function() {
            fillIn('.eureka-field-input[name=description]', 'The best description ever');
        });
        andThen(function() {
            fillIn('.eureka-field-input[name=thumb-url]', "http://placekitten.com/140/140");
        });

        andThen(function() {
            click('.eureka-save-action.eureka-basic-object-model');
        });


        andThen(function() {
            equal(currentURL(), '/basic_object', 'We go back to the basics list');
            equal(find('.eureka-result-item').length, 1, "We have now 1 result");

            equal(find('.eureka-result-item .eureka-item-title > a').text().trim(), 'The big title', "The result has a correct title");
            equal(find('.eureka-result-item .eureka-item-description').text().trim(), "The best description ever", "The result has a correct description");
            equal(find('.eureka-result-item .eureka-item-thumb').attr('src'), "http://placekitten.com/140/140", "The result has a correct thumb");

            click('.eureka-result-item:eq(0) .eureka-item-title a');
        });
        andThen(function() {
            equal(currentPath(), 'basic_object.display');
            equal(find('.eureka-document-title:contains("The big title")').length, 1, "The document should have the correct title");

            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "title", "the first field name is 'title'");
            equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "The big title", "title is correctly filled");

            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "description", "the first field name is 'description'");
            equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "The best description ever", "description is correctly filled");

            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "thumbnail", "the first field name is 'thumbnail'");
            equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value').text().trim(), "http://placekitten.com/140/140", "thumbUrl is correctly filled");
        });
    });

    it('edit an object', function(done) {
        var model = App.db.BasicObject.get('model');
        model.create({content: {
            title: 'foo',
            description: 'A foo'
        }}).save().then(function() {
            visit('/basic_object');

            andThen(function() {

                equal(find('.eureka-result-item').length, 1, "We have now 1 result");
                equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'foo', "The result has a correct title");

                click('.eureka-result-item:eq(0) .eureka-item-title a');
            });

            andThen(function() {
                click('.eureka-edit-action');
            });

            andThen(function() {
                fillIn('.eureka-title-field .eureka-field-input', 'bar');
                fillIn('.eureka-description-field .eureka-field-input', 'A bar');
            });

            andThen(function() {
                click('.eureka-save-action.eureka-basic-object-model');
            });

            andThen(function() {
                equal(find('.eureka-title-field .eureka-field-value').text().trim(), 'bar', 'The title should have been modified');
                equal(find('.eureka-description-field .eureka-field-value').text().trim(), 'A bar', 'The description should have been modified');
            });

            // there must be only one item
            andThen(function() {
                visit('/basic_object');
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 1, "There must be only 1 result again");
                equal(find('.eureka-result-item:eq(0) .eureka-item-title a').text().trim(), 'bar', "The result has a correct title (2)");
            });

            andThen(function() {
                done();
            });
        });
    });


    it('simple search', function(done) {
        var model = App.db.BasicObject.get('model');
        var titles = ['basic title 1', 'basic title 2',  'basic hello'];

        Ember.RSVP.all(titles.map(function(title) {
            return model.create({content: {title: title, integer: 40}}).save();
        })).then(function() {
            visit('/basic_object');

            andThen(function() {
                equal(find('.eureka-result-item').length, 3, "We have now 3 results");
                fillIn('.eureka-search-query-input', 'basic t');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 2, "We have now 2 results");
                fillIn('.eureka-search-query-input', 'basic title 1');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });

            andThen(function() {
                equal(find('.eureka-result-item').length, 1, "We have now 1 results");
                done();
            });

        });
    });

    it('delete an object', function(done) {
        var model = App.db.BasicObject.get('model');
        var titles = ['basic title 1', 'basic title 2',  'basic hello'];

        Ember.RSVP.all(titles.map(function(title) {
            return model.create({content: {title: title, integer: 40}}).save();
        })).then(function() {
            visit('/basic_object');

            andThen(function() {
                equal(find('.eureka-result-item').length, 3, "We have now 3 results");
                click('.eureka-result-item .eureka-link-to-display:eq(1)');
            });

            andThen(function() {
                equal(currentPath(), 'basic_object.display', 'the item is displayed');

                // for whatever reason, the find helper cannot fetch alertify markup
                // which is added to the dom later. So let's fall back to jQuery instead:
                equal($('.alertify').length, 0, 'the dialog is not triggered yet');
                click('.eureka-delete-action.eureka-basic-object-model');
            });


            andThen(function() {
                equal($('.alertify').length, 1, 'the dialog is triggered');
                equal($('.alertify.alertify-confirm').length, 1, 'the confirm box is visible (1)');
                equal($('.alertify-message').text().trim(), "Are you sure you want to delete this document ?", "the confirm message is displayed (1)");
                $('.alertify-button.alertify-button-cancel').click();
            });

            andThen(function() {
                equal(currentPath(), 'basic_object.display', 'we are still on the document page');
                equal($('.alertify.alertify-hide.alertify-hidden').length, 1, 'the dialog is hidden');
                $('.eureka-delete-action.eureka-basic-object-model').click();
            });

            andThen(function() {
                equal($('.alertify.alertify-hide.alertify-hidden').length, 0, 'the dialog is not hidden anymore');
                equal($('.alertify.alertify-confirm').length, 1, 'the confirm box is visible (2)');
                equal($('.alertify-message').text().trim(), "Are you sure you want to delete this document ?", "the confirm message is displayed (2)");
                $('.alertify-button.alertify-button-ok').click();
            });

            andThen(function() {
                equal(currentPath(), 'basic_object.index', "we're back to the list");
                equal(find('.eureka-result-item').length, 2, "We have now only 2 results");
                done();
            });
        });
    });
});
