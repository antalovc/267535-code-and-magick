'use strict';

window.colorize = (function () {

  return function (element, colorsArray, onColorChange) {

    element.addEventListener('click', function () {
      onColorChange(window.util.getRandomArrayItem(colorsArray));
    });

  };
})();
