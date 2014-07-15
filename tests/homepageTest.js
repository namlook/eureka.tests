
var equal = chai.assert.equal;

describe('homepage', function() {
    it("/", function(done) {
        visit("/");

        andThen(function() {
            equal(find(".eureka-application-menu .eureka-menu-item").length, 6, "There are five item in the menu");
            done();
        });
    });
});
