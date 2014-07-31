
var equal = chai.assert.equal;

describe('homepage', function() {
    it("should display a menu", function(done) {
        visit("/");

        andThen(function() {
            equal(find(".eureka-application-menu .eureka-menu-item.eureka-hidden-object-model").length, 0, "the hidden object is hidden");
            equal(find(".eureka-application-menu .eureka-menu-item").length, 8, "There are eight items in the menu");
            done();
        });
    });

    it("should handle plural forms", function(done) {
        visit("/");

        andThen(function() {
            equal(find(".eureka-application-menu .eureka-menu-item.eureka-about-model").text().trim(), 'About', "The about page has not plural form");
            done();
        });
    });
});
