
module("Relation auto-suggest:", {
    setup: App.appSetup,
    teardown: App.appTeardown
});


test('single relations', function() {
    Ember.run(function() {
        App.db.Basic.get('model').create({content: {
            title: 'basic title',
            description: 'basic description',
            thumb: 'http://placehold.it/65x65'
        }}).save();
    });

    andThen(function() {
        visit('/literal/new');

        fillIn('.field-input[name=basic]', 'basic');

        triggerEvent('.field-input[name=basic]', 'blur');

        andThen(function() {
            equal(find('.field-input[name=basic]').val(), '', 'the basic input is empty');

            find('.field-input[name=basic]').focus().typeahead('val', 'basic');

            Ember.run.later(function(){
                console.log(find('.tt-suggestions').html());
                equal(find('.tt-suggestion').length, 2, "2 items are suggested");
                equal(find('.tt-suggestion:eq(0)').text(), 'basic title', 'the first item is "basic title"');
                equal(find('.tt-suggestion:eq(1):contains("create new Basic")').length, 1, "the second item creates a Basic object");

                $('.tt-suggestion:eq(0)').click();

                andThen(function() {
                    equal(find('.selected-relation.basic:contains("basic title")').length, 1, "the selected item has a title");
                });
            }, 500);
        });
    });
});


test('multi relations', function() {
    Ember.run(function() {
        App.db.Basic.get('model').create({content: {
            title: 'basic title 1',
            description: 'basic description 1',
            thumb: 'http://placehold.it/65x65'
        }}).save();


        App.db.Basic.get('model').create({content: {
            title: 'basic title 2',
            description: 'basic description 2',
            thumb: 'http://placehold.it/70x70'
        }}).save();
    });

    andThen(function() {
        visit('/multi/new');

        fillIn('.field-input[name=basic]', 'basic ti');

        triggerEvent('.field-input[name=basic]', 'blur');

        andThen(function() {
            equal(find('.field-input[name=basic]').val(), '', "the basic input is empty");

            find('.field-input[name=basic]').focus().typeahead('val', 'basic ti');  // be carreful with typeahead cache !!
        });

        andThen(function() {
            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 3, 'there are 3 suggestions');
                equal(find('.tt-suggestion:eq(0)').text(), 'basic title 1', "first suggestion");
                equal(find('.tt-suggestion:eq(1)').text(), 'basic title 2', "second suggestion");
                equal(find('.tt-suggestion:eq(2):contains("create new Basic")').length, 1, "the third suggestion creates a basic");

                $('.tt-suggestion:eq(0)').click();

                Ember.run.later(function(){
                    andThen(function() {
                        equal(find('.selected-relation').length, 1, '1 item is selected');
                        equal(find('.selected-relation.basic:eq(0):contains("basic title 1")').length, 1, "the selected suggestion has a title");

                        find('.field-input[name=basic]').focus().typeahead('val', 'basic ti');

                        Ember.run.later(function(){
                            equal(find('.tt-suggestion').length, 3, "there are 3 suggestions");
                            equal(find('.tt-suggestion:eq(0)').text(), 'basic title 1', "first suggestion title");
                            equal(find('.tt-suggestion:eq(1)').text(), 'basic title 2', "second suggestion title");
                            equal(find('.tt-suggestion:eq(2):contains("create new Basic")').length, 1, "basic creation item");

                            $('.tt-suggestion:eq(1)').click();

                            andThen(function() {
                                equal(find('.selected-relation').length, 2, '2 items are selected');
                                equal(find('.selected-relation.basic:eq(1):contains("basic title 2")').length, 1, "the selected item has a title");
                            });
                        }, 300);
                    });
                }, 300);

            }, 500);
        });
    });
});


test('multi relations with __title__', function() {
    App.db.Literal.get('model').create({content: {
        string: 'literal 1',
        boolean: true
    }}).save();

    App.db.Literal.get('model').create({content: {
        string: 'literal 2',
        boolean: false
    }}).save();

    andThen(function() {
        expect(13);
        visit('/multi/new');

        fillIn('.field-input[name=literal]', 'liter');

        triggerEvent('.field-input[name=literal]', 'blur');

        andThen(function() {
            equal(find('.field-input[name=literal]').val(), '', 'the input suggestion is empty');

            find('.field-input[name=literal]').focus().typeahead('val', 'liter');

            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 3, 'there are 3 suggestions');
                equal(find('.tt-suggestion:eq(0)').text(), 'literal 1', 'first suggestion title');
                equal(find('.tt-suggestion:eq(1)').text(), 'literal 2', 'second suggestion title');
                equal(find('.tt-suggestion:eq(2):contains("create new Literal")').length, 1, 'the third suggestion creates a literal');

                $('.tt-suggestion:eq(0)').click();

                Ember.run.later(function(){
                    andThen(function() {
                        equal(find('.selected-relation').length, 1, '1 item selected');
                        equal(find('.selected-relation.literal:eq(0):contains("literal 1")').length, 1, 'the first selected item has a title');

                        find('.field-input[name=literal]').focus().typeahead('val', 'liter');

                        Ember.run.later(function(){
                            equal(find('.tt-suggestion').length, 3, 'there are 3 suggestions');
                            equal(find('.tt-suggestion:eq(0)').text(), 'literal 1', 'the first item title');
                            equal(find('.tt-suggestion:eq(1)').text(), 'literal 2', 'the second item title');
                            equal(find('.tt-suggestion:eq(2):contains("create new Literal")').length, 1, 'the third item creates a literal');

                            $('.tt-suggestion:eq(1)').click();

                            andThen(function() {
                                equal(find('.selected-relation').length, 2, '2 items are selected');
                                equal(find('.selected-relation.literal:eq(1):contains("literal 2")').length, 1, 'the second selected item has a title');
                            });
                        }, 300);
                    });
                }, 300);

            }, 500);
        });
    });
});

