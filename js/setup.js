
'use strict';

var HERO_SETUP_ELEMENT_SELECTOR = '.setup';
var FRIENDS_ELEMENT_SELECTOR = '.setup-similar';
var FRIENDS_LIST_SELECTOR = '.setup-similar-list';
var FRIENDS_TEMPLATE_SELECTOR = '#similar-wizard-template';
var FRIENDS_LABEL_SELECTOR = '.setup-similar-label';
var FRIENDS_COAT_SELECTOR = '.wizard-coat';
var FRIENDS_EYES_SELECTOR = '.wizard-eyes';

var FRIENDS_NUMBER = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)];'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

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
  wizardElement.querySelector(FRIENDS_LABEL_SELECTOR).textContent = wizardFriend.name;
  wizardElement.querySelector(FRIENDS_COAT_SELECTOR).style.fill = wizardFriend.coatColor;
  wizardElement.querySelector(FRIENDS_EYES_SELECTOR).style.fill = wizardFriend.eyesColor;
  return wizardElement;
};

var drawWizardFriends = function (wizardFriends, wizardsList, wizardTemplate) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardFriends.length; i++) {
    fragment.appendChild(generateWizardFriend(wizardFriends[i], wizardTemplate));
  }
  wizardsList.appendChild(fragment);
};

var heroWizardWindow = document.querySelector(HERO_SETUP_ELEMENT_SELECTOR);
var friendsElement = heroWizardWindow.querySelector(FRIENDS_ELEMENT_SELECTOR);

heroWizardWindow.classList.remove('hidden');

var wizardFriends = generatePersonages(FRIENDS_NUMBER);
drawWizardFriends(wizardFriends, friendsElement.querySelector(FRIENDS_LIST_SELECTOR), document.querySelector(FRIENDS_TEMPLATE_SELECTOR).content);

friendsElement.classList.remove('hidden');
