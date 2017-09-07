'use strict';

window.setupSimilars = (function () {

  var similarsElement = null;
  var similarsData = [];
  var colorCoat = null;
  var colorEyes = null;

  var getRank = function (similarWizard) {
    var rank = 0;
    if (similarWizard.colorCoat === colorCoat) {
      rank += 2;
    }
    if (similarWizard.colorEyes === colorEyes) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    var res = 0;
    if (left > right) {
      res = 1;
    } else if (right > left) {
      res = -1;
    }
    return res;
  };

  var updateWizards = function () {
    window.renderSimilars(similarsElement, similarsData.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var setupEvents = function () {
    window.wizard.onCoatChange = function (color) {
      colorCoat = color;
      window.debounce(updateWizards);
    };

    window.wizard.onEyesChange = function (color) {
      colorEyes = color;
      window.debounce(updateWizards);
    };
  };


  return (function (parentWindow, data) {
    colorCoat = parentWindow.querySelector('input[name=coat-color]').value;
    colorEyes = parentWindow.querySelector('input[name=eyes-color]').value;
    similarsData = data;
    similarsElement = parentWindow.querySelector('.setup-similar');

    setupEvents();
    updateWizards();
  });

})();
