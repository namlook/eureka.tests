
var equal = chai.assert.equal;

describe('DatePicker', function() {

    it('Test date picker', function(done) {
        visit('/literal/new');

        andThen(function() {
            // date field
            equal(find('.eureka-field-input[name=date].picker__input--active').length, 0, "The date picker is hidden");

            click('.eureka-field-input[name=date]');

            andThen(function() {
                equal(find('.eureka-field-input[name=date].picker__input--active').length, 1, "The date picker is visible");

                click('.picker .picker__button--today');

                andThen(function() {
                    var todayEpoc = find('.eureka-field-input[name=date]').attr('data-value');
                    var today = new Date(todayEpoc);

                    click('.eureka-field-input[name=date]');
                    click('.picker .picker__nav--prev');
                    click('.picker .picker__day--highlighted');

                    andThen(function() {
                        var choosenDateEpoc = find('.eureka-field-input[name=date]').attr('data-value');
                        var choosenDate = new Date(choosenDateEpoc);
                        if (today.getMonth() > 0) {
                            equal(choosenDate.getMonth(), today.getMonth() -1, 'The choosen date is from the previous month (1)');
                        } else {
                            equal(choosenDate.getMonth(), 12, 'The choosen date is from the previous month (2)');
                        }
                        done();
                    });
                });
            });
        });
    });
});
