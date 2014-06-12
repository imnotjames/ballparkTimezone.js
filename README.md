ballparkTimezone.js
===================

This is the wrong way to get the right timezone for a user.

It does this by finding offsets between timezones, as well as
between non-daylight savings times and daylight savings times.

## Usage

    var timezone = new Date().getTimezone();

[Check it out here](www.notjam.es/ballparkTimezone.js/)
