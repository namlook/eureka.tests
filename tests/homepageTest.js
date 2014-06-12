
var equal = chai.assert.equal;

describe('homepage', function() {
    it("/", function(done) {
        visit("/");

        andThen(function() {
            equal(find(".eureka-application-menu .eureka-menu-item").length, 5, "There are five model registered");
            done();
        });
    });
});
