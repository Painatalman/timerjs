(function() {
  this.Timer = function Timer(options) {
    // OPTIONS
    var
      startTime = options.startTime || {
        hours: 0,
        minutes: 2,
        seconds: 0
      },
      callback = options.callback || function() {
        console.log("timer finished")
      },
      renderSelector = options.renderSelector,
      debug = options.debug;

    // PRIVATES
    var
      currentTimeSeconds = 0,
      timeoutReference;


    // PRIVATE HELPERS
    function getSecondsFromTimeObject(timeObject) {
      return timeObject.hours * 60 * 60 + timeObject.minutes * 60 + timeObject.seconds;
    }

    function getMinutesFromSeconds(timeSeconds) {
      return Math.floor(timeSeconds / (60));
    }

    function getHoursFromSeconds(timeSeconds) {
      return Math.floor(timeSeconds / (60 * 60));
    }

    function getTimeObjectFromSeconds(timeSeconds) {
      var
        hours = getHoursFromSeconds(timeSeconds),
        minutes = getMinutesFromSeconds(timeSeconds % (60 * 60)),
        seconds = timeSeconds % 60;
      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    }

    function getTextFromTimeObject(timeObject) {
      var
        time = timeObject;

      return time.hours + ":" + time.minutes + ":" + time.seconds;
    }

    Timer.prototype.start = function() {
      currentTimeSeconds = getSecondsFromTimeObject(startTime);

      timeoutReference = setInterval(function tick() {
        if (debug) {
          console.log(getTextFromTimeObject(getTimeObjectFromSeconds(currentTimeSeconds)));
        }
        currentTimeSeconds -= 1;

        if (currentTimeSeconds <= 0) {
          clearInterval(timeoutReference);
          callback();
        }
      }, 1000)
    };

  }
}())
