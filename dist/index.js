require('./sourcemap-register.js');module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(198);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module) {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 138:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropboxTeam = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dropbox = __webpack_require__(279);

var _dropboxBase = __webpack_require__(178);

var _routesTeam = __webpack_require__(457);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class DropboxTeam
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides access to team endpoints.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 */
var DropboxTeam = exports.DropboxTeam = function (_DropboxBase) {
  _inherits(DropboxTeam, _DropboxBase);

  function DropboxTeam(options) {
    _classCallCheck(this, DropboxTeam);

    var _this = _possibleConstructorReturn(this, (DropboxTeam.__proto__ || Object.getPrototypeOf(DropboxTeam)).call(this, options));

    Object.assign(_this, _routesTeam.routes);
    return _this;
  }

  /**
   * Returns an instance of Dropbox that can make calls to user api endpoints on
   * behalf of the passed user id, using the team access token.
   * @arg {String} userId - The user id to use the Dropbox class as
   * @returns {Dropbox} An instance of Dropbox used to make calls to user api
   * endpoints
   */


  _createClass(DropboxTeam, [{
    key: 'actAsUser',
    value: function actAsUser(userId) {
      return new _dropbox.Dropbox({
        accessToken: this.accessToken,
        clientId: this.clientId,
        selectUser: userId
      });
    }
  }]);

  return DropboxTeam;
}(_dropboxBase.DropboxBase);

/***/ }),

/***/ 178:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropboxBase = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(707);

var _downloadRequest = __webpack_require__(218);

var _uploadRequest = __webpack_require__(604);

var _rpcRequest = __webpack_require__(833);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = void 0;
try {
  crypto = __webpack_require__(417); // eslint-disable-line global-require
} catch (Exception) {
  crypto = window.crypto;
}

var Encoder = void 0;
try {
  var util = __webpack_require__(669); // eslint-disable-line global-require
  Encoder = util.TextEncoder;
} catch (Exception) {
  Encoder = TextEncoder;
}

// Expiration is 300 seconds but needs to be in milliseconds for Date object
var TokenExpirationBuffer = 300 * 1000;
var PKCELength = 128;
var TokenAccessTypes = ['legacy', 'offline', 'online'];
var GrantTypes = ['code', 'token'];
var IncludeGrantedScopes = ['none', 'user', 'team'];
var BaseAuthorizeUrl = 'https://www.dropbox.com/oauth2/authorize';
var BaseTokenUrl = 'https://api.dropboxapi.com/oauth2/token';

/* eslint-disable */
// Polyfill object.assign for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';

      var output;
      var index;
      var source;
      var nextKey;
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      output = Object(target);
      for (index = 1; index < arguments.length; index++) {
        source = arguments[index];
        if (source !== undefined && source !== null) {
          for (nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// Polyfill Array.includes for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
/* eslint-enable */

/**
 * @private
 * @class DropboxBase
 * @classdesc The main Dropbox SDK class. This contains the methods that are
 * shared between Dropbox and DropboxTeam classes. It is marked as private so
 * that it doesn't show up in the docs because it is never used directly.
 * @arg {Object} options
 * @arg {Function} [options.fetch] - fetch library for making requests.
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.clientSecret] - The client secret for your app.
 * @arg {Number} [options.selectUser] - User that the team access token would like
 * to act as.
 * @arg {String} [options.selectAdmin] - Team admin that the team access token would like
 * to act as.
 * @arg {String} [options.pathRoot] - root pass to access other namespaces
 * Use to access team folders for example
 */

function parseBodyToType(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

/**
 *
 * @param expiresIn
 */
function getTokenExpiresAt(expiresIn) {
  return new Date(Date.now() + expiresIn * 1000);
}

var DropboxBase = exports.DropboxBase = function () {
  function DropboxBase(options) {
    _classCallCheck(this, DropboxBase);

    options = options || {};
    this.accessToken = options.accessToken;
    this.accessTokenExpiresAt = options.accessTokenExpiresAt;
    this.refreshToken = options.refreshToken;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.selectUser = options.selectUser;
    this.selectAdmin = options.selectAdmin;
    this.fetch = options.fetch || fetch;
    this.pathRoot = options.pathRoot;
    if (!options.fetch) {
      console.warn('Global fetch is deprecated and will be unsupported in a future version. Please pass fetch function as option when instantiating dropbox instance: new Dropbox({fetch})');
    } // eslint-disable-line no-console
  }

  /**
   * Set the access token used to authenticate requests to the API.
   * @arg {String} accessToken - An access token
   * @returns {undefined}
   */


  _createClass(DropboxBase, [{
    key: 'setAccessToken',
    value: function setAccessToken(accessToken) {
      this.accessToken = accessToken;
    }

    /**
     * Get the access token
     * @returns {String} Access token
     */

  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      return this.accessToken;
    }

    /**
     * Set the client id, which is used to help gain an access token.
     * @arg {String} clientId - Your apps client id
     * @returns {undefined}
     */

  }, {
    key: 'setClientId',
    value: function setClientId(clientId) {
      this.clientId = clientId;
    }

    /**
     * Get the client id
     * @returns {String} Client id
     */

  }, {
    key: 'getClientId',
    value: function getClientId() {
      return this.clientId;
    }

    /**
     * Set the client secret
     * @arg {String} clientSecret - Your app's client secret
     * @returns {undefined}
     */

  }, {
    key: 'setClientSecret',
    value: function setClientSecret(clientSecret) {
      this.clientSecret = clientSecret;
    }

    /**
     * Get the client secret
     * @returns {String} Client secret
     */

  }, {
    key: 'getClientSecret',
    value: function getClientSecret() {
      return this.clientSecret;
    }

    /**
     * Gets the refresh token
     * @returns {String} Refresh token
     */

  }, {
    key: 'getRefreshToken',
    value: function getRefreshToken() {
      return this.refreshToken;
    }

    /**
     * Sets the refresh token
     * @param refreshToken - A refresh token
     */

  }, {
    key: 'setRefreshToken',
    value: function setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    }

    /**
     * Gets the access token's expiration date
     * @returns {Date} date of token expiration
     */

  }, {
    key: 'getAccessTokenExpiresAt',
    value: function getAccessTokenExpiresAt() {
      return this.accessTokenExpiresAt;
    }

    /**
     * Sets the access token's expiration date
     * @param accessTokenExpiresAt - new expiration date
     */

  }, {
    key: 'setAccessTokenExpiresAt',
    value: function setAccessTokenExpiresAt(accessTokenExpiresAt) {
      this.accessTokenExpiresAt = accessTokenExpiresAt;
    }
  }, {
    key: 'generatePKCECodes',
    value: function generatePKCECodes() {
      var codeVerifier = crypto.randomBytes(PKCELength);
      codeVerifier = codeVerifier.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '').substr(0, 128);
      this.codeVerifier = codeVerifier;

      var encoder = new Encoder();
      var codeData = encoder.encode(codeVerifier);
      var codeChallenge = crypto.createHash('sha256').update(codeData).digest();
      codeChallenge = codeChallenge.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      this.codeChallenge = codeChallenge;
    }
    /**
     * Get a URL that can be used to authenticate users for the Dropbox API.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} [state] - State that will be returned in the redirect URL to help
     * prevent cross site scripting attacks.
     * @arg {String} [authType] - auth type, defaults to 'token', other option is 'code'
     * @arg {String} [tokenAccessType] - type of token to request.  From the following:
     * legacy - creates one long-lived token with no expiration
     * online - create one short-lived token with an expiration
     * offline - create one short-lived token with an expiration with a refresh token
     * @arg {Array<String>} [scope] - scopes to request for the grant
     * @arg {String} [includeGrantedScopes] - whether or not to include previously granted scopes.
     * From the following:
     * user - include user scopes in the grant
     * team - include team scopes in the grant
     * Note: if this user has never linked the app, include_granted_scopes must be None
     * @arg {boolean} [usePKCE] - Whether or not to use Sha256 based PKCE. PKCE should be only use on
     * client apps which doesn't call your server. It is less secure than non-PKCE flow but
     * can be used if you are unable to safely retrieve your app secret
     * @returns {String} Url to send user to for Dropbox API authentication
     */

  }, {
    key: 'getAuthenticationUrl',
    value: function getAuthenticationUrl(redirectUri, state) {
      var authType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'token';
      var tokenAccessType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'legacy';
      var scope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var includeGrantedScopes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'none';
      var usePKCE = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

      var clientId = this.getClientId();
      var baseUrl = BaseAuthorizeUrl;

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (authType !== 'code' && !redirectUri) {
        throw new Error('A redirect uri is required.');
      }
      if (!GrantTypes.includes(authType)) {
        throw new Error('Authorization type must be code or token');
      }
      if (!TokenAccessTypes.includes(tokenAccessType)) {
        throw new Error('Token Access Type must be legacy, offline, or online');
      }
      if (scope && !(scope instanceof Array)) {
        throw new Error('Scope must be an array of strings');
      }
      if (!IncludeGrantedScopes.includes(includeGrantedScopes)) {
        throw new Error('includeGrantedScopes must be none, user, or team');
      }

      var authUrl = void 0;
      if (authType === 'code') {
        authUrl = baseUrl + '?response_type=code&client_id=' + clientId;
      } else {
        authUrl = baseUrl + '?response_type=token&client_id=' + clientId;
      }

      if (redirectUri) {
        authUrl += '&redirect_uri=' + redirectUri;
      }
      if (state) {
        authUrl += '&state=' + state;
      }
      if (tokenAccessType !== 'legacy') {
        authUrl += '&token_access_type=' + tokenAccessType;
      }
      if (scope) {
        authUrl += '&scope=' + scope.join(' ');
      }
      if (includeGrantedScopes !== 'none') {
        authUrl += '&include_granted_scopes=' + includeGrantedScopes;
      }
      if (usePKCE) {
        this.generatePKCECodes();
        authUrl += '&code_challenge_method=S256';
        authUrl += '&code_challenge=' + this.codeChallenge;
      }
      return authUrl;
    }

    /**
     * Get an OAuth2 access token from an OAuth2 Code.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} code - An OAuth2 code.
    */

  }, {
    key: 'getAccessTokenFromCode',
    value: function getAccessTokenFromCode(redirectUri, code) {
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      var path = BaseTokenUrl;
      path += '?grant_type=authorization_code';
      path += '&code=' + code;
      path += '&client_id=' + clientId;

      if (clientSecret) {
        path += '&client_secret=' + clientSecret;
      } else {
        if (!this.codeChallenge) {
          throw new Error('You must use PKCE when generating the authorization URL to not include a client secret');
        }
        path += '&code_verifier=' + this.codeVerifier;
      }
      if (redirectUri) {
        path += '&redirect_uri=' + redirectUri;
      }

      var fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      return this.fetch(path, fetchOptions).then(function (res) {
        return parseBodyToType(res);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            res = _ref2[0],
            data = _ref2[1];

        // maintaining existing API for error codes not equal to 200 range
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw {
            error: data,
            response: res,
            status: res.status
          };
        }

        if (data.refresh_token) {
          return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpiresAt: getTokenExpiresAt(data.expires_in)
          };
        }
        return data.access_token;
      });
    }

    /**
     * Checks if a token is needed, can be refreshed and if the token is expired.
     * If so, attempts to refresh access token
     * @returns {Promise<*>}
     */

  }, {
    key: 'checkAndRefreshAccessToken',
    value: function checkAndRefreshAccessToken() {
      var canRefresh = this.getRefreshToken() && this.getClientId();
      var needsRefresh = this.getAccessTokenExpiresAt() && new Date(Date.now() + TokenExpirationBuffer) >= this.getAccessTokenExpiresAt();
      var needsToken = !this.getAccessToken();
      if ((needsRefresh || needsToken) && canRefresh) {
        return this.refreshAccessToken();
      }
      return Promise.resolve();
    }

    /**
     * Refreshes the access token using the refresh token, if available
     * @arg {List} scope - a subset of scopes from the original
     * refresh to acquire with an access token
     * @returns {Promise<*>}
     */

  }, {
    key: 'refreshAccessToken',
    value: function refreshAccessToken() {
      var _this = this;

      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var refreshUrl = BaseTokenUrl;
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (scope && !(scope instanceof Array)) {
        throw new Error('Scope must be an array of strings');
      }

      var headers = {};
      headers['Content-Type'] = 'application/json';
      refreshUrl += '?grant_type=refresh_token&refresh_token=' + this.getRefreshToken();
      refreshUrl += '&client_id=' + clientId;
      if (clientSecret) {
        refreshUrl += '&client_secret=' + clientSecret;
      }
      if (scope) {
        refreshUrl += '&scope=' + scope.join(' ');
      }
      var fetchOptions = {
        method: 'POST'
      };

      fetchOptions.headers = headers;
      return this.fetch(refreshUrl, fetchOptions).then(function (res) {
        return parseBodyToType(res);
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            res = _ref4[0],
            data = _ref4[1];

        // maintaining existing API for error codes not equal to 200 range
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw {
            error: data,
            response: res,
            status: res.status
          };
        }
        _this.setAccessToken(data.access_token);
        _this.setAccessTokenExpiresAt(getTokenExpiresAt(data.expires_in));
      });
    }

    /**
     * Called when the authentication succeed
     * @callback successCallback
     * @param {string} access_token The application's access token
     */

    /**
     * Called when the authentication failed.
     * @callback errorCallback
     */

    /**
     * An authentication process that works with cordova applications.
     * @param {successCallback} successCallback
     * @param {errorCallback} errorCallback
     */

  }, {
    key: 'authenticateWithCordova',
    value: function authenticateWithCordova(successCallback, errorCallback) {
      var redirectUrl = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
      var url = this.getAuthenticationUrl(redirectUrl);

      var removed = false;
      var browser = window.open(url, '_blank');

      function onLoadError(event) {
        if (event.code !== -999) {
          // Workaround to fix wrong behavior on cordova-plugin-inappbrowser
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        }
      }

      function onLoadStop(event) {
        var errorLabel = '&error=';
        var errorIndex = event.url.indexOf(errorLabel);

        if (errorIndex > -1) {
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        } else {
          var tokenLabel = '#access_token=';
          var tokenIndex = event.url.indexOf(tokenLabel);
          var tokenTypeIndex = event.url.indexOf('&token_type=');
          if (tokenIndex > -1) {
            tokenIndex += tokenLabel.length;
            // Try to avoid a browser crash on browser.close().
            window.setTimeout(function () {
              browser.close();
            }, 10);

            var accessToken = event.url.substring(tokenIndex, tokenTypeIndex);
            successCallback(accessToken);
          }
        }
      }

      function onExit() {
        if (removed) {
          return;
        }
        browser.removeEventListener('loaderror', onLoadError);
        browser.removeEventListener('loadstop', onLoadStop);
        browser.removeEventListener('exit', onExit);
        removed = true;
      }

      browser.addEventListener('loaderror', onLoadError);
      browser.addEventListener('loadstop', onLoadStop);
      browser.addEventListener('exit', onExit);
    }
  }, {
    key: 'request',
    value: function request(path, args, auth, host, style) {
      var request = null;
      switch (style) {
        case _constants.RPC:
          request = this.getRpcRequest();
          break;
        case _constants.DOWNLOAD:
          request = this.getDownloadRequest();
          break;
        case _constants.UPLOAD:
          request = this.getUploadRequest();
          break;
        default:
          throw new Error('Invalid request style: ' + style);
      }
      var options = {
        selectUser: this.selectUser,
        selectAdmin: this.selectAdmin,
        clientId: this.getClientId(),
        clientSecret: this.getClientSecret(),
        pathRoot: this.pathRoot
      };
      return request(path, args, auth, host, this, options);
    }
  }, {
    key: 'setRpcRequest',
    value: function setRpcRequest(newRpcRequest) {
      this.rpcRequest = newRpcRequest;
    }
  }, {
    key: 'getRpcRequest',
    value: function getRpcRequest() {
      if (this.rpcRequest === undefined) {
        this.rpcRequest = (0, _rpcRequest.rpcRequest)(this.fetch);
      }
      return this.rpcRequest;
    }
  }, {
    key: 'setDownloadRequest',
    value: function setDownloadRequest(newDownloadRequest) {
      this.downloadRequest = newDownloadRequest;
    }
  }, {
    key: 'getDownloadRequest',
    value: function getDownloadRequest() {
      if (this.downloadRequest === undefined) {
        this.downloadRequest = (0, _downloadRequest.downloadRequest)(this.fetch);
      }
      return this.downloadRequest;
    }
  }, {
    key: 'setUploadRequest',
    value: function setUploadRequest(newUploadRequest) {
      this.uploadRequest = newUploadRequest;
    }
  }, {
    key: 'getUploadRequest',
    value: function getUploadRequest() {
      if (this.uploadRequest === undefined) {
        this.uploadRequest = (0, _uploadRequest.uploadRequest)(this.fetch);
      }
      return this.uploadRequest;
    }
  }]);

  return DropboxBase;
}();

/***/ }),

/***/ 198:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const fs = __importStar(__webpack_require__(747));
const upload_1 = __webpack_require__(602);
const accessToken = core.getInput('dropbox_access_token');
const file = core.getInput('file');
const path = core.getInput('path');
async function run() {
    try {
        const contents = await fs.promises.readFile(file);
        core.debug(`Uploading '${file}' -> '${path}'`);
        await upload_1.upload(path, contents, accessToken);
        core.info(`'${file}' -> '${path}' has been successfully uploaded`);
    }
    catch (error) {
        core.setFailed(error);
    }
}
run();


/***/ }),

/***/ 204:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWindowOrWorker = isWindowOrWorker;
exports.getBaseURL = getBaseURL;
exports.httpHeaderSafeJson = httpHeaderSafeJson;
function getSafeUnicode(c) {
  var unicode = ('000' + c.charCodeAt(0).toString(16)).slice(-4);
  return '\\u' + unicode;
}

/* global WorkerGlobalScope */
function isWindowOrWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope || "object" === 'undefined' || typeof window !== 'undefined';
}

function getBaseURL(host) {
  return 'https://' + host + '.dropboxapi.com/2/';
}

// source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786
function httpHeaderSafeJson(args) {
  return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
}

/***/ }),

/***/ 211:
/***/ (function(module) {

module.exports = require("https");

/***/ }),

/***/ 218:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.downloadRequest = downloadRequest;

var _utils = __webpack_require__(204);

function getDataFromConsumer(res) {
  if (!res.ok) {
    return res.text();
  }

  return (0, _utils.isWindowOrWorker)() ? res.blob() : res.buffer();
}

function responseHandler(res, data) {
  if (!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      error: data,
      response: res,
      status: res.status
    };
  }

  var result = JSON.parse(res.headers.get('dropbox-api-result'));

  if ((0, _utils.isWindowOrWorker)()) {
    result.fileBlob = data;
  } else {
    result.fileBinary = data;
  }

  return result;
}

function downloadRequest(fetch) {
  return function downloadRequestWithFetch(path, args, auth, host, client, options) {
    return client.checkAndRefreshAccessToken().then(function () {
      if (auth !== 'user') {
        throw new Error('Unexpected auth type: ' + auth);
      }

      var fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + client.getAccessToken(),
          'Dropbox-API-Arg': (0, _utils.httpHeaderSafeJson)(args)
        }
      };

      if (options) {
        if (options.selectUser) {
          fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
        }
        if (options.selectAdmin) {
          fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
        }
        if (options.pathRoot) {
          fetchOptions.headers['Dropbox-API-Path-Root'] = options.pathRoot;
        }
      }

      return fetchOptions;
    }).then(function (fetchOptions) {
      return fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
    }).then(function (res) {
      return getDataFromConsumer(res).then(function (data) {
        return [res, data];
      });
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          res = _ref2[0],
          data = _ref2[1];

      return responseHandler(res, data);
    });
  };
}

/***/ }),

/***/ 279:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routes = __webpack_require__(407);

var _dropboxBase = __webpack_require__(178);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class Dropbox
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides methods to read, write and
 * create files or folders in a user's Dropbox.
 * @arg {Object} options
 * @arg {Function} [options.fetch] - fetch library for making requests.
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.selectUser] - Select user is only used by DropboxTeam.
 * It specifies which user the team access token should be acting as.
 * @arg {String} [options.pathRoot] - root pass to access other namespaces
 * Use to access team folders for example
 * @arg {String} [options.refreshToken] - A refresh token for retrieving access tokens
 * @arg {Date} [options.AccessTokenExpiresAt] - Date of the current access token's
 * expiration (if available)
 */
var Dropbox = exports.Dropbox = function (_DropboxBase) {
  _inherits(Dropbox, _DropboxBase);

  function Dropbox(options) {
    _classCallCheck(this, Dropbox);

    var _this = _possibleConstructorReturn(this, (Dropbox.__proto__ || Object.getPrototypeOf(Dropbox)).call(this, options));

    Object.assign(_this, _routes.routes);
    return _this;
  }

  _createClass(Dropbox, [{
    key: 'filesGetSharedLinkFile',
    value: function filesGetSharedLinkFile(arg) {
      return this.request('sharing/get_shared_link_file', arg, 'api', 'download');
    }
  }]);

  return Dropbox;
}(_dropboxBase.DropboxBase);

/***/ }),

/***/ 293:
/***/ (function(module) {

module.exports = require("buffer");

/***/ }),

/***/ 297:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var dropbox = __webpack_require__(279);
var dropboxTeam = __webpack_require__(138);

module.exports = {
  Dropbox: dropbox.Dropbox,
  DropboxTeam: dropboxTeam.DropboxTeam
};

/***/ }),

/***/ 407:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Auto-generated by Stone, do not modify.
var routes = {};

/**
 * Sets a user's profile photo.
 * @function Dropbox#accountSetProfilePhoto
 * @arg {AccountSetProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<AccountSetProfilePhotoResult, Error.<AccountSetProfilePhotoError>>}
 */
routes.accountSetProfilePhoto = function (arg) {
  return this.request('account/set_profile_photo', arg, 'user', 'api', 'rpc');
};

/**
 * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
 * @function Dropbox#authTokenFromOauth1
 * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
 * @returns {Promise.<AuthTokenFromOAuth1Result, Error.<AuthTokenFromOAuth1Error>>}
 */
routes.authTokenFromOauth1 = function (arg) {
  return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
};

/**
 * Disables the access token used to authenticate the call.
 * @function Dropbox#authTokenRevoke
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<void, Error.<void>>}
 */
routes.authTokenRevoke = function (arg) {
  return this.request('auth/token/revoke', arg, 'user', 'api', 'rpc');
};

/**
 * This endpoint performs App Authentication, validating the supplied app key
 * and secret, and returns the supplied string, to allow you to test your code
 * and connection to the Dropbox API. It has no other effect. If you receive an
 * HTTP 200 response with the supplied query, it indicates at least part of the
 * Dropbox API infrastructure is working and that the app key and secret valid.
 * @function Dropbox#checkApp
 * @arg {CheckEchoArg} arg - The request parameters.
 * @returns {Promise.<CheckEchoResult, Error.<void>>}
 */
routes.checkApp = function (arg) {
  return this.request('check/app', arg, 'app', 'api', 'rpc');
};

/**
 * This endpoint performs User Authentication, validating the supplied access
 * token, and returns the supplied string, to allow you to test your code and
 * connection to the Dropbox API. It has no other effect. If you receive an HTTP
 * 200 response with the supplied query, it indicates at least part of the
 * Dropbox API infrastructure is working and that the access token is valid.
 * @function Dropbox#checkUser
 * @arg {CheckEchoArg} arg - The request parameters.
 * @returns {Promise.<CheckEchoResult, Error.<void>>}
 */
routes.checkUser = function (arg) {
  return this.request('check/user', arg, 'user', 'api', 'rpc');
};

/**
 * Fetch the binary content of the requested document. This route requires Cloud
 * Docs auth. Please make a request to cloud_docs/authorize and supply that
 * token in the Authorization header.
 * @function Dropbox#cloudDocsGetContent
 * @arg {CloudDocsGetContentArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<CloudDocsCloudDocsAccessError>>}
 */
routes.cloudDocsGetContent = function (arg) {
  return this.request('cloud_docs/get_content', arg, 'user', 'content', 'download');
};

/**
 * Fetches metadata associated with a Cloud Doc and user. This route requires
 * Cloud Docs auth. Please make a request to cloud_docs/authorize and supply
 * that token in the Authorization header.
 * @function Dropbox#cloudDocsGetMetadata
 * @arg {CloudDocsGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<CloudDocsGetMetadataResult, Error.<CloudDocsGetMetadataError>>}
 */
routes.cloudDocsGetMetadata = function (arg) {
  return this.request('cloud_docs/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Lock a Cloud Doc. This route requires Cloud Docs auth. Please make a request
 * to cloud_docs/authorize and supply that token in the Authorization header.
 * @function Dropbox#cloudDocsLock
 * @arg {CloudDocsLockArg} arg - The request parameters.
 * @returns {Promise.<CloudDocsLockResult, Error.<CloudDocsLockingError>>}
 */
routes.cloudDocsLock = function (arg) {
  return this.request('cloud_docs/lock', arg, 'user', 'api', 'rpc');
};

/**
 * Update the title of a Cloud Doc. This route requires Cloud Docs auth. Please
 * make a request to cloud_docs/authorize and supply that token in the
 * Authorization header.
 * @function Dropbox#cloudDocsRename
 * @arg {CloudDocsRenameArg} arg - The request parameters.
 * @returns {Promise.<CloudDocsRenameResult, Error.<CloudDocsRenameError>>}
 */
routes.cloudDocsRename = function (arg) {
  return this.request('cloud_docs/rename', arg, 'user', 'api', 'rpc');
};

/**
 * Unlock a Cloud Doc. This route requires Cloud Docs auth. Please make a
 * request to cloud_docs/authorize and supply that token in the Authorization
 * header.
 * @function Dropbox#cloudDocsUnlock
 * @arg {CloudDocsUnlockArg} arg - The request parameters.
 * @returns {Promise.<CloudDocsUnlockResult, Error.<CloudDocsLockingError>>}
 */
routes.cloudDocsUnlock = function (arg) {
  return this.request('cloud_docs/unlock', arg, 'user', 'api', 'rpc');
};

/**
 * Update the contents of a Cloud Doc. This should be called for files with a
 * max size of 150MB. This route requires Cloud Docs auth. Please make a request
 * to cloud_docs/authorize and supply that token in the Authorization header.
 * @function Dropbox#cloudDocsUpdateContent
 * @arg {CloudDocsUpdateContentArg} arg - The request parameters.
 * @returns {Promise.<CloudDocsUpdateContentResult, Error.<CloudDocsUpdateContentError>>}
 */
routes.cloudDocsUpdateContent = function (arg) {
  return this.request('cloud_docs/update_content', arg, 'user', 'content', 'upload');
};

/**
 * Removes all manually added contacts. You'll still keep contacts who are on
 * your team or who you imported. New contacts will be added when you share.
 * @function Dropbox#contactsDeleteManualContacts
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<void, Error.<void>>}
 */
routes.contactsDeleteManualContacts = function (arg) {
  return this.request('contacts/delete_manual_contacts', arg, 'user', 'api', 'rpc');
};

/**
 * Removes manually added contacts from the given list.
 * @function Dropbox#contactsDeleteManualContactsBatch
 * @arg {ContactsDeleteManualContactsArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<ContactsDeleteManualContactsError>>}
 */
routes.contactsDeleteManualContactsBatch = function (arg) {
  return this.request('contacts/delete_manual_contacts_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Add property groups to a Dropbox file. See templates/add_for_user or
 * templates/add_for_team to create new templates.
 * @function Dropbox#filePropertiesPropertiesAdd
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filePropertiesPropertiesAdd = function (arg) {
  return this.request('file_properties/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * Overwrite property groups associated with a file. This endpoint should be
 * used instead of properties/update when property groups are being updated via
 * a "snapshot" instead of via a "delta". In other words, this endpoint will
 * delete all omitted fields from a property group, whereas properties/update
 * will only delete fields that are explicitly marked for deletion.
 * @function Dropbox#filePropertiesPropertiesOverwrite
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filePropertiesPropertiesOverwrite = function (arg) {
  return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified property group from the file. To remove
 * specific property field key value pairs, see properties/update. To update a
 * template, see templates/update_for_user or templates/update_for_team. To
 * remove a template, see templates/remove_for_user or
 * templates/remove_for_team.
 * @function Dropbox#filePropertiesPropertiesRemove
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filePropertiesPropertiesRemove = function (arg) {
  return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Search across property templates for particular property field values.
 * @function Dropbox#filePropertiesPropertiesSearch
 * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchError>>}
 */
routes.filePropertiesPropertiesSearch = function (arg) {
  return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from properties/search, use this to paginate
 * through all search results.
 * @function Dropbox#filePropertiesPropertiesSearchContinue
 * @arg {FilePropertiesPropertiesSearchContinueArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchContinueError>>}
 */
routes.filePropertiesPropertiesSearchContinue = function (arg) {
  return this.request('file_properties/properties/search/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Add, update or remove properties associated with the supplied file and
 * templates. This endpoint should be used instead of properties/overwrite when
 * property groups are being updated via a "delta" instead of via a "snapshot" .
 * In other words, this endpoint will not delete any omitted fields from a
 * property group, whereas properties/overwrite will delete any fields that are
 * omitted from a property group.
 * @function Dropbox#filePropertiesPropertiesUpdate
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filePropertiesPropertiesUpdate = function (arg) {
  return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Add a template associated with a team. See properties/add to add properties
 * to a file or folder. Note: this endpoint will create team-owned templates.
 * @function Dropbox#filePropertiesTemplatesAddForTeam
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForTeam = function (arg) {
  return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Add a template associated with a user. See properties/add to add properties
 * to a file. This endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesAddForUser
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForUser = function (arg) {
  return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the schema for a specified template.
 * @function Dropbox#filePropertiesTemplatesGetForTeam
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForTeam = function (arg) {
  return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the schema for a specified template. This endpoint can't be called on a
 * team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesGetForUser
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForUser = function (arg) {
  return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_team.
 * @function Dropbox#filePropertiesTemplatesListForTeam
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForTeam = function (arg) {
  return this.request('file_properties/templates/list_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_user. This endpoint can't be called on a team member or
 * admin's behalf.
 * @function Dropbox#filePropertiesTemplatesListForUser
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForUser = function (arg) {
  return this.request('file_properties/templates/list_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForTeam
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForTeam = function (arg) {
  return this.request('file_properties/templates/remove_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForUser
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForUser = function (arg) {
  return this.request('file_properties/templates/remove_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Update a template associated with a team. This route can update the template
 * name, the template description and add optional properties to templates.
 * @function Dropbox#filePropertiesTemplatesUpdateForTeam
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
  return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Update a template associated with a user. This route can update the template
 * name, the template description and add optional properties to templates. This
 * endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesUpdateForUser
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForUser = function (arg) {
  return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the total number of file requests owned by this user. Includes both
 * open and closed file requests.
 * @function Dropbox#fileRequestsCount
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FileRequestsCountFileRequestsResult, Error.<FileRequestsCountFileRequestsError>>}
 */
routes.fileRequestsCount = function (arg) {
  return this.request('file_requests/count', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a file request for this user.
 * @function Dropbox#fileRequestsCreate
 * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsCreateFileRequestError>>}
 */
routes.fileRequestsCreate = function (arg) {
  return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
};

/**
 * Delete a batch of closed file requests.
 * @function Dropbox#fileRequestsDelete
 * @arg {FileRequestsDeleteFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsDeleteFileRequestsResult, Error.<FileRequestsDeleteFileRequestError>>}
 */
routes.fileRequestsDelete = function (arg) {
  return this.request('file_requests/delete', arg, 'user', 'api', 'rpc');
};

/**
 * Delete all closed file requests owned by this user.
 * @function Dropbox#fileRequestsDeleteAllClosed
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FileRequestsDeleteAllClosedFileRequestsResult, Error.<FileRequestsDeleteAllClosedFileRequestsError>>}
 */
routes.fileRequestsDeleteAllClosed = function (arg) {
  return this.request('file_requests/delete_all_closed', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the specified file request.
 * @function Dropbox#fileRequestsGet
 * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsGetFileRequestError>>}
 */
routes.fileRequestsGet = function (arg) {
  return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsListV2
 * @arg {FileRequestsListFileRequestsArg} arg - The request parameters.
 * @returns {Promise.<FileRequestsListFileRequestsV2Result, Error.<FileRequestsListFileRequestsError>>}
 */
routes.fileRequestsListV2 = function (arg) {
  return this.request('file_requests/list_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsList
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FileRequestsListFileRequestsResult, Error.<FileRequestsListFileRequestsError>>}
 */
routes.fileRequestsList = function (arg) {
  return this.request('file_requests/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_v2, use this to paginate through
 * all file requests. The cursor must come from a previous call to list_v2 or
 * list/continue.
 * @function Dropbox#fileRequestsListContinue
 * @arg {FileRequestsListFileRequestsContinueArg} arg - The request parameters.
 * @returns {Promise.<FileRequestsListFileRequestsV2Result, Error.<FileRequestsListFileRequestsContinueError>>}
 */
routes.fileRequestsListContinue = function (arg) {
  return this.request('file_requests/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Update a file request.
 * @function Dropbox#fileRequestsUpdate
 * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsUpdateFileRequestError>>}
 */
routes.fileRequestsUpdate = function (arg) {
  return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the metadata for a file or folder. This is an alpha endpoint
 * compatible with the properties API. Note: Metadata for the root folder is
 * unsupported.
 * @function Dropbox#filesAlphaGetMetadata
 * @deprecated
 * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesAlphaGetMetadataError>>}
 */
routes.filesAlphaGetMetadata = function (arg) {
  return this.request('files/alpha/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Note that this
 * endpoint is part of the properties API alpha and is slightly different from
 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
 * an upload session with upload_session/start.
 * @function Dropbox#filesAlphaUpload
 * @deprecated
 * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadErrorWithProperties>>}
 */
routes.filesAlphaUpload = function (arg) {
  return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopyV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesCopyV2 = function (arg) {
  return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopy
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesCopy = function (arg) {
  return this.request('files/copy', arg, 'user', 'api', 'rpc');
};

/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. This route will replace copy_batch. The main difference is this
 * route will return status for each entry, while copy_batch raises failure if
 * any entry fails. This route will either finish synchronously, or return a job
 * ID and do the async copy job in background. Please use copy_batch/check_v2 to
 * check the job status.
 * @function Dropbox#filesCopyBatchV2
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchV2Launch, Error.<void>>}
 */
routes.filesCopyBatchV2 = function (arg) {
  return this.request('files/copy_batch_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. If RelocationBatchArg.allow_shared_folder is false, this route is
 * atomic. If one entry fails, the whole transaction will abort. If
 * RelocationBatchArg.allow_shared_folder is true, atomicity is not guaranteed,
 * but it allows you to copy the contents of shared folders to new locations.
 * This route will return job ID immediately and do the async copy job in
 * background. Please use copy_batch/check to check the job status.
 * @function Dropbox#filesCopyBatch
 * @deprecated
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesCopyBatch = function (arg) {
  return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for copy_batch_v2. It returns list
 * of results for each entry.
 * @function Dropbox#filesCopyBatchCheckV2
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchV2JobStatus, Error.<AsyncPollError>>}
 */
routes.filesCopyBatchCheckV2 = function (arg) {
  return this.request('files/copy_batch/check_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for copy_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesCopyBatchCheck
 * @deprecated
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesCopyBatchCheck = function (arg) {
  return this.request('files/copy_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Get a copy reference to a file or folder. This reference string can be used
 * to save that file or folder to another user's Dropbox by passing it to
 * copy_reference/save.
 * @function Dropbox#filesCopyReferenceGet
 * @arg {FilesGetCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesGetCopyReferenceResult, Error.<FilesGetCopyReferenceError>>}
 */
routes.filesCopyReferenceGet = function (arg) {
  return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
};

/**
 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
 * @function Dropbox#filesCopyReferenceSave
 * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveCopyReferenceResult, Error.<FilesSaveCopyReferenceError>>}
 */
routes.filesCopyReferenceSave = function (arg) {
  return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolderV2
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesCreateFolderResult, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolderV2 = function (arg) {
  return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolder
 * @deprecated
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesFolderMetadata, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolder = function (arg) {
  return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Create multiple folders at once. This route is asynchronous for large
 * batches, which returns a job ID immediately and runs the create folder batch
 * asynchronously. Otherwise, creates the folders and returns the result
 * synchronously for smaller inputs. You can force asynchronous behaviour by
 * using the CreateFolderBatchArg.force_async flag.  Use
 * create_folder_batch/check to check the job status.
 * @function Dropbox#filesCreateFolderBatch
 * @arg {FilesCreateFolderBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesCreateFolderBatchLaunch, Error.<void>>}
 */
routes.filesCreateFolderBatch = function (arg) {
  return this.request('files/create_folder_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for create_folder_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesCreateFolderBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesCreateFolderBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesCreateFolderBatchCheck = function (arg) {
  return this.request('files/create_folder_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDeleteV2
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteResult, Error.<FilesDeleteError>>}
 */
routes.filesDeleteV2 = function (arg) {
  return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDelete
 * @deprecated
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesDeleteError>>}
 */
routes.filesDelete = function (arg) {
  return this.request('files/delete', arg, 'user', 'api', 'rpc');
};

/**
 * Delete multiple files/folders at once. This route is asynchronous, which
 * returns a job ID immediately and runs the delete batch asynchronously. Use
 * delete_batch/check to check the job status.
 * @function Dropbox#filesDeleteBatch
 * @arg {FilesDeleteBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchLaunch, Error.<void>>}
 */
routes.filesDeleteBatch = function (arg) {
  return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for delete_batch. If success, it
 * returns list of result for each entry.
 * @function Dropbox#filesDeleteBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesDeleteBatchCheck = function (arg) {
  return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Download a file from a user's Dropbox.
 * @function Dropbox#filesDownload
 * @arg {FilesDownloadArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesDownloadError>>}
 */
routes.filesDownload = function (arg) {
  return this.request('files/download', arg, 'user', 'content', 'download');
};

/**
 * Download a folder from the user's Dropbox, as a zip file. The folder must be
 * less than 20 GB in size and have fewer than 10,000 total files. The input
 * cannot be a single file. Any single file must be less than 4GB in size.
 * @function Dropbox#filesDownloadZip
 * @arg {FilesDownloadZipArg} arg - The request parameters.
 * @returns {Promise.<FilesDownloadZipResult, Error.<FilesDownloadZipError>>}
 */
routes.filesDownloadZip = function (arg) {
  return this.request('files/download_zip', arg, 'user', 'content', 'download');
};

/**
 * Export a file from a user's Dropbox. This route only supports exporting files
 * that cannot be downloaded directly  and whose ExportResult.file_metadata has
 * ExportInfo.export_as populated.
 * @function Dropbox#filesExport
 * @arg {FilesExportArg} arg - The request parameters.
 * @returns {Promise.<FilesExportResult, Error.<FilesExportError>>}
 */
routes.filesExport = function (arg) {
  return this.request('files/export', arg, 'user', 'content', 'download');
};

/**
 * Return the lock metadata for the given list of paths.
 * @function Dropbox#filesGetFileLockBatch
 * @arg {FilesLockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesLockFileBatchResult, Error.<FilesLockFileError>>}
 */
routes.filesGetFileLockBatch = function (arg) {
  return this.request('files/get_file_lock_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the metadata for a file or folder. Note: Metadata for the root folder
 * is unsupported.
 * @function Dropbox#filesGetMetadata
 * @arg {FilesGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesGetMetadataError>>}
 */
routes.filesGetMetadata = function (arg) {
  return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Get a preview for a file. Currently, PDF previews are generated for files
 * with the following extensions: .ai, .doc, .docm, .docx, .eps, .gdoc,
 * .gslides, .odp, .odt, .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML
 * previews are generated for files with the following extensions: .csv, .ods,
 * .xls, .xlsm, .gsheet, .xlsx. Other formats will return an unsupported
 * extension error.
 * @function Dropbox#filesGetPreview
 * @arg {FilesPreviewArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesPreviewError>>}
 */
routes.filesGetPreview = function (arg) {
  return this.request('files/get_preview', arg, 'user', 'content', 'download');
};

/**
 * Get a temporary link to stream content of a file. This link will expire in
 * four hours and afterwards you will get 410 Gone. This URL should not be used
 * to display content directly in the browser. The Content-Type of the link is
 * determined automatically by the file's mime type.
 * @function Dropbox#filesGetTemporaryLink
 * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
 * @returns {Promise.<FilesGetTemporaryLinkResult, Error.<FilesGetTemporaryLinkError>>}
 */
routes.filesGetTemporaryLink = function (arg) {
  return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
};

/**
 * Get a one-time use temporary upload link to upload a file to a Dropbox
 * location.  This endpoint acts as a delayed upload. The returned temporary
 * upload link may be used to make a POST request with the data to be uploaded.
 * The upload will then be perfomed with the CommitInfo previously provided to
 * get_temporary_upload_link but evaluated only upon consumption. Hence, errors
 * stemming from invalid CommitInfo with respect to the state of the user's
 * Dropbox will only be communicated at consumption time. Additionally, these
 * errors are surfaced as generic HTTP 409 Conflict responses, potentially
 * hiding issue details. The maximum temporary upload link duration is 4 hours.
 * Upon consumption or expiration, a new link will have to be generated.
 * Multiple links may exist for a specific upload path at any given time.  The
 * POST request on the temporary upload link must have its Content-Type set to
 * "application/octet-stream".  Example temporary upload link consumption
 * request:  curl -X POST
 * https://content.dropboxapi.com/apitul/1/bNi2uIYF51cVBND --header
 * "Content-Type: application/octet-stream" --data-binary @local_file.txt  A
 * successful temporary upload link consumption request returns the content hash
 * of the uploaded data in JSON format.  Example succesful temporary upload link
 * consumption response: {"content-hash":
 * "599d71033d700ac892a0e48fa61b125d2f5994"}  An unsuccessful temporary upload
 * link consumption request returns any of the following status codes:  HTTP 400
 * Bad Request: Content-Type is not one of application/octet-stream and
 * text/plain or request is invalid. HTTP 409 Conflict: The temporary upload
 * link does not exist or is currently unavailable, the upload failed, or
 * another error happened. HTTP 410 Gone: The temporary upload link is expired
 * or consumed.  Example unsuccessful temporary upload link consumption
 * response: Temporary upload link has been recently consumed.
 * @function Dropbox#filesGetTemporaryUploadLink
 * @arg {FilesGetTemporaryUploadLinkArg} arg - The request parameters.
 * @returns {Promise.<FilesGetTemporaryUploadLinkResult, Error.<void>>}
 */
routes.filesGetTemporaryUploadLink = function (arg) {
  return this.request('files/get_temporary_upload_link', arg, 'user', 'api', 'rpc');
};

/**
 * Get a thumbnail for an image. This method currently supports files with the
 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
 * that are larger than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnail
 * @arg {FilesThumbnailArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesThumbnailError>>}
 */
routes.filesGetThumbnail = function (arg) {
  return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
};

/**
 * Get a thumbnail for a file.
 * @function Dropbox#filesGetThumbnailV2
 * @arg {FilesThumbnailV2Arg} arg - The request parameters.
 * @returns {Promise.<FilesPreviewResult, Error.<FilesThumbnailV2Error>>}
 */
routes.filesGetThumbnailV2 = function (arg) {
  return this.request('files/get_thumbnail_v2', arg, 'app, user', 'content', 'download');
};

/**
 * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
 * batch. This method currently supports files with the following file
 * extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger
 * than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnailBatch
 * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesGetThumbnailBatchResult, Error.<FilesGetThumbnailBatchError>>}
 */
routes.filesGetThumbnailBatch = function (arg) {
  return this.request('files/get_thumbnail_batch', arg, 'user', 'content', 'rpc');
};

/**
 * Starts returning the contents of a folder. If the result's
 * ListFolderResult.has_more field is true, call list_folder/continue with the
 * returned ListFolderResult.cursor to retrieve more entries. If you're using
 * ListFolderArg.recursive set to true to keep a local cache of the contents of
 * a Dropbox account, iterate through each entry in order and process them as
 * follows to keep your local state in sync: For each FileMetadata, store the
 * new entry at the given path in your local state. If the required parent
 * folders don't exist yet, create them. If there's already something else at
 * the given path, replace it and remove all its children. For each
 * FolderMetadata, store the new entry at the given path in your local state. If
 * the required parent folders don't exist yet, create them. If there's already
 * something else at the given path, replace it but leave the children as they
 * are. Check the new entry's FolderSharingInfo.read_only and set all its
 * children's read-only statuses to match. For each DeletedMetadata, if your
 * local state has something at the given path, remove it and all its children.
 * If there's nothing at the given path, ignore this entry. Note:
 * auth.RateLimitError may be returned if multiple list_folder or
 * list_folder/continue calls with same parameters are made simultaneously by
 * same API app for same user. If your app implements retry logic, please hold
 * off the retry until the previous request finishes.
 * @function Dropbox#filesListFolder
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolder = function (arg) {
  return this.request('files/list_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder, use this to paginate
 * through all files and retrieve updates to the folder, following the same
 * rules as documented for list_folder.
 * @function Dropbox#filesListFolderContinue
 * @arg {FilesListFolderContinueArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderContinueError>>}
 */
routes.filesListFolderContinue = function (arg) {
  return this.request('files/list_folder/continue', arg, 'user', 'api', 'rpc');
};

/**
 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
 * for app which only needs to know about new files and modifications and
 * doesn't need to know about files that already exist in Dropbox.
 * @function Dropbox#filesListFolderGetLatestCursor
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderGetLatestCursorResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolderGetLatestCursor = function (arg) {
  return this.request('files/list_folder/get_latest_cursor', arg, 'user', 'api', 'rpc');
};

/**
 * A longpoll endpoint to wait for changes on an account. In conjunction with
 * list_folder/continue, this call gives you a low-latency way to monitor an
 * account for file changes. The connection will block until there are changes
 * available or a timeout occurs. This endpoint is useful mostly for client-side
 * apps. If you're looking for server-side notifications, check out our webhooks
 * documentation https://www.dropbox.com/developers/reference/webhooks.
 * @function Dropbox#filesListFolderLongpoll
 * @arg {FilesListFolderLongpollArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderLongpollResult, Error.<FilesListFolderLongpollError>>}
 */
routes.filesListFolderLongpoll = function (arg) {
  return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
};

/**
 * Returns revisions for files based on a file path or a file id. The file path
 * or file id is identified from the latest file entry at the given file path or
 * id. This end point allows your app to query either by file path or file id by
 * setting the mode parameter appropriately. In the ListRevisionsMode.path
 * (default) mode, all revisions at the same file path as the latest file entry
 * are returned. If revisions with the same file id are desired, then mode must
 * be set to ListRevisionsMode.id. The ListRevisionsMode.id mode is useful to
 * retrieve revisions for a given file across moves or renames.
 * @function Dropbox#filesListRevisions
 * @arg {FilesListRevisionsArg} arg - The request parameters.
 * @returns {Promise.<FilesListRevisionsResult, Error.<FilesListRevisionsError>>}
 */
routes.filesListRevisions = function (arg) {
  return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
};

/**
 * Lock the files at the given paths. A locked file will be writable only by the
 * lock holder. A successful response indicates that the file has been locked.
 * Returns a list of the locked file paths and their metadata after this
 * operation.
 * @function Dropbox#filesLockFileBatch
 * @arg {FilesLockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesLockFileBatchResult, Error.<FilesLockFileError>>}
 */
routes.filesLockFileBatch = function (arg) {
  return this.request('files/lock_file_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved. Note that we do not
 * currently support case-only renaming.
 * @function Dropbox#filesMoveV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesMoveV2 = function (arg) {
  return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMove
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesMove = function (arg) {
  return this.request('files/move', arg, 'user', 'api', 'rpc');
};

/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. Note that we do not currently support case-only renaming. This route
 * will replace move_batch. The main difference is this route will return status
 * for each entry, while move_batch raises failure if any entry fails. This
 * route will either finish synchronously, or return a job ID and do the async
 * move job in background. Please use move_batch/check_v2 to check the job
 * status.
 * @function Dropbox#filesMoveBatchV2
 * @arg {FilesMoveBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchV2Launch, Error.<void>>}
 */
routes.filesMoveBatchV2 = function (arg) {
  return this.request('files/move_batch_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. This route will return job ID immediately and do the async moving
 * job in background. Please use move_batch/check to check the job status.
 * @function Dropbox#filesMoveBatch
 * @deprecated
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesMoveBatch = function (arg) {
  return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for move_batch_v2. It returns list
 * of results for each entry.
 * @function Dropbox#filesMoveBatchCheckV2
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchV2JobStatus, Error.<AsyncPollError>>}
 */
routes.filesMoveBatchCheckV2 = function (arg) {
  return this.request('files/move_batch/check_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for move_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesMoveBatchCheck
 * @deprecated
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesMoveBatchCheck = function (arg) {
  return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently delete the file or folder at a given path (see
 * https://www.dropbox.com/en/help/40). Note: This endpoint is only available
 * for Dropbox Business apps.
 * @function Dropbox#filesPermanentlyDelete
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesDeleteError>>}
 */
routes.filesPermanentlyDelete = function (arg) {
  return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesAdd
 * @deprecated
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filesPropertiesAdd = function (arg) {
  return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesOverwrite
 * @deprecated
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filesPropertiesOverwrite = function (arg) {
  return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesRemove
 * @deprecated
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filesPropertiesRemove = function (arg) {
  return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateGet = function (arg) {
  return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateList = function (arg) {
  return this.request('files/properties/template/list', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesUpdate
 * @deprecated
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filesPropertiesUpdate = function (arg) {
  return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Restore a specific revision of a file to the given path.
 * @function Dropbox#filesRestore
 * @arg {FilesRestoreArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesRestoreError>>}
 */
routes.filesRestore = function (arg) {
  return this.request('files/restore', arg, 'user', 'api', 'rpc');
};

/**
 * Save the data from a specified URL into a file in user's Dropbox. Note that
 * the transfer from the URL must complete within 5 minutes, or the operation
 * will time out and the job will fail. If the given path already exists, the
 * file will be renamed to avoid the conflict (e.g. myfile (1).txt).
 * @function Dropbox#filesSaveUrl
 * @arg {FilesSaveUrlArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlResult, Error.<FilesSaveUrlError>>}
 */
routes.filesSaveUrl = function (arg) {
  return this.request('files/save_url', arg, 'user', 'api', 'rpc');
};

/**
 * Check the status of a save_url job.
 * @function Dropbox#filesSaveUrlCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlJobStatus, Error.<AsyncPollError>>}
 */
routes.filesSaveUrlCheckJobStatus = function (arg) {
  return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Searches for files and folders. Note: Recent changes will be reflected in
 * search results within a few seconds and older revisions of existing files may
 * still match your query for up to a few days.
 * @function Dropbox#filesSearch
 * @deprecated
 * @arg {FilesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilesSearchResult, Error.<FilesSearchError>>}
 */
routes.filesSearch = function (arg) {
  return this.request('files/search', arg, 'user', 'api', 'rpc');
};

/**
 * Searches for files and folders. Note: search_v2 along with search/continue_v2
 * can only be used to retrieve a maximum of 10,000 matches. Recent changes may
 * not immediately be reflected in search results due to a short delay in
 * indexing. Duplicate results may be returned across pages. Some results may
 * not be returned.
 * @function Dropbox#filesSearchV2
 * @arg {FilesSearchV2Arg} arg - The request parameters.
 * @returns {Promise.<FilesSearchV2Result, Error.<FilesSearchError>>}
 */
routes.filesSearchV2 = function (arg) {
  return this.request('files/search_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Fetches the next page of search results returned from search_v2. Note:
 * search_v2 along with search/continue_v2 can only be used to retrieve a
 * maximum of 10,000 matches. Recent changes may not immediately be reflected in
 * search results due to a short delay in indexing. Duplicate results may be
 * returned across pages. Some results may not be returned.
 * @function Dropbox#filesSearchContinueV2
 * @arg {FilesSearchV2ContinueArg} arg - The request parameters.
 * @returns {Promise.<FilesSearchV2Result, Error.<FilesSearchError>>}
 */
routes.filesSearchContinueV2 = function (arg) {
  return this.request('files/search/continue_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Unlock the files at the given paths. A locked file can only be unlocked by
 * the lock holder or, if a business account, a team admin. A successful
 * response indicates that the file has been unlocked. Returns a list of the
 * unlocked file paths and their metadata after this operation.
 * @function Dropbox#filesUnlockFileBatch
 * @arg {FilesUnlockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesLockFileBatchResult, Error.<FilesLockFileError>>}
 */
routes.filesUnlockFileBatch = function (arg) {
  return this.request('files/unlock_file_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Do not use this
 * to upload a file larger than 150 MB. Instead, create an upload session with
 * upload_session/start. Calls to this endpoint will count as data transport
 * calls for any Dropbox Business teams with a limit on the number of data
 * transport calls allowed per month. For more information, see the Data
 * transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUpload
 * @arg {FilesCommitInfo} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadError>>}
 */
routes.filesUpload = function (arg) {
  return this.request('files/upload', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. When the parameter close is set, this
 * call will close the session. A single request should not upload more than 150
 * MB. The maximum size of a file one can upload to an upload session is 350 GB.
 * Calls to this endpoint will count as data transport calls for any Dropbox
 * Business teams with a limit on the number of data transport calls allowed per
 * month. For more information, see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionAppendV2
 * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppendV2 = function (arg) {
  return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. A single request should not upload
 * more than 150 MB. The maximum size of a file one can upload to an upload
 * session is 350 GB. Calls to this endpoint will count as data transport calls
 * for any Dropbox Business teams with a limit on the number of data transport
 * calls allowed per month. For more information, see the Data transport limit
 * page https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionAppend
 * @deprecated
 * @arg {FilesUploadSessionCursor} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppend = function (arg) {
  return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
};

/**
 * Finish an upload session and save the uploaded data to the given file path. A
 * single request should not upload more than 150 MB. The maximum size of a file
 * one can upload to an upload session is 350 GB. Calls to this endpoint will
 * count as data transport calls for any Dropbox Business teams with a limit on
 * the number of data transport calls allowed per month. For more information,
 * see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionFinish
 * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadSessionFinishError>>}
 */
routes.filesUploadSessionFinish = function (arg) {
  return this.request('files/upload_session/finish', arg, 'user', 'content', 'upload');
};

/**
 * This route helps you commit many files at once into a user's Dropbox. Use
 * upload_session/start and upload_session/append_v2 to upload file contents. We
 * recommend uploading many files in parallel to increase throughput. Once the
 * file contents have been uploaded, rather than calling upload_session/finish,
 * use this route to finish all your upload sessions in a single request.
 * UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true
 * for the last upload_session/start or upload_session/append_v2 call. The
 * maximum size of a file one can upload to an upload session is 350 GB. This
 * route will return a job_id immediately and do the async commit job in
 * background. Use upload_session/finish_batch/check to check the job status.
 * For the same account, this route should be executed serially. That means you
 * should not start the next job before current job finishes. We allow up to
 * 1000 entries in a single request. Calls to this endpoint will count as data
 * transport calls for any Dropbox Business teams with a limit on the number of
 * data transport calls allowed per month. For more information, see the Data
 * transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionFinishBatch
 * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchLaunch, Error.<void>>}
 */
routes.filesUploadSessionFinishBatch = function (arg) {
  return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for upload_session/finish_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesUploadSessionFinishBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesUploadSessionFinishBatchCheck = function (arg) {
  return this.request('files/upload_session/finish_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Upload sessions allow you to upload a single file in one or more requests,
 * for example where the size of the file is greater than 150 MB.  This call
 * starts a new upload session with the given data. You can then use
 * upload_session/append_v2 to add more data and upload_session/finish to save
 * all the data to a file in Dropbox. A single request should not upload more
 * than 150 MB. The maximum size of a file one can upload to an upload session
 * is 350 GB. An upload session can be used for a maximum of 48 hours.
 * Attempting to use an UploadSessionStartResult.session_id with
 * upload_session/append_v2 or upload_session/finish more than 48 hours after
 * its creation will return a UploadSessionLookupError.not_found. Calls to this
 * endpoint will count as data transport calls for any Dropbox Business teams
 * with a limit on the number of data transport calls allowed per month. For
 * more information, see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionStart
 * @arg {FilesUploadSessionStartArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionStartResult, Error.<void>>}
 */
routes.filesUploadSessionStart = function (arg) {
  return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
};

/**
 * Marks the given Paper doc as archived. This action can be performed or undone
 * by anyone with edit permissions to the doc. Note that this endpoint will
 * continue to work for content created by users on the older version of Paper.
 * To check which version of Paper a user is on, use /users/features/get_values.
 * If the paper_as_files feature is enabled, then the user is running the new
 * version of Paper. This endpoint will be retired in September 2020. Refer to
 * the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsArchive
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsArchive = function (arg) {
  return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a new Paper doc with the provided content. Note that this endpoint
 * will continue to work for content created by users on the older version of
 * Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. This endpoint will be retired
 * in September 2020. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsCreate
 * @deprecated
 * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocCreateError>>}
 */
routes.paperDocsCreate = function (arg) {
  return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
};

/**
 * Exports and downloads Paper doc either as HTML or markdown. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsDownload
 * @deprecated
 * @arg {PaperPaperDocExport} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocExportResult, Error.<PaperDocLookupError>>}
 */
routes.paperDocsDownload = function (arg) {
  return this.request('paper/docs/download', arg, 'user', 'api', 'download');
};

/**
 * Lists the users who are explicitly invited to the Paper folder in which the
 * Paper doc is contained. For private folders all users (including owner)
 * shared on the folder are listed and for team folders all non-team users
 * shared on the folder are returned. Note that this endpoint will continue to
 * work for content created by users on the older version of Paper. To check
 * which version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsFolderUsersList
 * @deprecated
 * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsFolderUsersList = function (arg) {
  return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/folder_users/list, use this to
 * paginate through all users on the Paper folder. Note that this endpoint will
 * continue to work for content created by users on the older version of Paper.
 * To check which version of Paper a user is on, use /users/features/get_values.
 * If the paper_as_files feature is enabled, then the user is running the new
 * version of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsFolderUsersListContinue
 * @deprecated
 * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsFolderUsersListContinue = function (arg) {
  return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves folder information for the given Paper doc. This includes:   -
 * folder sharing policy; permissions for subfolders are set by the top-level
 * folder.   - full 'filepath', i.e. the list of folders (both folderId and
 * folderName) from     the root folder to the folder directly containing the
 * Paper doc.  If the Paper doc is not in any folder (aka unfiled) the response
 * will be empty. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsGetFolderInfo
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperFoldersContainingPaperDoc, Error.<PaperDocLookupError>>}
 */
routes.paperDocsGetFolderInfo = function (arg) {
  return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all Paper docs according to the argument specifications.
 * To iterate over through the full pagination, pass the cursor to
 * docs/list/continue. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsList
 * @deprecated
 * @arg {PaperListPaperDocsArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<void>>}
 */
routes.paperDocsList = function (arg) {
  return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/list, use this to paginate through
 * all Paper doc. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsListContinue
 * @deprecated
 * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<PaperListDocsCursorError>>}
 */
routes.paperDocsListContinue = function (arg) {
  return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently deletes the given Paper doc. This operation is final as the doc
 * cannot be recovered. This action can be performed only by the doc owner. Note
 * that this endpoint will continue to work for content created by users on the
 * older version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsPermanentlyDelete
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsPermanentlyDelete = function (arg) {
  return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * Gets the default sharing policy for the given Paper doc. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsSharingPolicyGet
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperSharingPolicy, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicyGet = function (arg) {
  return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
};

/**
 * Sets the default sharing policy for the given Paper doc. The default
 * 'team_sharing_policy' can be changed only by teams, omit this field for
 * personal accounts. The 'public_sharing_policy' policy can't be set to the
 * value 'disabled' because this setting can be changed only via the team admin
 * console. Note that this endpoint will continue to work for content created by
 * users on the older version of Paper. To check which version of Paper a user
 * is on, use /users/features/get_values. If the paper_as_files feature is
 * enabled, then the user is running the new version of Paper. Refer to the
 * Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsSharingPolicySet
 * @deprecated
 * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicySet = function (arg) {
  return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
};

/**
 * Updates an existing Paper doc with the provided content. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. This endpoint will be retired
 * in September 2020. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsUpdate
 * @deprecated
 * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocUpdateError>>}
 */
routes.paperDocsUpdate = function (arg) {
  return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
};

/**
 * Allows an owner or editor to add users to a Paper doc or change their
 * permissions using their email address or Dropbox account ID. The doc owner's
 * permissions cannot be changed. Note that this endpoint will continue to work
 * for content created by users on the older version of Paper. To check which
 * version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsUsersAdd
 * @deprecated
 * @arg {PaperAddPaperDocUser} arg - The request parameters.
 * @returns {Promise.<Array.<PaperAddPaperDocUserMemberResult>, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersAdd = function (arg) {
  return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
};

/**
 * Lists all users who visited the Paper doc or users with explicit access. This
 * call excludes users who have been removed. The list is sorted by the date of
 * the visit or the share date. The list will include both users, the explicitly
 * shared ones as well as those who came in using the Paper url link. Note that
 * this endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsUsersList
 * @deprecated
 * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersList = function (arg) {
  return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/users/list, use this to paginate
 * through all users on the Paper doc. Note that this endpoint will continue to
 * work for content created by users on the older version of Paper. To check
 * which version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsUsersListContinue
 * @deprecated
 * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsUsersListContinue = function (arg) {
  return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor to remove users from a Paper doc using their email
 * address or Dropbox account ID. The doc owner cannot be removed. Note that
 * this endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsUsersRemove
 * @deprecated
 * @arg {PaperRemovePaperDocUser} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersRemove = function (arg) {
  return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new Paper folder with the provided info. Note that this endpoint
 * will continue to work for content created by users on the older version of
 * Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperFoldersCreate
 * @deprecated
 * @arg {PaperPaperFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<PaperPaperFolderCreateResult, Error.<PaperPaperFolderCreateError>>}
 */
routes.paperFoldersCreate = function (arg) {
  return this.request('paper/folders/create', arg, 'user', 'api', 'rpc');
};

/**
 * Adds specified members to a file.
 * @function Dropbox#sharingAddFileMember
 * @arg {SharingAddFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<Array.<SharingFileMemberActionResult>, Error.<SharingAddFileMemberError>>}
 */
routes.sharingAddFileMember = function (arg) {
  return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to add another member. For the new member to get access to all the
 * functionality for this folder, you will need to call mount_folder on their
 * behalf.
 * @function Dropbox#sharingAddFolderMember
 * @arg {SharingAddFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingAddFolderMemberError>>}
 */
routes.sharingAddFolderMember = function (arg) {
  return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to update_file_member but with less information returned.
 * @function Dropbox#sharingChangeFileMemberAccess
 * @deprecated
 * @arg {SharingChangeFileMemberAccessArgs} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingChangeFileMemberAccess = function (arg) {
  return this.request('sharing/change_file_member_access', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job.
 * @function Dropbox#sharingCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckJobStatus = function (arg) {
  return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder.
 * @function Dropbox#sharingCheckRemoveMemberJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingRemoveMemberJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckRemoveMemberJobStatus = function (arg) {
  return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder.
 * @function Dropbox#sharingCheckShareJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckShareJobStatus = function (arg) {
  return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link. If a shared link already exists for the given path,
 * that link is returned. Note that in the returned PathLinkMetadata, the
 * PathLinkMetadata.url field is the shortened URL if
 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
 * technically possible to break a shared link by moving or renaming the
 * corresponding file or folder. In the future, this will no longer be the case,
 * so your app shouldn't rely on this behavior. Instead, if your app needs to
 * revoke a shared link, use revoke_shared_link.
 * @function Dropbox#sharingCreateSharedLink
 * @deprecated
 * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<SharingPathLinkMetadata, Error.<SharingCreateSharedLinkError>>}
 */
routes.sharingCreateSharedLink = function (arg) {
  return this.request('sharing/create_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link with custom settings. If no settings are given then the
 * default visibility is RequestedVisibility.public (The resolved visibility,
 * though, may depend on other aspects such as team and shared folder settings).
 * @function Dropbox#sharingCreateSharedLinkWithSettings
 * @arg {SharingCreateSharedLinkWithSettingsArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingCreateSharedLinkWithSettingsError>>}
 */
routes.sharingCreateSharedLinkWithSettings = function (arg) {
  return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadata
 * @arg {SharingGetFileMetadataArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMetadata, Error.<SharingGetFileMetadataError>>}
 */
routes.sharingGetFileMetadata = function (arg) {
  return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadataBatch
 * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingGetFileMetadataBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingGetFileMetadataBatch = function (arg) {
  return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder metadata by its folder ID.
 * @function Dropbox#sharingGetFolderMetadata
 * @arg {SharingGetMetadataArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingGetFolderMetadata = function (arg) {
  return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Download the shared link's file from a user's Dropbox.
 * @function Dropbox#sharingGetSharedLinkFile
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingGetSharedLinkFileError>>}
 */
routes.sharingGetSharedLinkFile = function (arg) {
  return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
};

/**
 * Get the shared link's metadata.
 * @function Dropbox#sharingGetSharedLinkMetadata
 * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingSharedLinkError>>}
 */
routes.sharingGetSharedLinkMetadata = function (arg) {
  return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of LinkMetadata objects for this user, including collection
 * links. If no path is given, returns a list of all shared links for the
 * current user, including collection links, up to a maximum of 1000 links. If a
 * non-empty path is given, returns a list of all shared links that allow access
 * to the given path.  Collection links are never returned in this case. Note
 * that the url field in the response is never the shortened URL.
 * @function Dropbox#sharingGetSharedLinks
 * @deprecated
 * @arg {SharingGetSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingGetSharedLinksResult, Error.<SharingGetSharedLinksError>>}
 */
routes.sharingGetSharedLinks = function (arg) {
  return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Use to obtain the members who have been invited to a file, both inherited and
 * uninherited members.
 * @function Dropbox#sharingListFileMembers
 * @arg {SharingListFileMembersArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersError>>}
 */
routes.sharingListFileMembers = function (arg) {
  return this.request('sharing/list_file_members', arg, 'user', 'api', 'rpc');
};

/**
 * Get members of multiple files at once. The arguments to this route are more
 * limited, and the limit on query result size per file is more strict. To
 * customize the results more, use the individual file endpoint. Inherited users
 * and groups are not included in the result, and permissions are not returned
 * for this endpoint.
 * @function Dropbox#sharingListFileMembersBatch
 * @arg {SharingListFileMembersBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingListFileMembersBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingListFileMembersBatch = function (arg) {
  return this.request('sharing/list_file_members/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_file_members or
 * list_file_members/batch, use this to paginate through all shared file
 * members.
 * @function Dropbox#sharingListFileMembersContinue
 * @arg {SharingListFileMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersContinueError>>}
 */
routes.sharingListFileMembersContinue = function (arg) {
  return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder membership by its folder ID.
 * @function Dropbox#sharingListFolderMembers
 * @arg {SharingListFolderMembersArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingListFolderMembers = function (arg) {
  return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder_members, use this to
 * paginate through all shared folder members.
 * @function Dropbox#sharingListFolderMembersContinue
 * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingListFolderMembersContinueError>>}
 */
routes.sharingListFolderMembersContinue = function (arg) {
  return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user has access to.
 * @function Dropbox#sharingListFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListFolders = function (arg) {
  return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folders, use this to paginate
 * through all shared folders. The cursor must come from a previous call to
 * list_folders or list_folders/continue.
 * @function Dropbox#sharingListFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListFoldersContinue = function (arg) {
  return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user can mount or unmount.
 * @function Dropbox#sharingListMountableFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListMountableFolders = function (arg) {
  return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_mountable_folders, use this to
 * paginate through all mountable shared folders. The cursor must come from a
 * previous call to list_mountable_folders or list_mountable_folders/continue.
 * @function Dropbox#sharingListMountableFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListMountableFoldersContinue = function (arg) {
  return this.request('sharing/list_mountable_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of all files shared with current user.  Does not include files
 * the user has received via shared folders, and does  not include unclaimed
 * invitations.
 * @function Dropbox#sharingListReceivedFiles
 * @arg {SharingListFilesArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingSharingUserError>>}
 */
routes.sharingListReceivedFiles = function (arg) {
  return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
};

/**
 * Get more results with a cursor from list_received_files.
 * @function Dropbox#sharingListReceivedFilesContinue
 * @arg {SharingListFilesContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingListFilesContinueError>>}
 */
routes.sharingListReceivedFilesContinue = function (arg) {
  return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
};

/**
 * List shared links of this user. If no path is given, returns a list of all
 * shared links for the current user. If a non-empty path is given, returns a
 * list of all shared links that allow access to the given path - direct links
 * to the given path and links to parent folders of the given path. Links to
 * parent folders can be suppressed by setting direct_only to true.
 * @function Dropbox#sharingListSharedLinks
 * @arg {SharingListSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingListSharedLinksResult, Error.<SharingListSharedLinksError>>}
 */
routes.sharingListSharedLinks = function (arg) {
  return this.request('sharing/list_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Modify the shared link's settings. If the requested visibility conflict with
 * the shared links policy of the team or the shared folder (in case the linked
 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
 * of the returned SharedLinkMetadata will reflect the actual visibility of the
 * shared link and the LinkPermissions.requested_visibility will reflect the
 * requested visibility.
 * @function Dropbox#sharingModifySharedLinkSettings
 * @arg {SharingModifySharedLinkSettingsArgs} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingModifySharedLinkSettingsError>>}
 */
routes.sharingModifySharedLinkSettings = function (arg) {
  return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
};

/**
 * The current user mounts the designated folder. Mount a shared folder for a
 * user after they have been added as a member. Once mounted, the shared folder
 * will appear in their Dropbox.
 * @function Dropbox#sharingMountFolder
 * @arg {SharingMountFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingMountFolderError>>}
 */
routes.sharingMountFolder = function (arg) {
  return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated file. Note
 * that the current user may still have inherited access to this file through
 * the parent folder.
 * @function Dropbox#sharingRelinquishFileMembership
 * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRelinquishFileMembershipError>>}
 */
routes.sharingRelinquishFileMembership = function (arg) {
  return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated shared
 * folder and will no longer have access to the folder.  A folder owner cannot
 * relinquish membership in their own folder. This will run synchronously if
 * leave_a_copy is false, and asynchronously if leave_a_copy is true.
 * @function Dropbox#sharingRelinquishFolderMembership
 * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingRelinquishFolderMembershipError>>}
 */
routes.sharingRelinquishFolderMembership = function (arg) {
  return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to remove_file_member_2 but with less information returned.
 * @function Dropbox#sharingRemoveFileMember
 * @deprecated
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionIndividualResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember = function (arg) {
  return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Removes a specified member from the file.
 * @function Dropbox#sharingRemoveFileMember2
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberRemoveActionResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember2 = function (arg) {
  return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to remove another member.
 * @function Dropbox#sharingRemoveFolderMember
 * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchResultBase, Error.<SharingRemoveFolderMemberError>>}
 */
routes.sharingRemoveFolderMember = function (arg) {
  return this.request('sharing/remove_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Revoke a shared link. Note that even after revoking a shared link to a file,
 * the file may be accessible if there are shared links leading to any of the
 * file parent folders. To list all shared links that enable access to a
 * specific file, you can use the list_shared_links with the file as the
 * ListSharedLinksArg.path argument.
 * @function Dropbox#sharingRevokeSharedLink
 * @arg {SharingRevokeSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRevokeSharedLinkError>>}
 */
routes.sharingRevokeSharedLink = function (arg) {
  return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Change the inheritance policy of an existing Shared Folder. Only permitted
 * for shared folders in a shared team root. If a ShareFolderLaunch.async_job_id
 * is returned, you'll need to call check_share_job_status until the action
 * completes to get the metadata for the folder.
 * @function Dropbox#sharingSetAccessInheritance
 * @arg {SharingSetAccessInheritanceArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderLaunch, Error.<SharingSetAccessInheritanceError>>}
 */
routes.sharingSetAccessInheritance = function (arg) {
  return this.request('sharing/set_access_inheritance', arg, 'user', 'api', 'rpc');
};

/**
 * Share a folder with collaborators. Most sharing will be completed
 * synchronously. Large folders will be completed asynchronously. To make
 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
 * ShareFolderLaunch.async_job_id is returned, you'll need to call
 * check_share_job_status until the action completes to get the metadata for the
 * folder.
 * @function Dropbox#sharingShareFolder
 * @arg {SharingShareFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderLaunch, Error.<SharingShareFolderError>>}
 */
routes.sharingShareFolder = function (arg) {
  return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Transfer ownership of a shared folder to a member of the shared folder. User
 * must have AccessLevel.owner access to the shared folder to perform a
 * transfer.
 * @function Dropbox#sharingTransferFolder
 * @arg {SharingTransferFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingTransferFolderError>>}
 */
routes.sharingTransferFolder = function (arg) {
  return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user unmounts the designated folder. They can re-mount the folder
 * at a later time using mount_folder.
 * @function Dropbox#sharingUnmountFolder
 * @arg {SharingUnmountFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnmountFolderError>>}
 */
routes.sharingUnmountFolder = function (arg) {
  return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Remove all members from this file. Does not remove inherited members.
 * @function Dropbox#sharingUnshareFile
 * @arg {SharingUnshareFileArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnshareFileError>>}
 */
routes.sharingUnshareFile = function (arg) {
  return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
};

/**
 * Allows a shared folder owner to unshare the folder. You'll need to call
 * check_job_status to determine if the action has completed successfully.
 * @function Dropbox#sharingUnshareFolder
 * @arg {SharingUnshareFolderArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingUnshareFolderError>>}
 */
routes.sharingUnshareFolder = function (arg) {
  return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Changes a member's access on a shared file.
 * @function Dropbox#sharingUpdateFileMember
 * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingUpdateFileMember = function (arg) {
  return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor of a shared folder to update another member's
 * permissions.
 * @function Dropbox#sharingUpdateFolderMember
 * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingUpdateFolderMemberError>>}
 */
routes.sharingUpdateFolderMember = function (arg) {
  return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Update the sharing policies for a shared folder. User must have
 * AccessLevel.owner access to the shared folder to update its policies.
 * @function Dropbox#sharingUpdateFolderPolicy
 * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingUpdateFolderPolicyError>>}
 */
routes.sharingUpdateFolderPolicy = function (arg) {
  return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves team events. If the result's GetTeamEventsResult.has_more field is
 * true, call get_events/continue with the returned cursor to retrieve more
 * entries. If end_time is not specified in your request, you may use the
 * returned cursor to poll get_events/continue for new events. Many attributes
 * note 'may be missing due to historical data gap'. Note that the
 * file_operations category and & analogous paper events are not available on
 * all Dropbox Business plans /business/plans-comparison. Use
 * features/get_values
 * /developers/documentation/http/teams#team-features-get_values to check for
 * this feature. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEvents
 * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsError>>}
 */
routes.teamLogGetEvents = function (arg) {
  return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from get_events, use this to paginate
 * through all events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEventsContinue
 * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsContinueError>>}
 */
routes.teamLogGetEventsContinue = function (arg) {
  return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Get a list of feature values that may be configured for the current account.
 * @function Dropbox#usersFeaturesGetValues
 * @arg {UsersUserFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<UsersUserFeaturesGetValuesBatchResult, Error.<UsersUserFeaturesGetValuesBatchError>>}
 */
routes.usersFeaturesGetValues = function (arg) {
  return this.request('users/features/get_values', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about a user's account.
 * @function Dropbox#usersGetAccount
 * @arg {UsersGetAccountArg} arg - The request parameters.
 * @returns {Promise.<UsersBasicAccount, Error.<UsersGetAccountError>>}
 */
routes.usersGetAccount = function (arg) {
  return this.request('users/get_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about multiple user accounts.  At most 300 accounts may be
 * queried per request.
 * @function Dropbox#usersGetAccountBatch
 * @arg {UsersGetAccountBatchArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<UsersGetAccountBatchError>>}
 */
routes.usersGetAccountBatch = function (arg) {
  return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about the current user's account.
 * @function Dropbox#usersGetCurrentAccount
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersFullAccount, Error.<void>>}
 */
routes.usersGetCurrentAccount = function (arg) {
  return this.request('users/get_current_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get the space usage information for the current user's account.
 * @function Dropbox#usersGetSpaceUsage
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersSpaceUsage, Error.<void>>}
 */
routes.usersGetSpaceUsage = function (arg) {
  return this.request('users/get_space_usage', arg, 'user', 'api', 'rpc');
};

exports.routes = routes;

/***/ }),

/***/ 413:
/***/ (function(module) {

module.exports = require("stream");

/***/ }),

/***/ 417:
/***/ (function(module) {

module.exports = require("crypto");

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(413));
var http = _interopDefault(__webpack_require__(605));
var Url = _interopDefault(__webpack_require__(835));
var https = _interopDefault(__webpack_require__(211));
var zlib = _interopDefault(__webpack_require__(761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(18).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 457:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Auto-generated by Stone, do not modify.
var routes = {};

/**
 * List all device sessions of a team's member.
 * @function DropboxTeam#teamDevicesListMemberDevices
 * @arg {TeamListMemberDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberDevicesResult, Error.<TeamListMemberDevicesError>>}
 */
routes.teamDevicesListMemberDevices = function (arg) {
  return this.request('team/devices/list_member_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team. Permission : Team member file access.
 * @function DropboxTeam#teamDevicesListMembersDevices
 * @arg {TeamListMembersDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersDevicesResult, Error.<TeamListMembersDevicesError>>}
 */
routes.teamDevicesListMembersDevices = function (arg) {
  return this.request('team/devices/list_members_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team. Permission : Team member file access.
 * @function DropboxTeam#teamDevicesListTeamDevices
 * @deprecated
 * @arg {TeamListTeamDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamDevicesResult, Error.<TeamListTeamDevicesError>>}
 */
routes.teamDevicesListTeamDevices = function (arg) {
  return this.request('team/devices/list_team_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a device session of a team's member.
 * @function DropboxTeam#teamDevicesRevokeDeviceSession
 * @arg {TeamRevokeDeviceSessionArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeDeviceSessionError>>}
 */
routes.teamDevicesRevokeDeviceSession = function (arg) {
  return this.request('team/devices/revoke_device_session', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of device sessions of team members.
 * @function DropboxTeam#teamDevicesRevokeDeviceSessionBatch
 * @arg {TeamRevokeDeviceSessionBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeDeviceSessionBatchResult, Error.<TeamRevokeDeviceSessionBatchError>>}
 */
routes.teamDevicesRevokeDeviceSessionBatch = function (arg) {
  return this.request('team/devices/revoke_device_session_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Get the values for one or more featues. This route allows you to check your
 * account's capability for what feature you can access or what value you have
 * for certain features. Permission : Team information.
 * @function DropboxTeam#teamFeaturesGetValues
 * @arg {TeamFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamFeaturesGetValuesBatchResult, Error.<TeamFeaturesGetValuesBatchError>>}
 */
routes.teamFeaturesGetValues = function (arg) {
  return this.request('team/features/get_values', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about a team.
 * @function DropboxTeam#teamGetInfo
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTeamGetInfoResult, Error.<void>>}
 */
routes.teamGetInfo = function (arg) {
  return this.request('team/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, empty group, with a requested name. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsCreate
 * @arg {TeamGroupCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupCreateError>>}
 */
routes.teamGroupsCreate = function (arg) {
  return this.request('team/groups/create', arg, 'team', 'api', 'rpc');
};

/**
 * Deletes a group. The group is deleted immediately. However the revoking of
 * group-owned resources may take additional time. Use the groups/job_status/get
 * to determine whether this process has completed. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsDelete
 * @arg {TeamGroupSelector} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamGroupDeleteError>>}
 */
routes.teamGroupsDelete = function (arg) {
  return this.request('team/groups/delete', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about one or more groups. Note that the optional field
 * GroupFullInfo.members is not returned for system-managed groups. Permission :
 * Team Information.
 * @function DropboxTeam#teamGroupsGetInfo
 * @arg {TeamGroupsSelector} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupsGetInfoError>>}
 */
routes.teamGroupsGetInfo = function (arg) {
  return this.request('team/groups/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from groups/delete, groups/members/add , or
 * groups/members/remove use this method to poll the status of granting/revoking
 * group members' access to group-owned resources. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<TeamGroupsPollError>>}
 */
routes.teamGroupsJobStatusGet = function (arg) {
  return this.request('team/groups/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Lists groups on a team. Permission : Team Information.
 * @function DropboxTeam#teamGroupsList
 * @arg {TeamGroupsListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<void>>}
 */
routes.teamGroupsList = function (arg) {
  return this.request('team/groups/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/list, use this to paginate
 * through all groups. Permission : Team Information.
 * @function DropboxTeam#teamGroupsListContinue
 * @arg {TeamGroupsListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<TeamGroupsListContinueError>>}
 */
routes.teamGroupsListContinue = function (arg) {
  return this.request('team/groups/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a group. The members are added immediately. However the
 * granting of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed.
 * Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersAdd
 * @arg {TeamGroupMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersAddError>>}
 */
routes.teamGroupsMembersAdd = function (arg) {
  return this.request('team/groups/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a group. Permission : Team Information.
 * @function DropboxTeam#teamGroupsMembersList
 * @arg {TeamGroupsMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupSelectorError>>}
 */
routes.teamGroupsMembersList = function (arg) {
  return this.request('team/groups/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/members/list, use this to
 * paginate through all members of the group. Permission : Team information.
 * @function DropboxTeam#teamGroupsMembersListContinue
 * @arg {TeamGroupsMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupsMembersListContinueError>>}
 */
routes.teamGroupsMembersListContinue = function (arg) {
  return this.request('team/groups/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Removes members from a group. The members are removed immediately. However
 * the revoking of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed. This
 * method permits removing the only owner of a group, even in cases where this
 * is not possible via the web client. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersRemove
 * @arg {TeamGroupMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersRemoveError>>}
 */
routes.teamGroupsMembersRemove = function (arg) {
  return this.request('team/groups/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Sets a member's access type in a group. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersSetAccessType
 * @arg {TeamGroupMembersSetAccessTypeArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupMemberSetAccessTypeError>>}
 */
routes.teamGroupsMembersSetAccessType = function (arg) {
  return this.request('team/groups/members/set_access_type', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a group's name and/or external ID. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsUpdate
 * @arg {TeamGroupUpdateArgs} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupUpdateError>>}
 */
routes.teamGroupsUpdate = function (arg) {
  return this.request('team/groups/update', arg, 'team', 'api', 'rpc');
};

/**
 * Creates new legal hold policy. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsCreatePolicy
 * @arg {TeamLegalHoldsPolicyCreateArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamLegalHoldsPolicyCreateError>>}
 */
routes.teamLegalHoldsCreatePolicy = function (arg) {
  return this.request('team/legal_holds/create_policy', arg, 'team', 'api', 'rpc');
};

/**
 * Gets a legal hold by Id. Note: Legal Holds is a paid add-on. Not all teams
 * have the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsGetPolicy
 * @arg {TeamLegalHoldsGetPolicyArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamLegalHoldsGetPolicyError>>}
 */
routes.teamLegalHoldsGetPolicy = function (arg) {
  return this.request('team/legal_holds/get_policy', arg, 'team', 'api', 'rpc');
};

/**
 * List the file metadata that's under the hold. Note: Legal Holds is a paid
 * add-on. Not all teams have the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsListHeldRevisions
 * @arg {TeamLegalHoldsListHeldRevisionsArg} arg - The request parameters.
 * @returns {Promise.<TeamLegalHoldsListHeldRevisionResult, Error.<TeamLegalHoldsListHeldRevisionsError>>}
 */
routes.teamLegalHoldsListHeldRevisions = function (arg) {
  return this.request('team/legal_holds/list_held_revisions', arg, 'team', 'api', 'rpc');
};

/**
 * Continue listing the file metadata that's under the hold. Note: Legal Holds
 * is a paid add-on. Not all teams have the feature. Permission : Team member
 * file access.
 * @function DropboxTeam#teamLegalHoldsListHeldRevisionsContinue
 * @arg {TeamLegalHoldsListHeldRevisionsContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamLegalHoldsListHeldRevisionResult, Error.<TeamLegalHoldsListHeldRevisionsError>>}
 */
routes.teamLegalHoldsListHeldRevisionsContinue = function (arg) {
  return this.request('team/legal_holds/list_held_revisions_continue', arg, 'team', 'api', 'rpc');
};

/**
 * Lists legal holds on a team. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsListPolicies
 * @arg {TeamLegalHoldsListPoliciesArg} arg - The request parameters.
 * @returns {Promise.<TeamLegalHoldsListPoliciesResult, Error.<TeamLegalHoldsListPoliciesError>>}
 */
routes.teamLegalHoldsListPolicies = function (arg) {
  return this.request('team/legal_holds/list_policies', arg, 'team', 'api', 'rpc');
};

/**
 * Releases a legal hold by Id. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsReleasePolicy
 * @arg {TeamLegalHoldsPolicyReleaseArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamLegalHoldsPolicyReleaseError>>}
 */
routes.teamLegalHoldsReleasePolicy = function (arg) {
  return this.request('team/legal_holds/release_policy', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a legal hold. Note: Legal Holds is a paid add-on. Not all teams have
 * the feature. Permission : Team member file access.
 * @function DropboxTeam#teamLegalHoldsUpdatePolicy
 * @arg {TeamLegalHoldsPolicyUpdateArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamLegalHoldsPolicyUpdateError>>}
 */
routes.teamLegalHoldsUpdatePolicy = function (arg) {
  return this.request('team/legal_holds/update_policy', arg, 'team', 'api', 'rpc');
};

/**
 * List all linked applications of the team member. Note, this endpoint does not
 * list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMemberLinkedApps
 * @arg {TeamListMemberAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberAppsResult, Error.<TeamListMemberAppsError>>}
 */
routes.teamLinkedAppsListMemberLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_member_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint does not list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMembersLinkedApps
 * @arg {TeamListMembersAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersAppsResult, Error.<TeamListMembersAppsError>>}
 */
routes.teamLinkedAppsListMembersLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_members_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint doesn't list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListTeamLinkedApps
 * @deprecated
 * @arg {TeamListTeamAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamAppsResult, Error.<TeamListTeamAppsError>>}
 */
routes.teamLinkedAppsListTeamLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_team_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a linked application of the team member.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedApp
 * @arg {TeamRevokeLinkedApiAppArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeLinkedAppError>>}
 */
routes.teamLinkedAppsRevokeLinkedApp = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of linked applications of the team members.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedAppBatch
 * @arg {TeamRevokeLinkedApiAppBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeLinkedAppBatchResult, Error.<TeamRevokeLinkedAppBatchError>>}
 */
routes.teamLinkedAppsRevokeLinkedAppBatch = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Add users to member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersAdd
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes.teamMemberSpaceLimitsExcludedUsersAdd = function (arg) {
  return this.request('team/member_space_limits/excluded_users/add', arg, 'team', 'api', 'rpc');
};

/**
 * List member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersList
 * @arg {TeamExcludedUsersListArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListError>>}
 */
routes.teamMemberSpaceLimitsExcludedUsersList = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list', arg, 'team', 'api', 'rpc');
};

/**
 * Continue listing member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersListContinue
 * @arg {TeamExcludedUsersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListContinueError>>}
 */
routes.teamMemberSpaceLimitsExcludedUsersListContinue = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users from member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersRemove
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes.teamMemberSpaceLimitsExcludedUsersRemove = function (arg) {
  return this.request('team/member_space_limits/excluded_users/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Get users custom quota. Returns none as the custom quota if none was set. A
 * maximum of 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsGetCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes.teamMemberSpaceLimitsGetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/get_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users custom quota. A maximum of 1000 members can be specified in a
 * single call.
 * @function DropboxTeam#teamMemberSpaceLimitsRemoveCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamRemoveCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes.teamMemberSpaceLimitsRemoveCustomQuota = function (arg) {
  return this.request('team/member_space_limits/remove_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Set users custom quota. Custom quota has to be at least 15GB. A maximum of
 * 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsSetCustomQuota
 * @arg {TeamSetCustomQuotaArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamSetCustomQuotaError>>}
 */
routes.teamMemberSpaceLimitsSetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/set_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a team. Permission : Team member management A maximum of 20
 * members can be specified in a single call. If no Dropbox account exists with
 * the email address specified, a new Dropbox account will be created with the
 * given email address, and that account will be invited to the team. If a
 * personal Dropbox account exists with the email address specified in the call,
 * this call will create a placeholder Dropbox account for the user on the team
 * and send an email inviting the user to migrate their existing personal
 * account onto the team. Team member management apps are required to set an
 * initial given_name and surname for a user to use in the team invitation and
 * for 'Perform as team member' actions taken on the user before they become
 * 'active'.
 * @function DropboxTeam#teamMembersAdd
 * @arg {TeamMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddLaunch, Error.<void>>}
 */
routes.teamMembersAdd = function (arg) {
  return this.request('team/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/add , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersAddJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddJobStatus, Error.<AsyncPollError>>}
 */
routes.teamMembersAddJobStatusGet = function (arg) {
  return this.request('team/members/add/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Deletes a team member's profile photo. Permission : Team member management.
 * @function DropboxTeam#teamMembersDeleteProfilePhoto
 * @arg {TeamMembersDeleteProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamMemberInfo, Error.<TeamMembersDeleteProfilePhotoError>>}
 */
routes.teamMembersDeleteProfilePhoto = function (arg) {
  return this.request('team/members/delete_profile_photo', arg, 'team', 'api', 'rpc');
};

/**
 * Returns information about multiple team members. Permission : Team
 * information This endpoint will return MembersGetInfoItem.id_not_found, for
 * IDs (or emails) that cannot be matched to a valid team member.
 * @function DropboxTeam#teamMembersGetInfo
 * @arg {TeamMembersGetInfoArgs} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamMembersGetInfoError>>}
 */
routes.teamMembersGetInfo = function (arg) {
  return this.request('team/members/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a team. Permission : Team information.
 * @function DropboxTeam#teamMembersList
 * @arg {TeamMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListError>>}
 */
routes.teamMembersList = function (arg) {
  return this.request('team/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from members/list, use this to paginate
 * through all team members. Permission : Team information.
 * @function DropboxTeam#teamMembersListContinue
 * @arg {TeamMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListContinueError>>}
 */
routes.teamMembersListContinue = function (arg) {
  return this.request('team/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Moves removed member's files to a different member. This endpoint initiates
 * an asynchronous job. To obtain the final result of the job, the client should
 * periodically poll members/move_former_member_files/job_status/check.
 * Permission : Team member management.
 * @function DropboxTeam#teamMembersMoveFormerMemberFiles
 * @arg {TeamMembersDataTransferArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamMembersTransferFormerMembersFilesError>>}
 */
routes.teamMembersMoveFormerMemberFiles = function (arg) {
  return this.request('team/members/move_former_member_files', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/move_former_member_files , use
 * this to poll the status of the asynchronous request. Permission : Team member
 * management.
 * @function DropboxTeam#teamMembersMoveFormerMemberFilesJobStatusCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<AsyncPollError>>}
 */
routes.teamMembersMoveFormerMemberFilesJobStatusCheck = function (arg) {
  return this.request('team/members/move_former_member_files/job_status/check', arg, 'team', 'api', 'rpc');
};

/**
 * Recover a deleted member. Permission : Team member management Exactly one of
 * team_member_id, email, or external_id must be provided to identify the user
 * account.
 * @function DropboxTeam#teamMembersRecover
 * @arg {TeamMembersRecoverArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersRecoverError>>}
 */
routes.teamMembersRecover = function (arg) {
  return this.request('team/members/recover', arg, 'team', 'api', 'rpc');
};

/**
 * Removes a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account. Accounts can be recovered via members/recover for a 7 day
 * period or until the account has been permanently deleted or transferred to
 * another account (whichever comes first). Calling members/add while a user is
 * still recoverable on your team will return with
 * MemberAddResult.user_already_on_team. Accounts can have their files
 * transferred via the admin console for a limited time, based on the version
 * history length associated with the team (180 days for most teams). This
 * endpoint may initiate an asynchronous job. To obtain the final result of the
 * job, the client should periodically poll members/remove/job_status/get.
 * @function DropboxTeam#teamMembersRemove
 * @arg {TeamMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamMembersRemoveError>>}
 */
routes.teamMembersRemove = function (arg) {
  return this.request('team/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/remove , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersRemoveJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<AsyncPollError>>}
 */
routes.teamMembersRemoveJobStatusGet = function (arg) {
  return this.request('team/members/remove/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Add secondary emails to users. Permission : Team member management. Emails
 * that are on verified domains will be verified automatically. For each email
 * address not on a verified domain a verification email will be sent.
 * @function DropboxTeam#teamMembersSecondaryEmailsAdd
 * @arg {TeamAddSecondaryEmailsArg} arg - The request parameters.
 * @returns {Promise.<TeamAddSecondaryEmailsResult, Error.<TeamAddSecondaryEmailsError>>}
 */
routes.teamMembersSecondaryEmailsAdd = function (arg) {
  return this.request('team/members/secondary_emails/add', arg, 'team', 'api', 'rpc');
};

/**
 * Delete secondary emails from users Permission : Team member management. Users
 * will be notified of deletions of verified secondary emails at both the
 * secondary email and their primary email.
 * @function DropboxTeam#teamMembersSecondaryEmailsDelete
 * @arg {TeamDeleteSecondaryEmailsArg} arg - The request parameters.
 * @returns {Promise.<TeamDeleteSecondaryEmailsResult, Error.<void>>}
 */
routes.teamMembersSecondaryEmailsDelete = function (arg) {
  return this.request('team/members/secondary_emails/delete', arg, 'team', 'api', 'rpc');
};

/**
 * Resend secondary email verification emails. Permission : Team member
 * management.
 * @function DropboxTeam#teamMembersSecondaryEmailsResendVerificationEmails
 * @arg {TeamResendVerificationEmailArg} arg - The request parameters.
 * @returns {Promise.<TeamResendVerificationEmailResult, Error.<void>>}
 */
routes.teamMembersSecondaryEmailsResendVerificationEmails = function (arg) {
  return this.request('team/members/secondary_emails/resend_verification_emails', arg, 'team', 'api', 'rpc');
};

/**
 * Sends welcome email to pending team member. Permission : Team member
 * management Exactly one of team_member_id, email, or external_id must be
 * provided to identify the user account. No-op if team member is not pending.
 * @function DropboxTeam#teamMembersSendWelcomeEmail
 * @arg {TeamUserSelectorArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSendWelcomeError>>}
 */
routes.teamMembersSendWelcomeEmail = function (arg) {
  return this.request('team/members/send_welcome_email', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's permissions. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetAdminPermissions
 * @arg {TeamMembersSetPermissionsArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersSetPermissionsResult, Error.<TeamMembersSetPermissionsError>>}
 */
routes.teamMembersSetAdminPermissions = function (arg) {
  return this.request('team/members/set_admin_permissions', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's profile. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetProfile
 * @arg {TeamMembersSetProfileArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamMemberInfo, Error.<TeamMembersSetProfileError>>}
 */
routes.teamMembersSetProfile = function (arg) {
  return this.request('team/members/set_profile', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's profile photo. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetProfilePhoto
 * @arg {TeamMembersSetProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamMemberInfo, Error.<TeamMembersSetProfilePhotoError>>}
 */
routes.teamMembersSetProfilePhoto = function (arg) {
  return this.request('team/members/set_profile_photo', arg, 'team', 'api', 'rpc');
};

/**
 * Suspend a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersSuspend
 * @arg {TeamMembersDeactivateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSuspendError>>}
 */
routes.teamMembersSuspend = function (arg) {
  return this.request('team/members/suspend', arg, 'team', 'api', 'rpc');
};

/**
 * Unsuspend a member from a team. Permission : Team member management Exactly
 * one of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersUnsuspend
 * @arg {TeamMembersUnsuspendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersUnsuspendError>>}
 */
routes.teamMembersUnsuspend = function (arg) {
  return this.request('team/members/unsuspend', arg, 'team', 'api', 'rpc');
};

/**
 * Returns a list of all team-accessible namespaces. This list includes team
 * folders, shared folders containing team members, team members' home
 * namespaces, and team members' app folders. Home namespaces and app folders
 * are always owned by this team or members of the team, but shared folders may
 * be owned by other users or other teams. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesList
 * @arg {TeamTeamNamespacesListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<TeamTeamNamespacesListError>>}
 */
routes.teamNamespacesList = function (arg) {
  return this.request('team/namespaces/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from namespaces/list, use this to paginate
 * through all team-accessible namespaces. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesListContinue
 * @arg {TeamTeamNamespacesListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<TeamTeamNamespacesListContinueError>>}
 */
routes.teamNamespacesListContinue = function (arg) {
  return this.request('team/namespaces/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Permission : Team member file access.
 * @function DropboxTeam#teamPropertiesTemplateAdd
 * @deprecated
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.teamPropertiesTemplateAdd = function (arg) {
  return this.request('team/properties/template/add', arg, 'team', 'api', 'rpc');
};

/**
 * Permission : Team member file access.
 * @function DropboxTeam#teamPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.teamPropertiesTemplateGet = function (arg) {
  return this.request('team/properties/template/get', arg, 'team', 'api', 'rpc');
};

/**
 * Permission : Team member file access.
 * @function DropboxTeam#teamPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.teamPropertiesTemplateList = function (arg) {
  return this.request('team/properties/template/list', arg, 'team', 'api', 'rpc');
};

/**
 * Permission : Team member file access.
 * @function DropboxTeam#teamPropertiesTemplateUpdate
 * @deprecated
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.teamPropertiesTemplateUpdate = function (arg) {
  return this.request('team/properties/template/update', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's user activity.
 * @function DropboxTeam#teamReportsGetActivity
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetActivityReport, Error.<TeamDateRangeError>>}
 */
routes.teamReportsGetActivity = function (arg) {
  return this.request('team/reports/get_activity', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's linked devices.
 * @function DropboxTeam#teamReportsGetDevices
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetDevicesReport, Error.<TeamDateRangeError>>}
 */
routes.teamReportsGetDevices = function (arg) {
  return this.request('team/reports/get_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's membership.
 * @function DropboxTeam#teamReportsGetMembership
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetMembershipReport, Error.<TeamDateRangeError>>}
 */
routes.teamReportsGetMembership = function (arg) {
  return this.request('team/reports/get_membership', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's storage usage.
 * @function DropboxTeam#teamReportsGetStorage
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetStorageReport, Error.<TeamDateRangeError>>}
 */
routes.teamReportsGetStorage = function (arg) {
  return this.request('team/reports/get_storage', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an archived team folder's status to active. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderActivate
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderActivateError>>}
 */
routes.teamTeamFolderActivate = function (arg) {
  return this.request('team/team_folder/activate', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an active team folder's status to archived and removes all folder and
 * file members. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchive
 * @arg {TeamTeamFolderArchiveArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveLaunch, Error.<TeamTeamFolderArchiveError>>}
 */
routes.teamTeamFolderArchive = function (arg) {
  return this.request('team/team_folder/archive', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for archiving a team folder.
 * Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchiveCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveJobStatus, Error.<AsyncPollError>>}
 */
routes.teamTeamFolderArchiveCheck = function (arg) {
  return this.request('team/team_folder/archive/check', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, active, team folder with no members. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderCreate
 * @arg {TeamTeamFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderCreateError>>}
 */
routes.teamTeamFolderCreate = function (arg) {
  return this.request('team/team_folder/create', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves metadata for team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderGetInfo
 * @arg {TeamTeamFolderIdListArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamTeamFolderGetInfoItem>, Error.<void>>}
 */
routes.teamTeamFolderGetInfo = function (arg) {
  return this.request('team/team_folder/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderList
 * @arg {TeamTeamFolderListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListError>>}
 */
routes.teamTeamFolderList = function (arg) {
  return this.request('team/team_folder/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from team_folder/list, use this to paginate
 * through all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderListContinue
 * @arg {TeamTeamFolderListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListContinueError>>}
 */
routes.teamTeamFolderListContinue = function (arg) {
  return this.request('team/team_folder/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently deletes an archived team folder. Permission : Team member file
 * access.
 * @function DropboxTeam#teamTeamFolderPermanentlyDelete
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamTeamFolderPermanentlyDeleteError>>}
 */
routes.teamTeamFolderPermanentlyDelete = function (arg) {
  return this.request('team/team_folder/permanently_delete', arg, 'team', 'api', 'rpc');
};

/**
 * Changes an active team folder's name. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderRename
 * @arg {TeamTeamFolderRenameArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderRenameError>>}
 */
routes.teamTeamFolderRename = function (arg) {
  return this.request('team/team_folder/rename', arg, 'team', 'api', 'rpc');
};

/**
 * Updates the sync settings on a team folder or its contents.  Use of this
 * endpoint requires that the team has team selective sync enabled.
 * @function DropboxTeam#teamTeamFolderUpdateSyncSettings
 * @arg {TeamTeamFolderUpdateSyncSettingsArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderUpdateSyncSettingsError>>}
 */
routes.teamTeamFolderUpdateSyncSettings = function (arg) {
  return this.request('team/team_folder/update_sync_settings', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the member profile of the admin who generated the team access token
 * used to make the call.
 * @function DropboxTeam#teamTokenGetAuthenticatedAdmin
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTokenGetAuthenticatedAdminResult, Error.<TeamTokenGetAuthenticatedAdminError>>}
 */
routes.teamTokenGetAuthenticatedAdmin = function (arg) {
  return this.request('team/token/get_authenticated_admin', arg, 'team', 'api', 'rpc');
};

exports.routes = routes;

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 602:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const dropbox_1 = __webpack_require__(297);
const node_fetch_1 = __importDefault(__webpack_require__(454));
async function upload(path, contents, accessToken) {
    const dropbox = new dropbox_1.Dropbox({ accessToken, fetch: node_fetch_1.default });
    await dropbox.filesUpload({ path, contents });
}
exports.upload = upload;


/***/ }),

/***/ 604:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.uploadRequest = uploadRequest;

var _utils = __webpack_require__(204);

function parseBodyToType(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

function uploadRequest(fetch) {
  return function uploadRequestWithFetch(path, args, auth, host, client, options) {
    return client.checkAndRefreshAccessToken().then(function () {
      if (auth !== 'user') {
        throw new Error('Unexpected auth type: ' + auth);
      }

      var contents = args.contents;

      delete args.contents;

      var fetchOptions = {
        body: contents,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + client.getAccessToken(),
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': (0, _utils.httpHeaderSafeJson)(args)
        }
      };

      if (options) {
        if (options.selectUser) {
          fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
        }
        if (options.selectAdmin) {
          fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
        }
        if (options.pathRoot) {
          fetchOptions.headers['Dropbox-API-Path-Root'] = options.pathRoot;
        }
      }

      return fetchOptions;
    }).then(function (fetchOptions) {
      return fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
    }).then(function (res) {
      return parseBodyToType(res);
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          res = _ref2[0],
          data = _ref2[1];

      // maintaining existing API for error codes not equal to 200 range
      if (!res.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
          error: data,
          response: res,
          status: res.status
        };
      }

      return data;
    });
  };
}

/***/ }),

/***/ 605:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 707:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RPC = exports.RPC = 'rpc';
var UPLOAD = exports.UPLOAD = 'upload';
var DOWNLOAD = exports.DOWNLOAD = 'download';

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 761:
/***/ (function(module) {

module.exports = require("zlib");

/***/ }),

/***/ 833:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.rpcRequest = rpcRequest;

var _buffer = __webpack_require__(293);

var _utils = __webpack_require__(204);

function parseBodyToType(res) {
  if (res.headers.get('Content-Type') === 'application/json') {
    return res.json().then(function (data) {
      return [res, data];
    });
  }
  return res.text().then(function (data) {
    return [res, data];
  });
}

function rpcRequest(fetch) {
  return function rpcRequestWithFetch(path, body, auth, host, client, options) {
    return client.checkAndRefreshAccessToken().then(function () {
      var fetchOptions = {
        method: 'POST',
        body: body ? JSON.stringify(body) : null
      };
      var headers = {};
      if (body) {
        headers['Content-Type'] = 'application/json';
      }
      var authHeader = '';

      switch (auth) {
        case 'app':
          if (!options.clientId || !options.clientSecret) {
            throw new Error('A client id and secret is required for this function');
          }
          authHeader = new _buffer.Buffer(options.clientId + ':' + options.clientSecret).toString('base64');
          headers.Authorization = 'Basic ' + authHeader;
          break;
        case 'team':
        case 'user':
          headers.Authorization = 'Bearer ' + client.getAccessToken();
          break;
        case 'noauth':
          break;
        default:
          throw new Error('Unhandled auth type: ' + auth);
      }

      if (options) {
        if (options.selectUser) {
          headers['Dropbox-API-Select-User'] = options.selectUser;
        }
        if (options.selectAdmin) {
          headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
        }
        if (options.pathRoot) {
          headers['Dropbox-API-Path-Root'] = options.pathRoot;
        }
      }

      fetchOptions.headers = headers;
      return fetchOptions;
    }).then(function (fetchOptions) {
      return fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
    }).then(function (res) {
      return parseBodyToType(res);
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          res = _ref2[0],
          data = _ref2[1];

      // maintaining existing API for error codes not equal to 200 range
      if (!res.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
          error: data,
          response: res,
          status: res.status
        };
      }

      return data;
    });
  };
}

/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map