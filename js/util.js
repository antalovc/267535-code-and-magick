'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var callIfEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action(evt);
    }
  };

  var callIfEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action(evt);
    }
  };

  var generateRandomIntegerFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateIndexesPermutation = function (nElements) {
    var res = [];
    for (var i = 1; i <= nElements; i++) {
      res.push(i);
    }

    var tmp = 0;
    var randomId = 0;
    for (var j = 0; j < nElements; j++) {
      randomId = generateRandomIntegerFromRange(0, nElements - 1);
      tmp = res[j];
      res[j] = res[randomId];
      res[randomId] = tmp;
    }

    return res;
  };

  return {
    generateRandomIntegerFromRange: generateRandomIntegerFromRange,
    generateIndexesPermutation: generateIndexesPermutation,

    addEnterEventListener: function (element, action) {
      var listener = function (evt) {
        callIfEnterEvent(evt, action);
      };
      element.addEventListener('keydown', listener);
      return listener;
    },

    addEscEventListener: function (element, action) {
      var listener = function (evt) {
        callIfEscEvent(evt, action);
      };
      element.addEventListener('keydown', listener);
      return listener;
    },

    getRandomArrayItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getNRandomArrayItems: function (array, n) {
      var permutation = generateIndexesPermutation(array.length);
      var res = [];
      while (n > 0) {
        res.push(array[permutation[n - 1] - 1]);
        n--;
      }
      return res;
    },

    showErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
