
var equal = chai.assert.equal;

describe('homepage', function() {
    it("/", function(done) {
        visit("/");

        andThen(function() {
            equal(find("h2").text(), "Welcome to EurekaTest", "Application header is rendered");
            equal(find(".application-menu .menu-item").length, 5, "There are two model types registered");
            done();
        });
    });
});
