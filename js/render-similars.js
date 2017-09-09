'use strict';

window.renderSimilars = (function () {

  var SIMILARS_NUMBER = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var getSimilarWizardArtifacts = function (similarWizard) {
    return similarWizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br');
  };

  var drawSimilarWizard = function (similarWizard) {
    var wizardTemplateElement = similarWizardTemplate.cloneNode(true);
    var wizardElement = wizardTemplateElement.querySelector('.wizard');

    wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.colorEyes;
    wizardTemplateElement.querySelector('.setup-similar-label').textContent = similarWizard.name;

    window.popup(wizardElement, function () {
      return getSimilarWizardArtifacts(similarWizard);
    });

    return wizardTemplateElement;
  };

  return (function (similarWizardsElement, similarWizards) {
    var nSimilarWizardsToDraw = similarWizards.length > SIMILARS_NUMBER ? SIMILARS_NUMBER : similarWizards.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < nSimilarWizardsToDraw; i++) {
      fragment.appendChild(drawSimilarWizard(similarWizards[i]));
    }

    var similarWizardsList = similarWizardsElement.querySelector('.setup-similar-list');
    similarWizardsList.innerHTML = '';
    similarWizardsList.appendChild(fragment);
    similarWizardsElement.classList.remove('hidden');
  });

})();
