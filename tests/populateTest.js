
var equal = chai.assert.equal;
var assert = chai.assert;

describe('Populate', function() {

    beforeEach(function(done) {
        App.reset();
        Ember.$.ajax({
            url: 'http://localhost:7999/api/1/',
            type: 'delete',
            error: function(jqXHR) {
                console.log('XXX error:', jqXHR.responseText);
            }
        }).success(function() {
            done();
        });
    });

    it('should list items', function(done) {
        var model = App.db.Populate.get('model');
        var strings = [1, 2, 3, 4, 5];

        var models = [];
        for (var integer=1; integer<6; integer++) {
            var index = integer-1;
            var _model = model.create({content: {
                integer: integer,
                basic: {
                    _id: 'basic'+index%2,
                    title: 'basic title '+index%2,
                    thumb: 'http://placehold.it/150x150'
                },
                literal: {
                    _id: 'literal'+index%3,
                    string: 'literal '+index%3,
                    integer: index%3,
                    basic: {
                        _id: 'basic'+(index%3),
                        title: 'basic title '+(index%3),
                        thumb: 'http://placehold.it/150x150'
                    }
                }
            }}).save();
            models.push(_model);
        }

        Ember.RSVP.all(models).then(function() {
            visit('/populate');

            andThen(function() {
                equal(find('.eureka-item-title:eq(0)').text().trim(), "Pretty basic title 1 and literal 0");
                equal(find('.eureka-item-title:eq(1)').text().trim(), "Pretty basic title 1 and literal 1");
                equal(find('.eureka-item-title:eq(2)').text().trim(), "Pretty basic title 0 and literal 0");
                equal(find('.eureka-item-title:eq(3)').text().trim(), "Pretty basic title 0 and literal 1");
                equal(find('.eureka-item-title:eq(4)').text().trim(), "Pretty basic title 0 and literal 2");

                equal(find('.eureka-item-description:eq(0)').text().trim(), "4: basic title 0", 'the description matches');
                equal(find('.eureka-item-description:eq(1)').text().trim(), "2: basic title 1");
                equal(find('.eureka-item-description:eq(2)').text().trim(), "1: basic title 0");
                equal(find('.eureka-item-description:eq(3)').text().trim(), "5: basic title 1");
                equal(find('.eureka-item-description:eq(4)').text().trim(), "3: basic title 2");

                click(find('.eureka-item-title a:eq(0)'));
            });
            andThen(function() {
                equal(find('.eureka-document-title').text().trim(), "Pretty basic title 1 and literal 0", 'the title is correct');
                equal(find('.eureka-document-description').text().trim(), "4: basic title 0", 'the description is correct');
                done();
            });
        });
    });

    it('should query items', function(done) {
        var model = App.db.Populate.get('model');
        var strings = [1, 2, 3, 4, 5];

        var models = [];
        for (var integer=1; integer<6; integer++) {
            var index = integer-1;
            var _model = model.create({content: {
                integer: integer,
                basic: {
                    _id: 'basic'+index%2,
                    title: 'basic title '+index%2,
                    thumb: 'http://placehold.it/150x150'
                },
                literal: {
                    _id: 'literal'+index%3,
                    string: 'literal '+index%3,
                    integer: index%3,
                    basic: {
                        _id: 'basic'+index%3,
                        title: 'basic title '+index%3,
                        thumb: 'http://placehold.it/150x150'
                    }
                }
            }}).save();
            models.push(_model);
        }

        Ember.RSVP.all(models).then(function() {
            visit('/populate');

            andThen(function() {
                equal(find('.eureka-result-item').length, 5, "We have 5 results");
                equal(find('.eureka-item-title:eq(0)').text().trim(), "Pretty basic title 1 and literal 0");
                equal(find('.eureka-item-title:eq(1)').text().trim(), "Pretty basic title 1 and literal 1");
                equal(find('.eureka-item-title:eq(2)').text().trim(), "Pretty basic title 0 and literal 0");
                equal(find('.eureka-item-title:eq(3)').text().trim(), "Pretty basic title 0 and literal 1");
                equal(find('.eureka-item-title:eq(4)').text().trim(), "Pretty basic title 0 and literal 2");

                equal(find('.eureka-item-description:eq(0)').text().trim(), "4: basic title 0", 'aie');
                equal(find('.eureka-item-description:eq(1)').text().trim(), "2: basic title 1");
                equal(find('.eureka-item-description:eq(2)').text().trim(), "1: basic title 0");
                equal(find('.eureka-item-description:eq(3)').text().trim(), "5: basic title 1");
                equal(find('.eureka-item-description:eq(4)').text().trim(), "3: basic title 2");

                fillIn('.eureka-search-query-input', 'integer=4');
                $('.eureka-search-query-input').focusout(); // trigger the search
            });
            andThen(function() {
                equal(find('.eureka-result-item').length, 1, "We have 1 results");
                equal(find('.eureka-item-title:eq(0)').text().trim(), "Pretty basic title 1 and literal 0", 'the title is correct');
                equal(find('.eureka-item-description:eq(0)').text().trim(), "4: basic title 0", "the description is correct");
                done();
            });
        });
    });
});