'use strict';

window.backend = (function () {

  var useXhrLoad = true;

  var XHR_TIMEOUT = 5000;
  var JSONP_CALLBACK_NAME = '__jsonpCallback';

  var URL_LOAD = 'https://1510.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://1510.dump.academy/code-and-magick';

  var sendXhrRequest = function (type, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR_TIMEOUT + 'мс');
    });

    var isPost = type === 'POST';
    xhr.open(type, isPost ? URL_SAVE : URL_LOAD);
    xhr.send(isPost ? data : null);
  };

  var loadXhr = function (onLoad, onError) {
    sendXhrRequest('GET', onLoad, onError);
  };

  var saveXhr = function (data, onSuccess, onError) {
    sendXhrRequest('POST', onSuccess, onError, data);
  };

  var loadJsonP = function (onLoad, onError) {
    window[JSONP_CALLBACK_NAME] = onLoad;

    var loader = document.createElement('script');
    loader.src = URL_LOAD + '?callback=' + JSONP_CALLBACK_NAME;

    loader.addEventListener('error', function () {
      onError('Произошла ошибка при загрузке данных через JSONP');
    });

    document.body.append(loader);
  };

  return {

    load: function (onLoad, onError) {
      if (useXhrLoad) {
        loadXhr(onLoad, onError);
      } else {
        loadJsonP(onLoad, onError);
      }
    },

    save: function (data, onLoad, onError) {
      saveXhr(data, onLoad, onError);
    }

  };
})();
