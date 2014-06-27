

test('Test single relations auto-suggest', function() {
    console.log('Test single relations auto-suggest');
    App.db.Basic.get('model').create({content: {
        title: 'a basic title',
        description: 'basic description',
        thumb: 'http://placehold.it/65x65'
    }}).save();

    andThen(function() {

        expect(5);
        visit('/literal/new');

        fillIn('.field-input[name=basic]', 'basi');

        triggerEvent('.field-input[name=basic]', 'blur');

        andThen(function() {
            equal(find('.field-input[name=basic]').val(), '', 'Relation input should be empty');

            find('.field-input[name=basic]').focus().typeahead('val', 'a basic ti');

            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 2, "2 items in relations (including item creation)");
                equal(find('.tt-suggestion:eq(0)').text(), 'a basic title', "the relation is suggested");
                equal(find('.tt-suggestion:eq(1):contains("create new Basic")').length, 1, "there is an option to create a new Basic");

                $('.tt-suggestion:eq(0)').click();

                andThen(function() {
                    equal(find('.selected-relation.basic:contains("a basic title")').length, 1, 'The relation is selected');
                });
            }, 500);
        });
    });
});


test('Test multi relations auto-suggest', function() {
    console.log('Test multi relations auto-suggest');
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

    andThen(function() {
        expect(13);
        visit('/multi/new');

        fillIn('.field-input[name=basic]', 'basi');

        triggerEvent('.field-input[name=basic]', 'blur');

        andThen(function() {
            equal(find('.field-input[name=basic]').val(), '', 'Relation input should be empty');

            find('.field-input[name=basic]').focus().typeahead('val', 'basic');

            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 3, "3 items in relations (including item creation) (1)");
                equal(find('.tt-suggestion:eq(0)').text(), 'basic title 1', "the first relation is suggested (1)");
                equal(find('.tt-suggestion:eq(1)').text(), 'basic title 2', "the second relation is suggested (1)");
                equal(find('.tt-suggestion:eq(2):contains("create new Basic")').length, 1, "there is an option to create a new Basic (1)");

                $('.tt-suggestion:eq(0)').click();

                Ember.run.later(function(){
                    andThen(function() {
                        equal(find('.selected-relation').length, 1, "1 relation is selected");
                        equal(find('.selected-relation.basic:eq(0):contains("basic title 1")').length, 1, 'The first relation is selected');

                        find('.field-input[name=basic]').focus().typeahead('val', 'basic');

                        Ember.run.later(function(){
                            equal(find('.tt-suggestion').length, 3, "3 items in relations (including item creation) (2)");
                            equal(find('.tt-suggestion:eq(0)').text(), 'basic title 1', "the first relation is suggested (2)");
                            equal(find('.tt-suggestion:eq(1)').text(), 'basic title 2', "the second relation is suggested (2)");
                            equal(find('.tt-suggestion:eq(2):contains("create new Basic")').length, 1, "there is an option to create a new Basic (2)");

                            $('.tt-suggestion:eq(1)').click();

                            andThen(function() {
                                equal(find('.selected-relation').length, 2, "2 relations are selected");
                                equal(find('.selected-relation.basic:eq(1):contains("basic title 2")').length, 1, 'The second relation is selected');
                            });
                        }, 500);
                    });
                }, 500);

            }, 500);
        });
    });
});


test('Test multi relations auto-suggest with __title__', function() {
    console.log('Test multi relations auto-suggest with __title__');
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
            equal(find('.field-input[name=literal]').val(), '', 'Relation input should be empty');

            find('.field-input[name=literal]').focus().typeahead('val', 'liter');

            Ember.run.later(function(){
                equal(find('.tt-suggestion').length, 3, "3 items in relations (including item creation) (1)");
                equal(find('.tt-suggestion:eq(0)').text(), 'literal 1', "the first relation is suggested (1)");
                equal(find('.tt-suggestion:eq(1)').text(), 'literal 2', "the second relation is suggested (1)");
                equal(find('.tt-suggestion:eq(2):contains("create new Literal")').length, 1, "there is an option to create a new Literal (1)");

                $('.tt-suggestion:eq(0)').click();

                Ember.run.later(function(){
                    andThen(function() {
                        equal(find('.selected-relation').length, 1, "1 relation is selected");
                        equal(find('.selected-relation.literal:eq(0):contains("literal 1")').length, 1, 'The first relation is selected');

                        find('.field-input[name=literal]').focus().typeahead('val', 'liter');

                        Ember.run.later(function(){
                            equal(find('.tt-suggestion').length, 3, "3 items in relations (including item creation) (2)");
                            equal(find('.tt-suggestion:eq(0)').text(), 'literal 1', "the first relation is suggested (2)");
                            equal(find('.tt-suggestion:eq(1)').text(), 'literal 2', "the second relation is suggested (2)");
                            equal(find('.tt-suggestion:eq(2):contains("create new Literal")').length, 1, "there is an option to create a new Literal (2)");

                            $('.tt-suggestion:eq(1)').click();

                            andThen(function() {
                                equal(find('.selected-relation').length, 2, "2 relations are selected");
                                equal(find('.selected-relation.literal:eq(1):contains("literal 2")').length, 1, 'The second relation is selected');
                            });
                        }, 500);
                    });
                }, 500);

            }, 500);
        });
    });
});


