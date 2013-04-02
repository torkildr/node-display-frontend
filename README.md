Web front end / controller for [RaspberryPi matrix display][1]
===============================================================

The goal of this project is to provide:

1. A continously running server, sending preconfigured text, either static or
   from misc data sources, using appropriate commands, to the [display][1]. The
   idea is to be able to configure different behavior for different times of
   the day.
2. A convenient web frontent of said server.

TODO
----

* ~~Update data from url on given interval~~
  * ~~Should maybe only be done when it is 'active'?~~
* 'Active' text should also check on weekday
* Fix bug in display.js

Based on [express/bootstrap template][2]

[1]: https://github.com/torkildr/raspberry-display
[2]: https://github.com/Srirangan/express-bootstrap
