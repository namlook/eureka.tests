
module("CustomDescriptor", {
    setup: App.appSetup,
    teardown: App.appTeardown
});

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



test('Simple search CustomDescriptor (with custom searchField)', function() {

    var model = App.db.CustomDescriptor.get('model');
    Ember.run.begin();
    Ember.RSVP.all([
        model.create({content: {string: 'custom title 1'}}).save(),
        model.create({content: {string: 'custom title 2'}}).save(),
        model.create({content: {string: 'custom hello'}}).save()
    ]);
    Ember.run.end();

    andThen(function() {
        visit('/custom_descriptor');
    });

    andThen(function() {
        equal(find('.result-item').length, 3, "We have now 3 results");
        equal(find('.simple-query').attr('placeholder'), 'search a really custom object...', "the placeholder should be set");
        fillIn('.simple-query', 'custom title');
    });

    andThen(function() {
        Ember.run.later(function(){
            equal(find('.result-item').length, 2, "We have now 2 results");
            fillIn('.simple-query', 'custom title 1');
        }, 300);
    });

    andThen(function() {
        Ember.run.later(function(){
            equal(find('.result-item').length, 1, "We have now 1 results");
        }, 300);
    });

});


test('Sort by a custom field', function() {
    var model = App.db.CustomDescriptor.get('model');
    Ember.run.begin();
    Ember.RSVP.all([
        model.create({content: {string: 'lit1', integer: 1}}).save(),
        model.create({content: {string: 'lit2', integer: 2}}).save(),
        model.create({content: {string: 'lit3', integer: 3, float: 2.0}}).save(),
        model.create({content: {string: 'lit4', integer: 3, float: 3.0}}).save()
    ]);
    Ember.run.end();

    andThen(function() {
        visit('/custom_descriptor');
    });

    andThen(function() {
        equal(find('.result-item').length, 4, "We have now 4 results");
        equal(find('.result-item:eq(0) > .item-title > a').title().trim(), 'lit3');
        equal(find('.result-item:eq(1) > .item-title > a').title().trim(), 'lit4');
        equal(find('.result-item:eq(2) > .item-title > a').title().trim(), 'lit2');
        equal(find('.result-item:eq(3) > .item-title > a').title().trim(), 'lit1');
    });
});