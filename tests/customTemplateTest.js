
/* Custom Template
 * Allow to test the ability to overload and rewrite
 * presentations templates of the model
 */

var equal = chai.assert.equal;

describe('CustomTemplate', function() {

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


    it('Create a CustomTemplate', function(done) {
        visit('/custom_template/new');

        fillIn('.eureka-field-input[name=title]', 'Hello World');
        fillIn('.eureka-field-input[name=description]', 'Just a thought');
        click('.eureka-field-input[name=boolean]');
        click('.eureka-save-action');


        andThen(function() {
            equal(currentURL(), '/custom_template', 'We go back to the custom template list');
            equal(find('.item-title').length, 1, "We have now 1 result");

            equal(find('h1.custom-title').text(), "This is the custom list", "Display the custom list");

            equal(find('a.item-title:eq(0)').text().trim(), 'Hello World !!', "The result has a custom title");
            equal(find('.item-description:eq(0)').text().trim(), '--Just a thought:custom Hello World--', "The result has a custom description");

            click('a.item-title:contains("Hello World !!")');
            andThen(function() {
                equal(currentPath(), 'generic_model.display');

                equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "title", "The first field is 'title'");
                equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "Hello World", "the title is correctly filled");

                equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "description", "The second field is 'description'");
                equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value').text().trim(), "Just a thought", "the description is correctly filled");

                equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "boolean", "The third field is 'boolean'");
                equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value').text().trim(), "boolean oh yeah baby !!", "the boolean is customized");

                click('.model-to-edit.custom-template');
                andThen(function() {
                    equal(find('.document').text().trim(), "This is a custom template. The model Hello World cannot be edited even with custom Hello World", "Display the custom template form");
                    equal(find('.ctrl-field').text().trim(), "Hello World from controller", "Display the custom controller field");
                    equal(find('.route-field').text().trim(), "hi!", "Display the value added by the custom route");
                    done();
                });
            });
        });
    });
});
