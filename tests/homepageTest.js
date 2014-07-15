
var equal = chai.assert.equal;

describe('homepage', function() {
    it("/", function(done) {
        visit("/");

        andThen(function() {
            equal(find(".eureka-application-menu .eureka-menu-item").length, 7, "There are seven items in the menu");
            done();
        });
    });
});
