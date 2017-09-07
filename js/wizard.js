'use strict';

window.wizard = (function () {

  var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
  var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var setupEvents = function (setupWindow) {
    var coatSetup = setupWindow.querySelector('.setup-wizard .wizard-coat');
    var eyesSetup = setupWindow.querySelector('.setup-wizard .wizard-eyes');
    var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');

    window.colorizeElement(coatSetup, COLORS_COAT, function (element, color) {
      element.style.fill = color;
      window.wizard.onCoatChange(color);
    });

    window.colorizeElement(eyesSetup, COLORS_EYES, function (element, color) {
      element.style.fill = color;
      window.wizard.onEyesChange(color);
    });

    window.colorizeElement(fireballSetup, COLORS_FIREBALL, setElementBackground);
  };

  return {
    setupEvents: setupEvents,
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

})();
