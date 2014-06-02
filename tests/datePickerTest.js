
var equal = chai.assert.equal;

describe('DatePicker', function() {

    it('Test date picker', function(done) {
        visit('/literal/new');

        andThen(function() {
            // date field
            equal(find('.picker').attr('aria-hidden'), "true", "The date picker is hidden");

            click('.field-input[name=date]');

            andThen(function() {
                equal(find('.picker').attr('aria-hidden'), "false", "The date picker is visible");

                click('.picker .picker__button--today');

                andThen(function() {
                    var todayEpoc = find('.field-input[name=date]').attr('data-value');
                    var today = new Date(parseInt(todayEpoc, 10));

                    click('.field-input[name=date]');
                    click('.picker .picker__nav--prev');
                    click('.picker .picker__day--highlighted');

                    andThen(function() {
                        var choosenDateEpoc = find('.field-input[name=date]').attr('data-value');
                        var choosenDate = new Date(parseInt(choosenDateEpoc, 10));
                        if (today.getMonth() > 0) {
                            equal(choosenDate.getMonth(), today.getMonth() -1, 'The choosen date is from the previous month');
                        } else {
                            equal(choosenDate.getMonth(), 12, 'The choosen date is from the previous month');
                        }
                        done();
                    });
                });
            });
        });
    });
});
