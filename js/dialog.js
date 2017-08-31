'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupSubmit = setupWindow.querySelector('.setup-submit');
  var setupUserPic = setupWindow.querySelector('.upload');

  setupUserPic.querySelector('input[type=file]').addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoordinates.x,
        y: moveEvt.clientY - startCoordinates.y
      };
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindow.style.left = (setupWindow.offsetLeft + shift.x) + 'px';
      setupWindow.style.top = (setupWindow.offsetTop + shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onSetupWindowEscPress = function (evt) {
    window.util.callIfEscEvent(evt, closeSetupWindow);
  };

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onSetupWindowEscPress);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');

    setupWindow.style.removeProperty('top');
    setupWindow.style.removeProperty('left');

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
