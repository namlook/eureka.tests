
module("Homepage", {
    setup: function() {
        Ember.run(function() {
            App.reset();
        });
    }
});

test("/", function() {
    visit("/");

    andThen(function() {
        equal(find("h2").text(), "Welcome to EurekaTest", "Application header is rendered");
        equal(find(".application-menu .menu-item").length, 5, "There are two model types registered");
    });
});
