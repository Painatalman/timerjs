(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory;
    } else {
        // Browser globals (root is window)
        root.returnExports = factory;
    }
}(this,
/**
 * Timer object based on // http://stackoverflow.com/questions/5226578/check-if-a-timeout-has-been-cleared
 *
 * @param {Object} options
 * @author Carlos Batman
 * @url // http://stackoverflow.com/questions/5226578/check-if-a-timeout-has-been-cleared
 */
function Timer(options) {
  'use strict';

  // OPTIONS
  var
    duration = options.duration || {
      hours: 0,
      minutes: 2,
      seconds: 0,
      milliseconds: 0,
    },
    interval = options.interval || {
      hours: 0,
      minutes: 0,
      seconds: 1,
      milliseconds: 0,
    },
    cleared = true,
    intervalCallback = options.intervalCallback || function tick() {
      if (debug) {
        console.log("tick");
      }
    },
    callback = options.callback || function callbackFunction () {
      if (debug) {
        console.log("timer finished");
      }
    },
    renderSelector = options.renderSelector,
    debug = options.debug;

  // PRIVATES
  var
    currentTimeMilliseconds = 0,
    timeoutReference;


  // PRIVATE HELPERS
  function getMillisecondsFromTimeObject(timeObject) {
    return getSecondsFromTimeObject(timeObject) * 1000 + timeObject.milliseconds;
  }

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
      seconds = timeSeconds % 60,
      milliseconds = 0;
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
    }
  }

  function getSecondsFromMilliseconds(time) {

    return Math.floor(time / 1000);
  }

  function getTimeObjectFromMilliseconds(timeMS) {
    var
      seconds = getSecondsFromMilliseconds(timeMS),
      hours = getHoursFromSeconds(seconds),
      minutes = getMinutesFromSeconds(seconds % (60 * 60)),
      milliseconds = timeMS % 1000;

      // readjust seconds
      seconds = seconds % 60;

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
    }
  }

  function getTextFromTimeObject(timeObject) {
    var
      time = timeObject;

    if (debug) {
      console.log(time);
    }

    return time.hours + ":" + time.minutes + ":" + time.seconds;
  }

  function getTimeLeftInMilliseconds() {
    return currentTimeMilliseconds;
  }

  Timer.prototype.getTimeLeft = function getTimeLeft() {
    return getTimeObjectFromMilliseconds(currentTimeMilliseconds);
  }

  Timer.prototype.getTimeLeftAsText = function getTimeLeftAsText() {
    return getTextFromTimeObject(this.getTimeLeft());
  }

  Timer.prototype.startTimeout = function startTimeout() {
    cleared = false;
    timeoutReference = setTimeout(function timeout(){
      callback();
      clearInterval(timeoutReference);

    }, getMillisecondsFromTimeObject(duration));
  }

  Timer.prototype.start = function start() {
    cleared = false;
    currentTimeMilliseconds = getMillisecondsFromTimeObject(duration);

    var intervalMilliseconds = getMillisecondsFromTimeObject(interval);

    timeoutReference = setInterval(function tick() {
      if (debug) {
        console.log(getTextFromTimeObject(getTimeObjectFromMilliseconds(currentTimeMilliseconds)));
      }
      intervalCallback();

      currentTimeMilliseconds -= intervalMilliseconds;

      if (currentTimeMilliseconds <= 0) {
        if (debug) {
          console.log("timer end");
        }
        cleared = true;
        clearInterval(timeoutReference);
        callback();
      }
    }, intervalMilliseconds)
  };

  Timer.prototype.clear = function clear() {
    cleared = true;
    clearTimeout(timeoutReference);
  };

  Timer.prototype.isCleared = function isCleared() {
    return cleared;
  }
}))
