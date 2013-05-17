SimpleTimezone
===============

`getdata.py`
: will scrape the Wikipedia article on time zone abbreviations to retrieve the latest list of time zones and offsets.  It requires the Python [webscraping](https://code.google.com/p/webscraping/) library to run.  The output can be saved as `time-zone-offsets.json`.

`time-zone-offsets.json`
: contains the latest results of running `getdata.py`.

`simpletimezone.js`
: the main SimpleTimezone calculation code.

`index.html`
: is the UI.

`test-qunit.html`, `test-jasmine.html`
: the unit test loaders.

`test-qunit.js`, `spec/simpletimezone.spec.js`
: the test scripts run by the web runners or jasmine-node.

`testdata.js`
: is the data used by the test scripts.
