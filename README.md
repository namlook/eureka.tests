Eureka integration tests
------------------------

Install all needed libraries:

    $ npm install

Start the server:

    $ npm start

Then, start the tests

    $ npm test

If you want to add/remove browsers, edit the `testem.json` file.

## Note for Eureka developpers

Check that all the tests files are listed in `testem.json`.

To simplify your life link dependancies:

    $ npm link ../eurekapi
    $ (cd ../eurekapp && bower link) && bower link eurekapp

