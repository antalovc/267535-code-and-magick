
'use strict';

var FRIENDS_NUMBER = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generatePersonages = function (nPersonages) {
  var result = [];
  var personageName = '';
  var personageSurname = '';
  for (var i = 0; i < nPersonages; i++) {
    personageName = getRandomFromArray(NAMES);
    personageSurname = getRandomFromArray(SURNAMES);
    result.push({
      name: Math.round(Math.random()) ? (personageName + ' ' + personageSurname) : (personageSurname + ' ' + personageName),
      coatColor: getRandomFromArray(COLORS_COAT),
      eyesColor: getRandomFromArray(COLORS_EYES)
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

var setupWindow = document.querySelector('.setup');

// draw wizard's friends============================================

var friendsElement = setupWindow.querySelector('.setup-similar');
var wizardFriends = generatePersonages(FRIENDS_NUMBER);
drawWizardFriends(wizardFriends, friendsElement.querySelector('.setup-similar-list'), document.querySelector('#similar-wizard-template').content);
friendsElement.classList.remove('hidden');

// add wizard setup events==========================================
var coatSetup = setupWindow.querySelector('.setup-wizard .wizard-coat');
coatSetup.addEventListener('click', function () {
  coatSetup.style.fill = getRandomFromArray(COLORS_COAT);
});

var eyesSetup = setupWindow.querySelector('.setup-wizard .wizard-eyes');
eyesSetup.addEventListener('click', function () {
  eyesSetup.style.fill = getRandomFromArray(COLORS_EYES);
});

var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');
fireballSetup.addEventListener('click', function () {
  fireballSetup.style.backgroundColor = getRandomFromArray(COLORS_FIREBALL);
});

// add open/close events============================================

var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var setupSubmit = setupWindow.querySelector('.setup-submit');

var onSetupWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupWindow();
  }
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

setupSubmit.addEventListener('click', function () {
  closeSetupWindow();
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});
