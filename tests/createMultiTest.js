
test('Display Multi form', function() {
    expect(15);
    visit("/");
    click('.menu-item.multi > .model-to-new');

    andThen(function() {
        equal(currentURL(), '/multi/new', "The formular is displayed");

        equal(find('.new-document-title').text(), "New Multi", "The title form is rendered");

        equal(find('.field:eq(0) .field-name').text(), "title", "The first field name is 'title'");
        equal(find('.field:eq(0) .field-input').attr('type'), "text", "A title is a text input");
        equal(find('.field:eq(0) .field-input').attr('name'), "title", "Its name is 'title'");

        equal(find('.field:eq(1) .field-name').text(), "string", "The second field name is 'string'");
        equal(find('.field:eq(1) .field-input').length, 0, 'There is no input yet');

        click('.field:eq(1) .multi-field-add-value');

        andThen(function() {
            equal(find('.field:eq(1) .field-input').length, 1, 'The first input has been added');
            equal(find('.field:eq(1) .field-input:eq(0)').attr('type'), "text", "A string is a text input");
            equal(find('.field:eq(1) .field-input:eq(0)').attr('name'), "string", "Its name is 'string'");

            click('.field:eq(1) .multi-field-add-value');

            andThen(function() {
                equal(find('.field:eq(2) .field-name').text(), "integer", "The second field name is 'integer'");
                equal(find('.field:eq(2) .field-input').length, 0, 'There is no input yet');

                click('.field:eq(2) .multi-field-add-value');
                click('.field:eq(2) .multi-field-add-value');

                andThen(function() {
                    equal(find('.field:eq(2) .field-input').length, 2, 'Two input have been added');
                    equal(find('.field:eq(2) .field-input:eq(0)').attr('type'), "number", "A integer is a number input");
                    equal(find('.field:eq(2) .field-input:eq(0)').attr('name'), "integer", "Its name is 'integer'");
                });

            });
        });
    });
});


test('Create a Multi', function() {
    expect(14);
    visit('/');
    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/multi/new');

        fillIn('.field-input[name=title]', 'The big title');

        // display string inputs
        click('.field:eq(1) .multi-field-add-value');
        click('.field:eq(1) .multi-field-add-value');

        // display integer inputs
        click('.field:eq(2) .multi-field-add-value');
        click('.field:eq(2) .multi-field-add-value');

        andThen(function() {
            fillIn('.field:eq(1) .field-input:eq(0)', 'First string');
            fillIn('.field:eq(1) .field-input:eq(1)', 'Second string');
            fillIn('.field:eq(2) .field-input:eq(0)', 42);
            fillIn('.field:eq(2) .field-input:eq(1)', 24);

            click('button.save');

            andThen(function() {
                equal(currentURL(), '/multi', 'We go back to the basics list');
                equal(find('.result-item').length, 1, "We have now 1 result");

                equal(find('.result-item .item-title > a').text().trim(), 'The big title', "The result has a correct title");

                click('.result-item:eq(0) > .item-title > a');
                andThen(function() {
                    equal(currentPath(), 'generic_model.display');
                    equal(find('.document-title:contains("The big title")').length, 1, "The document should have the correct title");

                    equal(find('.document .field:eq(0) .field-name').text(), "title", "the first field name is 'title'");
                    equal(find('.document .field:eq(0) .field-value').text().trim(), "The big title", "title is correctly filled");

                    equal(find('.document .field:eq(1) .field-name').text(), "string", "the second field name is 'string'");
                    equal(find('.document .field:eq(1) .field-value ul > li:eq(0)').text().trim(), "First string", "the first string item is displayed");
                    equal(find('.document .field:eq(1) .field-value ul > li:eq(1)').text().trim(), "Second string", "the second string item is displayed");

                    equal(find('.document .field:eq(2) .field-name').text(), "integer", "the third field name is 'integer'");
                    equal(find('.document .field:eq(2) .field-value ul > li:eq(0)').text().trim(), "42", "the first integer item is displayed");
                    equal(find('.document .field:eq(2) .field-value ul > li:eq(1)').text().trim(), "24", "the second integer item is displayed");

                });
            });
        });
    });
});
