
test('Create a CustomDescriptor (boolean true)', function() {
    expect(10);
    visit('/');
    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/custom_descriptor/new');

        fillIn('.field-input[name=string]', 'Hello World');
        fillIn('.field-input[name=float]', '3.14');
        click('.field-input[name=boolean]');
        fillIn('.field-input[name=integer]', '42');
        click('button.save');


        andThen(function() {
            equal(currentURL(), '/custom_descriptor', 'We go back to the custom descriptors list');
            equal(find('.result-item').length, 1, "We have now 1 result");

            equal(find('.result-item > .item-title > a').text().trim(), 'Hello World (3.14)', "The result has a correct title");
            equal(find('.result-item > .item-description').text().trim(), '42 persons', "The result has a correct description");
            equal(find('.result-item > .item-thumb').attr('src'), 'http://placehold.it/42x42', "The result has a correct thumb url");

            click('.result-item > .item-title > a:contains("Hello World (3.14)")');
            andThen(function() {
                equal(currentPath(), 'generic_model.display');
                equal(find('.document-title:contains("Hello World (3.14)")').length, 1, "The document should have the correct title");
                equal(find('.document-description:contains("42 persons")').length, 1, "The document should have the correct description");
                equal(find('.document-thumb').attr('src'), "http://placehold.it/42x42", "The document should have the correct thumb url");

            });
        });
    });
});

test('Create a CustomDescriptor (boolean false)', function() {
    expect(10);
    visit('/');
    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/custom_descriptor/new');

        fillIn('.field-input[name=string]', 'Hello World');
        fillIn('.field-input[name=float]', '3.14');
        fillIn('.field-input[name=integer]', '42');
        click('button.save');


        andThen(function() {
            equal(currentURL(), '/custom_descriptor', 'We go back to the custom descriptors list');
            equal(find('.result-item').length, 1, "We have now 1 result");

            equal(find('.result-item > .item-title > a').text().trim(), 'Hello World (3.14)', "The result has a correct title");
            equal(find('.result-item > .item-description').text().trim(), 'no one', "The result has a correct description");
            equal(find('.result-item > .item-thumb').attr('src'), 'http://placehold.it/42x42', "The result has a correct thumb url");

            click('.result-item > .item-title > a:contains("Hello World (3.14)")');
            andThen(function() {
                equal(currentPath(), 'generic_model.display');
                equal(find('.document-title:contains("Hello World (3.14)")').length, 1, "The document should have the correct title");
                equal(find('.document-description:contains("no one")').length, 1, "The document should have the correct description");
                equal(find('.document-thumb').attr('src'), "http://placehold.it/42x42", "The document should have the correct thumb url");

            });
        });
    });
});