'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupSubmit = setupWindow.querySelector('.setup-submit');
  var setupUserPic = setupWindow.querySelector('.upload');

  var preventSetupUserFileClick = false;

  setupUserPic.querySelector('input[type=file]').addEventListener('click', function (evt) {
    if (preventSetupUserFileClick) {
      evt.preventDefault();
      preventSetupUserFileClick = false;
    }
  });

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      preventSetupUserFileClick = true;
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

  var documentEscListener = null;

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    documentEscListener = window.util.addEscEventListener(document, closeSetupWindow);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');

    setupWindow.style.removeProperty('top');
    setupWindow.style.removeProperty('left');

    document.removeEventListener('keydown', documentEscListener);
  };

  var submitSetupWindow = function (evt) {
    var form = setupWindow.querySelector('form');
    if (form.checkValidity()) {
      window.backend.save(new FormData(form), function () {
        closeSetupWindow();
      }, window.util.showErrorMessage);
      evt.preventDefault();
    }
  };

  setupOpen.addEventListener('click', openSetupWindow);
  window.util.addEnterEventListener(setupOpen, openSetupWindow);

  setupClose.addEventListener('click', closeSetupWindow);
  window.util.addEnterEventListener(setupClose, closeSetupWindow);

  setupSubmit.addEventListener('click', submitSetupWindow);
  window.util.addEnterEventListener(setupSubmit, submitSetupWindow);

})();
