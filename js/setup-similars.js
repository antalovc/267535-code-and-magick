'use strict';

window.setupSimilars = (function () {

  var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
  var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWindow = null;
  var similarsElement = null;
  var similarsData = [];
  var colorEyes;
  var colorCoat;

  var fillCoatElement = function (element, color) {
    element.style.fill = color;
    colorCoat = color;
  };

  var fillEyesElement = function (element, color) {
    element.style.fill = color;
    colorEyes = color;
  };

  var setElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var getRank = function (similarWizard) {
    var rank = 0;
    if (similarWizard.colorCoat === colorCoat) {
      rank += 2;
    }
    if (similarWizard.colorEyes === colorEyes) {
      rank += 2;
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
        rankDiff = namesComparator(left.name - right.name);
      }
      return rankDiff;
    }));
  };

  var setupEvents = function () {
    var coatSetup = setupWindow.querySelector('.setup-wizard .wizard-coat');
    var eyesSetup = setupWindow.querySelector('.setup-wizard .wizard-eyes');
    var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');
    window.colorizeElement(coatSetup, COLORS_COAT, fillCoatElement);
    window.colorizeElement(eyesSetup, COLORS_EYES, fillEyesElement);
    window.colorizeElement(fireballSetup, COLORS_FIREBALL, setElementBackground);
  };

  return (function (parentWindow, data) {
    setupWindow = parentWindow;
    similarsData = data;
    similarsElement = parentWindow.querySelector('.setup-similar');

    updateWizards();
    setupEvents();
  });

})();
