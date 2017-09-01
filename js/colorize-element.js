'use strict';

window.colorizeElement = (function () {

  return function (element, colorsArray, onColorChange) {

    element.addEventListener('click', function () {
      onColorChange(element, window.util.getRandomArrayItem(colorsArray));
    });

  };
})();
