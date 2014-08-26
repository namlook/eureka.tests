
var equal = chai.assert.equal;

describe('Multi', function() {

    it('Display Multi form', function(done) {
        visit("/multi");
        click('.eureka-link-to-new.eureka-multi-model');

        andThen(function() {
            equal(currentURL(), '/multi/new', "The formular is displayed");

            equal(find('.eureka-new-document-title').text(), "New Multi", "The title form is rendered");

            equal(find('.eureka-field:eq(0) .eureka-field-name').text(), "title", "The first field name is 'title'");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('type'), "text", "A title is a text input");
            equal(find('.eureka-field:eq(0) .eureka-field-input').attr('name'), "title", "Its name is 'title'");

            equal(find('.eureka-field:eq(1) .eureka-field-name').text(), "string", "The second field name is 'string'");
            equal(find('.eureka-field:eq(1) .eureka-field-input').length, 0, 'There is no input yet');

            click('.eureka-field:eq(1) .eureka-multi-field-add-input');

            andThen(function() {
                equal(find('.eureka-field:eq(1) .eureka-field-input').length, 1, 'The first input has been added');
                equal(find('.eureka-field:eq(1) .eureka-field-input:eq(0)').attr('type'), "text", "A string is a text input");
                equal(find('.eureka-field:eq(1) .eureka-field-input:eq(0)').attr('name'), "string", "Its name is 'string'");

                click('.eureka-field:eq(1) .eureka-multi-field-add-input');

                andThen(function() {
                    equal(find('.eureka-field:eq(2) .eureka-field-name').text(), "integer", "The second field name is 'integer'");
                    equal(find('.eureka-field:eq(2) .eureka-field-input').length, 0, 'There is no input yet');

                    click('.eureka-field:eq(2) .eureka-multi-field-add-input');
                    click('.eureka-field:eq(2) .eureka-multi-field-add-input');

                    andThen(function() {
                        equal(find('.eureka-field:eq(2) .eureka-field-input').length, 2, 'Two input have been added');
                        equal(find('.eureka-field:eq(2) .eureka-field-input:eq(0)').attr('type'), "number", "A integer is a number input");
                        equal(find('.eureka-field:eq(2) .eureka-field-input:eq(0)').attr('name'), "integer", "Its name is 'integer'");
                        done();
                    });

                });
            });
        });
    });


    it('Create a Multi', function(done) {
        visit('/');
        andThen(function() {
            equal(find('.eureka-result-item').length, 0, "No result yet");

            visit('/multi/new');

            fillIn('.eureka-field-input[name=title]', 'The big title');

            // display string inputs
            click('.eureka-field:eq(1) .eureka-multi-field-add-input');
            click('.eureka-field:eq(1) .eureka-multi-field-add-input');

            // display integer inputs
            click('.eureka-field:eq(2) .eureka-multi-field-add-input');
            click('.eureka-field:eq(2) .eureka-multi-field-add-input');

            andThen(function() {
                fillIn('.eureka-field:eq(1) .eureka-field-input:eq(0)', 'First string');
                fillIn('.eureka-field:eq(1) .eureka-field-input:eq(1)', 'Second string');
                fillIn('.eureka-field:eq(2) .eureka-field-input:eq(0)', 42);
                fillIn('.eureka-field:eq(2) .eureka-field-input:eq(1)', 24);

                click('.eureka-save-action');

                andThen(function() {
                    equal(currentURL(), '/multi', 'We go back to the basics list');
                    equal(find('.eureka-result-item').length, 1, "We have now 1 result");

                    equal(find('.eureka-result-item .eureka-item-title a').text().trim(), 'The big title', "The result has a correct title");

                    click('.eureka-result-item:eq(0) .eureka-item-title a');
                    andThen(function() {
                        equal(currentPath(), 'multi.display');
                        equal(find('.eureka-document-title:contains("The big title")').length, 1, "The document should have the correct title");

                        equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-name').text(), "title", "the first field name is 'title'");
                        equal(find('.eureka-document .eureka-field:eq(0) .eureka-field-value').text().trim(), "The big title", "title is correctly filled");

                        equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-name').text(), "string", "the second field name is 'string'");
                        equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value ul > li:eq(0)').text().trim(), "First string", "the first string item is displayed");
                        equal(find('.eureka-document .eureka-field:eq(1) .eureka-field-value ul > li:eq(1)').text().trim(), "Second string", "the second string item is displayed");

                        equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-name').text(), "integer", "the third field name is 'integer'");
                        equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value ul > li:eq(0)').text().trim(), "42", "the first integer item is displayed");
                        equal(find('.eureka-document .eureka-field:eq(2) .eureka-field-value ul > li:eq(1)').text().trim(), "24", "the second integer item is displayed");
                        done();
                    });
                });
            });
        });
    });
});

