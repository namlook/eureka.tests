
var expect = chai.expect;
var equal = chai.assert.equal;

describe("Test relation auto-suggest", function() {

    it('Test single relations auto-suggest', function(done) {
        App.db.BasicObject.get('model').create({content: {
            title: 'basic title',
            description: 'basic description',
            thumbUrl: 'http://placekitten.com/167/167'
        }}).save().then(function() {

            visit('/literal/new');

            fillIn('.eureka-field-input[name=basic]', 'basic');

            triggerEvent('.eureka-field-input[name=basic]', 'blur');

            andThen(function() {
                expect(find('.eureka-field-input[name=basic]').val()).to.be.equal('');

                find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic');

                Ember.run.later(function(){
                    equal(find('.tt-suggestion').length, 2, 'there are two suggestions');
                    expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('basic title');
                    equal(find('.tt-suggestion:eq(1):contains("create new basic")').length, 1, '--create new basic-- is present');

                    $('.tt-suggestion:eq(0)').click();

                    andThen(function() {
                        equal(find('.eureka-selected-relation.basic:contains("basic title")').length, 1, 'the model is selected');
                        done();
                    });
                }, 500);
            });
        });
    });


    it('Test multi relations auto-suggest', function(done) {
        App.db.BasicObject.get('model').create({content: {
            title: 'basic title 1',
            description: 'basic description 1',
            thumbUrl: 'http://placekitten.com/167/167'
        }}).save();


        App.db.BasicObject.get('model').create({content: {
            title: 'basic title 2',
            description: 'basic description 2',
            thumbUrl: 'http://placekitten.com/170/170'
        }}).save();

        andThen(function() {
            expect(13);
            visit('/basic_object');
            visit('/multi/new');

            fillIn('.eureka-field-input[name=basic]', 'basic ti');

            triggerEvent('.eureka-field-input[name=basic]', 'blur');

            andThen(function() {
                expect(find('.eureka-field-input[name=basic]').val()).to.be.equal('');

                find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic ti');  // be carreful with typeahead cache !!

                Ember.run.later(function(){
                    expect(find('.tt-suggestion').length).to.be.equal(3);
                    expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('basic title 1');
                    expect(find('.tt-suggestion:eq(1)').text()).to.be.equal('basic title 2');
                    expect(find('.tt-suggestion:eq(2):contains("create new basic")').length).to.be.equal(1);

                    $('.tt-suggestion:eq(0)').click();

                    Ember.run.later(function(){
                        andThen(function() {
                            equal(find('.eureka-selected-relation').length, 1, 'there is one selected relation');
                            expect(find('.eureka-selected-relation.basic:eq(0):contains("basic title 1")').length).to.be.equal(1);

                            find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic ti');

                            Ember.run.later(function(){
                                equal(find('.tt-suggestion').length, 3, 'there are three suggestions');
                                expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('basic title 1');
                                expect(find('.tt-suggestion:eq(1)').text()).to.be.equal('basic title 2');
                                expect(find('.tt-suggestion:eq(2):contains("create new basic")').length).to.be.equal(1);

                                $('.tt-suggestion:eq(1)').click();

                                andThen(function() {
                                    equal(find('.eureka-selected-relation').length, 2, 'there are two selected relations');
                                    expect(find('.eureka-selected-relation.basic:eq(1):contains("basic title 2")').length).to.be.equal(1);
                                    done();
                                });
                            }, 300);
                        });
                    }, 300);

                }, 500);
            });
        });
    });


    it('Test multi relations auto-suggest with __title__', function(done) {
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

            fillIn('.eureka-field-input[name=literal]', 'liter');

            triggerEvent('.eureka-field-input[name=literal]', 'blur');

            andThen(function() {
                expect(find('.eureka-field-input[name=literal]').val()).to.be.equal('');

                find('.eureka-field-input[name=literal]').focus().typeahead('val', 'liter');

                Ember.run.later(function(){
                    expect(find('.tt-suggestion').length).to.be.equal(3);
                    expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('literal 1');
                    expect(find('.tt-suggestion:eq(1)').text()).to.be.equal('literal 2');
                    expect(find('.tt-suggestion:eq(2):contains("create new literal")').length).to.be.equal(1);

                    $('.tt-suggestion:eq(0)').click();

                    Ember.run.later(function(){
                        andThen(function() {
                            expect(find('.eureka-selected-relation').length).to.be.equal(1);
                            expect(find('.eureka-selected-relation.literal:eq(0):contains("literal 1")').length).to.be.equal(1);

                            find('.eureka-field-input[name=literal]').focus().typeahead('val', 'liter');

                            Ember.run.later(function(){
                                expect(find('.tt-suggestion').length).to.be.equal(3);
                                expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('literal 1');
                                expect(find('.tt-suggestion:eq(1)').text()).to.be.equal('literal 2');
                                expect(find('.tt-suggestion:eq(2):contains("create new literal")').length).to.be.equal(1);

                                $('.tt-suggestion:eq(1)').click();

                                andThen(function() {
                                    expect(find('.eureka-selected-relation').length).to.be.equal(2);
                                    expect(find('.eureka-selected-relation.literal:eq(1):contains("literal 2")').length).to.be.equal(1);
                                    done();
                                });
                            }, 300);
                        });
                    }, 300);

                }, 500);
            });
        });
    });

});
