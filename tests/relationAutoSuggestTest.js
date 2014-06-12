
var expect = chai.expect;

describe("Test relation auto-suggest", function() {

    beforeEach(function(done) {
        Ember.$.ajax({
            url: 'http://localhost:7999/api/1/',
            type: 'delete',
            error: function(jqXHR) {
                console.log('XXX error:', jqXHR.responseText);
            }
        }).success(function() {
            done();
        });
        App.reset();
    });


    it('Test single relations auto-suggest', function(done) {
        App.db.Basic.get('model').create({content: {
            title: 'basic title',
            description: 'basic description',
            thumb: 'http://placekitten.com/167/167'
        }}).save().then(function() {

            visit('/literal/new');

            fillIn('.eureka-field-input[name=basic]', 'basic');

            triggerEvent('.eureka-field-input[name=basic]', 'blur');

            andThen(function() {
                expect(find('.eureka-field-input[name=basic]').val()).to.be.equal('');

                find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic');

                Ember.run.later(function(){
                    expect(find('.tt-suggestion').length).to.be.equal(2);
                    expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('basic title');
                    expect(find('.tt-suggestion:eq(1):contains("create new Basic")').length).to.be.equal(1);

                    $('.tt-suggestion:eq(0)').click();

                    andThen(function() {
                        expect(find('.eureka-selected-relation.basic:contains("basic title")').length).to.be.equal(1);
                        done();
                    });
                }, 500);
            });
        });
    });


    it('Test multi relations auto-suggest', function(done) {
        App.db.Basic.get('model').create({content: {
            title: 'basic title 1',
            description: 'basic description 1',
            thumb: 'http://placekitten.com/167/167'
        }}).save();


        App.db.Basic.get('model').create({content: {
            title: 'basic title 2',
            description: 'basic description 2',
            thumb: 'http://placekitten.com/170/170'
        }}).save();

        andThen(function() {
            expect(13);
            visit('/basic');
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
                    expect(find('.tt-suggestion:eq(2):contains("create new Basic")').length).to.be.equal(1);

                    $('.tt-suggestion:eq(0)').click();

                    Ember.run.later(function(){
                        andThen(function() {
                            expect(find('.eureka-selected-relation').length).to.be.equal(1);
                            expect(find('.eureka-selected-relation.basic:eq(0):contains("basic title 1")').length).to.be.equal(1);

                            find('.eureka-field-input[name=basic]').focus().typeahead('val', 'basic ti');

                            Ember.run.later(function(){
                                expect(find('.tt-suggestion').length).to.be.equal(3);
                                expect(find('.tt-suggestion:eq(0)').text()).to.be.equal('basic title 1');
                                expect(find('.tt-suggestion:eq(1)').text()).to.be.equal('basic title 2');
                                expect(find('.tt-suggestion:eq(2):contains("create new Basic")').length).to.be.equal(1);

                                $('.tt-suggestion:eq(1)').click();

                                andThen(function() {
                                    expect(find('.eureka-selected-relation').length).to.be.equal(2);
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
                    expect(find('.tt-suggestion:eq(2):contains("create new Literal")').length).to.be.equal(1);

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
                                expect(find('.tt-suggestion:eq(2):contains("create new Literal")').length).to.be.equal(1);

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
