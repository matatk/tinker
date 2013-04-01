SimpleTimeZone
===============

`getdata.py`
: will scrape the Wikipedia article on time zone abbreviations to retrieve the latest list of time zones and offsets.  It requires the Python [webscraping](https://code.google.com/p/webscraping/) library to run.  The output can be saved as `time-zone-offsets.json`.

`time-zone-offsets.json`
: contains the latest results of running `getdata.py`.

`simpletimezone.js`
: the main SimpleTimeZone calculation code.

`index.html`
: is the UI.

`test.html`
: the unit test loader.

`test.js`
: is the test script that is run by the test loader.

`testdata.js`
: is the data used by the test script.
