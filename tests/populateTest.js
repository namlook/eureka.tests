
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

    it('list Populate items', function(done) {
        var model = App.db.Populate.get('model');
        var strings = [23, 14, 38, 42, 53];

        Ember.RSVP.all(strings.map(function(integer, index) {
            return model.create({content: {
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
                        _id: 'basic'+(parseInt(index%2, 10)+1),
                        title: 'basic title '+(parseInt(index%2, 10)+1),
                        thumb: 'http://placehold.it/150x150'
                    }
                }
            }}).save();
        })).then(function() {
            visit('/populate');

            andThen(function() {
                equal(find('.eureka-item-title:eq(0)').text().trim(), "basic title 1 and literal 0");
                equal(find('.eureka-item-title:eq(1)').text().trim(), "basic title 1 and literal 1");
                equal(find('.eureka-item-title:eq(2)').text().trim(), "basic title 0 and literal 0");
                equal(find('.eureka-item-title:eq(3)').text().trim(), "basic title 0 and literal 1");
                equal(find('.eureka-item-title:eq(4)').text().trim(), "basic title 0 and literal 2");
            });
            andThen(function() {
                done();
            });
        });
    });
});