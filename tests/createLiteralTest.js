
test('New literal form', function() {
    expect(19);
    visit("/");
    click('.menu-item.literal > .go-to-model-new');

    andThen(function() {
        equal(currentURL(), '/literal/new', "The formular is displayed");

        equal(find('.new-document-title').text(), "New Literal", "The title form is rendered");

        equal(find('.field:eq(0) .field-name').text(), "string", "The first field's name is 'string'");
        equal(find('.field:eq(0) .field-input').attr('type'), "text", "A string is a text input");
        equal(find('.field:eq(0) .field-input').attr('name'), "string", "Its name is 'string'");

        equal(find('.field:eq(1) .field-name').text(), "boolean", "The second field's name is 'boolean'");
        equal(find('.field:eq(1) .field-input').attr('type'), "checkbox", "A boolean is a checkbox");
        equal(find('.field:eq(1) .field-input').attr('name'), "boolean", "Its name is 'boolean'");


        equal(find('.field:eq(2) .field-name').text(), "integer", "The third field's name is 'integer'");
        equal(find('.field:eq(2) .field-input').attr('type'), "number", "An integer is a number");
        equal(find('.field:eq(2) .field-input').attr('name'), "integer", "Its name is 'integer'");

        equal(find('.field:eq(3) .field-name').text(), "float", "The fourth field's name is 'float'");
        equal(find('.field:eq(3) .field-input').attr('type'), "number", "An float is a number");
        equal(find('.field:eq(3) .field-input').attr('name'), "float", "Its name is 'float'");

        // date field
        equal(find('.field:eq(4) .field-name').text(), "date", "The fifth field's name is 'date'");
        equal(find('.field:eq(4) .field-input').attr('type'), "text", "An date is a text input");
        equal(find('.field:eq(4) .field-input').attr('name'), "date", "Its name is 'date'");

        equal(find('.picker').attr('aria-hidden'), "true", "The date picker is hidden");

        click('.field-input:eq(4)');

        andThen(function() {
            equal(find('.picker').attr('aria-hidden'), "false", "The date picker is visible");

        });
    });
});


test('Create a literal', function() {
    expect(18);
    visit('/');
    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/literal/new');

        fillIn('.field-input[name=string]', 'Hello World');
        fillIn('.field-input[name=float]', '3.14');
        click('.field-input[name=boolean]');
        fillIn('.field-input[name=integer]', '42');
        click('.field-input[name=date]');
        click('.picker__footer > button:contains("Today")');

        click('button.save');


        andThen(function() {
            equal(currentURL(), '/literal', 'We go back to the literals list');
            equal(find('.result-item').length, 1, "We have now 1 result");
            equal(find('.result-item > .item-title > a').text().trim(), 'Hello World', "The result has a correct title");

            equal(find('.result-item .item-description').length, 0, "The result has no description");
            equal(find('.result-item .item-thumb').length, 0, "The result has no thumb");


            click('.result-item > .item-title > a:contains("Hello World")');
            andThen(function() {
                equal(currentPath(), 'generic_model.display');
                equal(find('.document-title:contains("Hello World")').length, 1, "The document should have the correct title");

                equal(find('.document .field:eq(0) .field-name').text(), "string", "the first field name is 'string'");
                equal(find('.document .field:eq(0) .field-value').text().trim(), "Hello World", "string is correctly filled");

                equal(find('.document .field:eq(1) .field-name').text(), "boolean", "the second field name is 'boolean'");
                equal(find('.document .field:eq(1) .field-value').text().trim(), "true", "boolean is correctly filled");

                equal(find('.document .field:eq(2) .field-name').text(), "integer", "the third field name is 'integer'");
                equal(find('.document .field:eq(2) .field-value').text().trim(), "42", "integer is correctly filled");

                equal(find('.document .field:eq(3) .field-name').text(), "float", "the fourth field name is 'float'");
                equal(find('.document .field:eq(3) .field-value').text().trim(), "3.14", "float is correctly filled");

                equal(find('.document .field:eq(4) .field-name').text(), "date", "the fifth field name is 'date'");
                var valueYear = new Date(find('.document .field:eq(4) .field-value').text()).getFullYear();
                var thisYear = new Date().getFullYear();
                equal(valueYear, thisYear, "date is correctly filled");

            });
        });
    });
});
