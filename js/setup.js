
'use strict';

(function () {

  var FRIENDS_NUMBER = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
  var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWindow = document.querySelector('.setup');

  var generatePersonages = function (nPersonages) {
    var result = [];
    var personageName = '';
    var personageSurname = '';
    for (var i = 0; i < nPersonages; i++) {
      personageName = window.util.getRandomArrayItem(NAMES);
      personageSurname = window.util.getRandomArrayItem(SURNAMES);
      result.push({
        name: Math.round(Math.random()) ? (personageName + ' ' + personageSurname) : (personageSurname + ' ' + personageName),
        coatColor: window.util.getRandomArrayItem(COLORS_COAT),
        eyesColor: window.util.getRandomArrayItem(COLORS_EYES)
      });
    }
    return result;
  };

  var generateWizardFriend = function (wizardFriend, wizardTemplate) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardFriend.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardFriend.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardFriend.eyesColor;
    return wizardElement;
  };

  var drawWizardFriends = function (wizardFriends, wizardsList, wizardTemplate) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardFriends.length; i++) {
      fragment.appendChild(generateWizardFriend(wizardFriends[i], wizardTemplate));
    }
    wizardsList.appendChild(fragment);
  };

  // draw wizard's friends============================================

  var friendsElement = setupWindow.querySelector('.setup-similar');
  var wizardFriends = generatePersonages(FRIENDS_NUMBER);
  drawWizardFriends(wizardFriends, friendsElement.querySelector('.setup-similar-list'), document.querySelector('#similar-wizard-template').content);
  friendsElement.classList.remove('hidden');

  // add wizard setup events==========================================

  var coatSetup = setupWindow.querySelector('.setup-wizard .wizard-coat');
  window.colorize(coatSetup, COLORS_COAT, function (color) {
    coatSetup.style.fill = color;
  });

  var eyesSetup = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  window.colorize(eyesSetup, COLORS_EYES, function (color) {
    eyesSetup.style.fill = color;
  });

  var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');
  window.colorize(fireballSetup, COLORS_FIREBALL, function (color) {
    fireballSetup.style.backgroundColor = color;
  });

})();
