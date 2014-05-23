
// home page
test("/", function() {
    // async helper telling the application to go to the '/' route
    expect(2);
    visit("/");

    andThen(function() {
        equal(find("h2").text(), "Welcome to EurekaTest", "Application header is rendered");
        equal(find("li").length, 1, "There are three items in the list");

    });
});
