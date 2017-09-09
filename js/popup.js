'use strict';

window.popup = (function () {
  var OFFSET = 10; // px

  var popupElement = document.createElement('div');
  popupElement.classList.add('popup');
  popupElement.style.display = 'none';
  document.body.appendChild(popupElement);

  var onMouseMove = function (evt) {
    popupElement.style.top = evt.pageY + OFFSET + 'px';
    popupElement.style.left = evt.pageX + OFFSET + 'px';
  };

  return (function (target, contensCallback) {
    var onMouseOut = function () {
      popupElement.style.display = 'none';
      target.removeEventListener('mousemove', onMouseMove);
      target.removeEventListener('mouseleave', onMouseOut);
    };

    target.addEventListener('mouseenter', function () {
      popupElement.innerHTML = contensCallback();
      popupElement.style.display = 'block';

      target.addEventListener('mousemove', onMouseMove);
      target.addEventListener('mouseleave', onMouseOut);
    });
  });
})();
