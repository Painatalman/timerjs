/**
 * Timer object based on // http://stackoverflow.com/questions/5226578/check-if-a-timeout-has-been-cleared
 *
 * @param {Object} options
 * @author Carlos Batman
 * @url // http://stackoverflow.com/questions/5226578/check-if-a-timeout-has-been-cleared
 */
function Timer(options) {
  // OPTIONS
  var
    startTime = options.startTime || {
      hours: 0,
      minutes: 2,
      seconds: 0
    },
    intervalInSeconds = options.intervalInSeconds || 1,
    cleared = true,
    callback = options.callback || function() {
      console.log("timer finished");
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

  Timer.prototype.startTimeout = function startTimeout() {
    cleared = false;
    setTimeout(callback, interval);
  }

  Timer.prototype.start = function start() {
    cleared = false;
    currentTimeSeconds = getSecondsFromTimeObject(startTime);

    timeoutReference = setInterval(function tick() {
      if (debug) {
        console.log(getTextFromTimeObject(getTimeObjectFromSeconds(currentTimeSeconds)));
      }
      currentTimeSeconds -= intervalInSeconds;

      if (currentTimeSeconds <= 0) {
        cleared = true;
        clearInterval(timeoutReference);
        callback();
      }
    }, intervalInSeconds * 1000)
  };

  Timer.prototype.clear = function clear() {
    cleared = true;
    clearTimeout(timeoutReference);
  };

  Timer.prototype.isCleared = function isCleared() {
    return cleared;
  }

}

module.exports = Timer;
