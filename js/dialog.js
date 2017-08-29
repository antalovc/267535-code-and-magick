'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupSubmit = setupWindow.querySelector('.setup-submit');

  var onSetupWindowEscPress = function (evt) {
    window.util.callIfEscEvent(evt, closeSetupWindow);
  };

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onSetupWindowEscPress);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupWindowEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openSetupWindow();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.callIfEnterEvent(evt, openSetupWindow);
  });

  setupClose.addEventListener('click', function () {
    closeSetupWindow();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.callIfEnterEvent(evt, closeSetupWindow);
  });

  setupSubmit.addEventListener('click', function () {
    if (setupWindow.querySelector('form').checkValidity()) {
      closeSetupWindow();
    }
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.callIfEnterEvent(evt, function () {
      if (setupWindow.querySelector('form').checkValidity()) {
        closeSetupWindow();
      }
    });
  });

})();
