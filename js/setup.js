
'use strict';

(function () {

  var setupWindow = document.querySelector('.setup');

  // draw and setup similar wizards ============================================

  window.backend.load(function (data) {
    window.setupSimilars(setupWindow, data);
  }, window.util.showErrorMessage);

  // add shop and inventory events==========================================

  var setupShop = setupWindow.querySelector('.setup-artifacts-shop');
  var setupArtifacts = setupWindow.querySelector('.setup-artifacts');
  var draggedElement = null;
  var dragCells = null;

  var markDraggableCells = function (mark) {
    if (mark) {
      dragCells = setupWindow.querySelectorAll('.setup-artifacts .setup-artifacts-cell:empty');
    }
    dragCells.forEach(function (cell) {
      cell.style.borderColor = mark ? 'red' : '';
    });
  };

  var isEmptyDragTarget = function (target) {
    return target.tagName.toLowerCase() !== 'img' && target.innerHTML === '';
  };

  setupShop.addEventListener('dragstart', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      draggedElement = target;
      evt.dataTransfer.setData('text/plain', target.alt);
      markDraggableCells(true);
    }
  });

  setupShop.addEventListener('dragend', function () {
    markDraggableCells(false);
  });

  setupArtifacts.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    markDraggableCells(false);
    var newElement = draggedElement.cloneNode(true);
    newElement.setAttribute('draggable', 'false');
    evt.target.appendChild(newElement);
    draggedElement = null;
    evt.preventDefault();
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    if (isEmptyDragTarget(evt.target)) {
      evt.preventDefault();
    }
  });

  setupArtifacts.addEventListener('dragenter', function (evt) {
    if (isEmptyDragTarget(evt.target)) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    }
  });

  setupArtifacts.addEventListener('dragleave', function (evt) {
    if (isEmptyDragTarget(evt.target)) {
      evt.target.style.backgroundColor = '';
      evt.preventDefault();
    }
  });

})();
