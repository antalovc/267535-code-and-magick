
'use strict';

(function () {

  var FRIENDS_NUMBER = 4;
  var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
  var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWindow = document.querySelector('.setup');

  var drawFriendlyWizard = function (wizardFriend, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardFriend.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardFriend.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardFriend.colorEyes;
    return wizardElement;
  };

  var drawFriendlyWizards = function (friendlyWizards, wizardsList, wizardTemplate) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < friendlyWizards.length; i++) {
      fragment.appendChild(drawFriendlyWizard(friendlyWizards[i], wizardTemplate));
    }
    wizardsList.appendChild(fragment);
  };

  // draw wizard's friends============================================

  var friendsElement = setupWindow.querySelector('.setup-similar');
  window.backend.load(function (data) {
    drawFriendlyWizards(window.util.getNRandomArrayItems(data, FRIENDS_NUMBER), friendsElement.querySelector('.setup-similar-list'), document.querySelector('#similar-wizard-template').content);
    friendsElement.classList.remove('hidden');
  }, window.util.showErrorMessage);


  // add wizard setup events==========================================

  var coatSetup = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var eyesSetup = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var setElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(coatSetup, COLORS_COAT, fillElement);
  window.colorizeElement(eyesSetup, COLORS_EYES, fillElement);
  window.colorizeElement(fireballSetup, COLORS_FIREBALL, setElementBackground);

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
