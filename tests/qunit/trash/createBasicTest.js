
test('New basic form', function() {
    expect(11);
    visit("/");
    click('.menu-item.basic > .model-to-new');

    andThen(function() {
        equal(currentURL(), '/basic/new', "The formular is displayed");

        equal(find('.new-document-title').text(), "New Basic", "The title form is rendered");

        equal(find('.field:eq(0) .field-name').text(), "title", "The first field name is 'title'");
        equal(find('.field:eq(0) .field-input').attr('type'), "text", "A title is a text input");
        equal(find('.field:eq(0) .field-input').attr('name'), "title", "Its name is 'title'");

        equal(find('.field:eq(1) .field-name').text(), "description", "The second field name is 'description'");
        equal(find('.field:eq(1) .field-input').attr('type'), "text", "A description is a text input");
        equal(find('.field:eq(1) .field-input').attr('name'), "description", "Its name is 'description'");

        equal(find('.field:eq(2) .field-name').text(), "thumb", "The third field name is 'thumb'");
        equal(find('.field:eq(2) .field-input').attr('type'), "text", "A thumb is a text input");
        equal(find('.field:eq(2) .field-input').attr('name'), "thumb", "Its name is 'thumb'");

    });
});


test('Create a Basic', function() {
    expect(14);

    visit('/');
    andThen(function() {
        equal(find('.result-item').length, 0, "No result yet");

        visit('/basic/new');

        fillIn('.field-input[name=title]', 'The big title');
        fillIn('.field-input[name=description]', 'The best description ever');
        fillIn('.field-input[name=thumb]', "http://placehold.it/40x40");

        click('button.save');


        andThen(function() {
            equal(currentURL(), '/basic', 'We go back to the basics list');
            equal(find('.result-item').length, 1, "We have now 1 result");

            equal(find('.result-item .item-title > a').text().trim(), 'The big title', "The result has a correct title");
            equal(find('.result-item .item-description').text(), "The best description ever", "The result has a correct description");
            equal(find('.result-item .item-thumb').attr('src'), "http://placehold.it/40x40", "The result has a correct thumb");

            click('.result-item:eq(0) > .item-title > a');
            andThen(function() {
                equal(currentPath(), 'generic_model.display');
                equal(find('.document-title:contains("The big title")').length, 1, "The document should have the correct title");

                equal(find('.document .field:eq(0) .field-name').text(), "title", "the first field name is 'title'");
                equal(find('.document .field:eq(0) .field-value').text().trim(), "The big title", "title is correctly filled");

                equal(find('.document .field:eq(1) .field-name').text(), "description", "the first field name is 'description'");
                equal(find('.document .field:eq(1) .field-value').text().trim(), "The best description ever", "description is correctly filled");

                equal(find('.document .field:eq(2) .field-name').text(), "thumb", "the first field name is 'thumb'");
                equal(find('.document .field:eq(2) .field-value').text().trim(), "http://placehold.it/40x40", "thumb is correctly filled");
            });
        });

    });
});
