
/* Custom Template
 * Allow to test the ability to overload and rewrite
 * presentations templates of the model
 */

test('Create a CustomTemplate', function() {
    expect(13);

    visit('/custom_template/new');

    fillIn('.field-input[name=title]', 'Hello World');
    fillIn('.field-input[name=description]', 'Just a thought');
    click('.field-input[name=boolean]');
    click('button.save');


    andThen(function() {
        equal(currentURL(), '/custom_template', 'We go back to the custom template list');
        equal(find('.item-title').length, 1, "We have now 1 result");

        equal(find('h1.custom-title').text(), "This is the custom list", "Display the custom list");

        equal(find('a.item-title:eq(0)').text().trim(), 'Hello World !!', "The result has a custom title");
        equal(find('.item-description:eq(0)').text().trim(), '--Just a thought--', "The result has a custom description");

        click('a.item-title:contains("Hello World !!")');
        andThen(function() {
            equal(currentPath(), 'generic_model.display');

            equal(find('.document .field:eq(0) .field-name').text(), "title", "The first field is 'title'");
            equal(find('.document .field:eq(0) .field-value').text().trim(), "Hello World", "the title is correctly filled");

            equal(find('.document .field:eq(1) .field-name').text(), "description", "The second field is 'description'");
            equal(find('.document .field:eq(1) .field-value').text().trim(), "Just a thought", "the description is correctly filled");

            equal(find('.document .field:eq(2) .field-name').text(), "boolean", "The third field is 'boolean'");
            equal(find('.document .field:eq(2) .field-value').text().trim(), "boolean oh yeah baby !!", "the boolean is customized");

            click('.go-to-model-edit');
            andThen(function() {
                equal(find('.document').text().trim(), "This is a custom template. The model Hello World cannot be edited", "Display the custom template form");
            });
        });
    });
});