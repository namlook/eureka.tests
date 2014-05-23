
test('New literal', function() {
    expect(13);
    visit("/");
    click(find('a:contains("Literal")').next());

    andThen(function() {
        equal(find('h1').text(), "New Literal", "The title form is rendered");
        equal(find('legend:eq(0)').text(), "string", "The first field is a string");
        equal(find('input:eq(0)').attr('type'), "text", "A string is a text input");
        equal(find('input:eq(0)').attr('name'), "string", "Its name is 'string'");

        equal(find('legend:eq(1)').text(), "boolean", "The second field is a boolean");
        equal(find('input:eq(1)').attr('type'), "checkbox", "A boolean is a checkbox");
        equal(find('input:eq(1)').attr('name'), "boolean", "Its name is 'boolean'");


        equal(find('legend:eq(2)').text(), "integer", "The third field is an integer");
        equal(find('input:eq(2)').attr('type'), "number", "An integer is a number");
        equal(find('input:eq(2)').attr('name'), "integer", "Its name is 'integer'");

        equal(find('legend:eq(3)').text(), "float", "The fourth field is a float");
        equal(find('input:eq(3)').attr('type'), "number", "An float is a number");
        equal(find('input:eq(3)').attr('name'), "float", "Its name is 'float'");
    });
});

test('New literal: date field', function() {
    expect(6);
    visit('/literal/new');

    andThen(function() {
        equal(find('h1').text(), "New Literal", "The title form is rendered");

        equal(find('legend:eq(4)').text(), "date", "The fifth field is a date");
        equal(find('input:eq(4)').attr('type'), "text", "An date is a text input");
        equal(find('input:eq(4)').attr('name'), "date", "Its name is 'date'");

        equal(find('.picker').attr('aria-hidden'), "true", "The date picker is hidden");

        click('input:eq(4)');

        andThen(function() {
            equal(find('.picker').attr('aria-hidden'), "false", "The date picker is visible");

        });
    });
});


test('Create a literal', function() {
    expect(11);
    visit('/');

    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/literal/new');

        fillIn('input[name=string]', 'Hello World');
        fillIn('input[name=float]', '3.14');
        click('input[name=boolean]');
        fillIn('input[name=integer]', '42');
        click('input[name=date]');
        click('.picker__footer > button:contains("Today")');

        click('button.save');


        andThen(function() {
            equal(currentURL(), '/literal', 'We go back to the literals list');
            equal(find('.result-item').length, 1, "We have now 1 result");
            equal(find('.result-item > .title > a').text().trim(), 'Hello World (3.14)', "The result has a correct title");

            click('.result-item > .title > a:contains("Hello World (3.14)")');

            andThen(function() {
                equal(currentPath(), 'type.display');
                equal(find('h1:contains("Hello World (3.14)")').length, 1, "The document should have the correct title");

                equal(find('fieldset legend:contains("string")').parent(':contains("Hello World")').length, 1, "string is filled with Hello World");
                equal(find('fieldset legend:contains("float")').parent(':contains("3.14")').length, 1, "float is filled with 3.14");
                equal(find('fieldset legend:contains("boolean")').parent(':contains("true")').length, 1, "boolean is true");
                equal(find('fieldset legend:contains("integer")').parent(':contains("42")').length, 1, "integer is filled with 42");
                var thisYear = new Date().getFullYear();
                equal(find('fieldset legend:contains("date")').parent(':contains("'+thisYear+'")').length, 1, "date is filled with "+thisYear);
            });
        });

    });
});
