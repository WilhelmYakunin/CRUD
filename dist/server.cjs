/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(function () {
  (__webpack_require__(2).config)(
    Object.assign(
      {},
      __webpack_require__(6),
      __webpack_require__(7)(process.argv)
    )
  )
})()


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(3)
const path = __webpack_require__(4)
const os = __webpack_require__(5)

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parser src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _log (message) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options) {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)

  if (options) {
    if (options.path != null) {
      dotenvPath = _resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
  }

  try {
    // Specifying an encoding returns a string instead of a buffer
    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else {
        if (override === true) {
          process.env[key] = parsed[key]
        }

        if (debug) {
          if (override === true) {
            _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`)
          } else {
            _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`)
          }
        }
      }
    })

    return { parsed }
  } catch (e) {
    if (debug) {
      _log(`Failed to load ${dotenvPath} ${e.message}`)
    }

    return { error: e }
  }
}

const DotenvModule = {
  config,
  parse
}

module.exports.config = DotenvModule.config
module.exports.parse = DotenvModule.parse
module.exports = DotenvModule


/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 6 */
/***/ ((module) => {

// ../config.js accepts options via environment variables
const options = {}

if (process.env.DOTENV_CONFIG_ENCODING != null) {
  options.encoding = process.env.DOTENV_CONFIG_ENCODING
}

if (process.env.DOTENV_CONFIG_PATH != null) {
  options.path = process.env.DOTENV_CONFIG_PATH
}

if (process.env.DOTENV_CONFIG_DEBUG != null) {
  options.debug = process.env.DOTENV_CONFIG_DEBUG
}

if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
  options.override = process.env.DOTENV_CONFIG_OVERRIDE
}

module.exports = options


/***/ }),
/* 7 */
/***/ ((module) => {

const re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

module.exports = function optionMatcher (args) {
  return args.reduce(function (acc, cur) {
    const matches = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

var app = function (req, res) {
    var method = req.method, url = req.url;
    switch (method) {
        case 'GET':
            (0,_controller__WEBPACK_IMPORTED_MODULE_0__.onGet)(url, res);
            break;
        case 'POST':
            (0,_controller__WEBPACK_IMPORTED_MODULE_0__.onPost)(req, res);
            break;
        case 'PUT':
            (0,_controller__WEBPACK_IMPORTED_MODULE_0__.onPut)(req, res);
            break;
        case 'DELETE':
            (0,_controller__WEBPACK_IMPORTED_MODULE_0__.onDelete)(req, res);
            break;
        default:
            res.statusCode = 500;
            var err = (0,_controller__WEBPACK_IMPORTED_MODULE_0__.createError)(500, "somthing went wrong on server side method: ".concat(method, " url: ").concat(url));
            res.write(JSON.stringify(err, null, 2));
            return res.end();
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createError": () => (/* reexport safe */ _createError__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "onDelete": () => (/* reexport safe */ _onDelete__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "onGet": () => (/* reexport safe */ _onGet__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "onPost": () => (/* reexport safe */ _onPost__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "onPut": () => (/* reexport safe */ _onPut__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _onGet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _onPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _onPut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _onDelete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);








/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




var __dirname = path__WEBPACK_IMPORTED_MODULE_0__.dirname(__filename);
var onGet = function (url, res) {
    var sendError = function () {
        res.statusCode = 404;
        var err = (0,_controller__WEBPACK_IMPORTED_MODULE_3__.createError)(404, "page ".concat(url, " not found"));
        res.write(JSON.stringify(err, null, 2));
        res.end();
        return;
    };
    var sendIndex = function () {
        var indexFile = path__WEBPACK_IMPORTED_MODULE_0__.join(__dirname, 'index.html');
        var readble = (0,fs__WEBPACK_IMPORTED_MODULE_1__.createReadStream)(indexFile);
        readble.on('data', function (chunk) {
            res.statusCode = 200;
            res.write(chunk);
        });
        readble.on('end', function () {
            res.end();
            return;
        });
    };
    var getAllusers = function () {
        res.statusCode = 200;
        res.write(JSON.stringify(_model__WEBPACK_IMPORTED_MODULE_2__["default"].users));
        res.end();
        return;
    };
    var indexofLastSlash = url.lastIndexOf('/');
    var id = url.slice(indexofLastSlash + 1);
    var sendUser = function () {
        if (isNaN(Number(id)) && url.slice(0, 10) === '/api/users') {
            res.statusCode = 400;
            var err = (0,_controller__WEBPACK_IMPORTED_MODULE_3__.createError)(400, "unknown type of the id ".concat(id, " or url is incorect"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var isCorrectPage = function () {
            return _model__WEBPACK_IMPORTED_MODULE_2__["default"].paths.includes(url);
        };
        if (!isCorrectPage() && url.slice(0, 10) !== '/api/users')
            return sendError();
        var hasUser = _model__WEBPACK_IMPORTED_MODULE_2__["default"].users.find(function (user) { return user.id === id; });
        if (!hasUser) {
            res.statusCode = 404;
            var err = (0,_controller__WEBPACK_IMPORTED_MODULE_3__.createError)(404, "user with the id ".concat(id, " does not exist"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var index = _model__WEBPACK_IMPORTED_MODULE_2__["default"].users.findIndex(function (user) { return user.id === id; });
        var user = _model__WEBPACK_IMPORTED_MODULE_2__["default"].users.splice(index, 1)[0];
        res.write(JSON.stringify(user, null, 2));
        res.end();
        return;
    };
    switch (url) {
        case '/':
            return sendIndex();
        case '/api/users':
            return getAllusers();
        default:
            return sendUser();
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onGet);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var defaultState = {
    users: [],
    usersIDs: { count: 0, ids: [] },
    paths: [],
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultState);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);


var onPost = function (req, res) {
    if (req.url !== '/api/users') {
        res.statusCode = 404;
        var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(404, 'unknown url adress');
        res.write(JSON.stringify(err, null, 2));
        res.end();
        return;
    }
    var userData = '';
    req
        .on('data', function (chunk) {
        userData += chunk;
    })
        .on('end', function () {
        var username;
        var age;
        var hobbies = [];
        var reqPairs = userData.split('&');
        var allPropsNames = [];
        reqPairs.map(function (pair) {
            switch (pair.split('=')[0]) {
                case 'username':
                    allPropsNames.push('username');
                    return (username = pair.split('=')[1]);
                case 'age':
                    allPropsNames.push('age');
                    return (age = Number(pair.split('=')[1]));
                case 'hobbies':
                    allPropsNames.push('hobbies');
                    var hobbiesString = pair.split('=')[1];
                    if (hobbiesString !== '') {
                        hobbiesString.split('%2C').map(function (hobby) { return hobbies.push(hobby); });
                    }
                    return;
                default:
                    res.statusCode = 400;
                    var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, "unknown input filed ".concat(pair.split('=')[0], " with property ").concat(pair.split('=')[1]));
                    res.write(JSON.stringify(err, null, 2));
                    res.end();
                    return;
            }
        });
        var hasAllProps = Boolean(allPropsNames.includes('username') &&
            allPropsNames.includes('age') &&
            allPropsNames.includes('hobbies'));
        if (!hasAllProps) {
            res.statusCode = 400;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, 'input does not contain all required fields');
            res.write(JSON.stringify(err, null, 2));
            return res.end();
        }
        var user = _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.find(function (user) { return user.username === username && user.age === age; });
        if (user) {
            res.statusCode = 400;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, "user already exist");
            res.write(JSON.stringify(err, null, 2));
            return res.end();
        }
        var getId = function () {
            var id = String(_model__WEBPACK_IMPORTED_MODULE_1__["default"].usersIDs.count);
            _model__WEBPACK_IMPORTED_MODULE_1__["default"].usersIDs.count += 1;
            _model__WEBPACK_IMPORTED_MODULE_1__["default"].usersIDs.ids.push(id);
            return id;
        };
        var newUser = {
            id: String(getId()),
            username: username,
            age: age,
            hobbies: Boolean(hobbies) ? hobbies : [],
        };
        _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.push(newUser);
        _model__WEBPACK_IMPORTED_MODULE_1__["default"].paths.push('/api/users/' + newUser.id);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        return res.end();
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onPost);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createError = function (statusCode, message) {
    var getStatusCodeClass = function (status) {
        return Number(String(status).charAt(0) + '00');
    };
    if (statusCode < 400 || statusCode >= 600) {
        return {
            codeClass: 'not http or server error',
            statusCode: statusCode,
            message: message,
        };
    }
    var isInternalErr = getStatusCodeClass(statusCode) === 500;
    var codeClass = isInternalErr ? 'Internal server error' : 'Bad Request';
    return {
        codeClass: codeClass,
        statusCode: statusCode,
        message: message,
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createError);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);


var onPut = function (req, res) {
    var userData = '';
    req
        .on('data', function (chunk) {
        userData += chunk;
    })
        .on('end', function () {
        var indexofLastSlash = req.url.lastIndexOf('/');
        var id = req.url.slice(indexofLastSlash + 1);
        if (isNaN(Number(id))) {
            res.statusCode = 400;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, "unknown type of the id ".concat(id, " or url is incorect"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var user = _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.find(function (user) { return user.id === id; });
        if (!user) {
            res.statusCode = 404;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(404, "user with the id ".concat(id, " does not exist"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var username;
        var age;
        var hobbies = [];
        var reqPairs = userData.split('&');
        var allPropsNames = [];
        reqPairs.map(function (pair) {
            switch (pair.split('=')[0]) {
                case 'username':
                    allPropsNames.push('username');
                    return (username = pair.split('=')[1]);
                case 'age':
                    allPropsNames.push('age');
                    return (age = Number(pair.split('=')[1]));
                case 'hobbies':
                    allPropsNames.push('hobbies');
                    var hobbiesString = pair.split('=')[1];
                    if (hobbiesString !== '') {
                        hobbiesString.split('%2C').map(function (hobby) { return hobbies.push(hobby); });
                    }
                    return;
                default:
                    res.statusCode = 400;
                    var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, "unknown input filed ".concat(pair.split('=')[0], " with property ").concat(pair.split('=')[1]));
                    res.write(JSON.stringify(err, null, 2));
                    res.end();
                    return;
            }
        });
        var hasAllProps = Boolean(allPropsNames.includes('username') &&
            allPropsNames.includes('age') &&
            allPropsNames.includes('hobbies'));
        if (!hasAllProps) {
            res.statusCode = 400;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, 'input does not contain all required fields');
            res.write(JSON.stringify(err, null, 2));
            return res.end();
        }
        var newUserInfo = {
            username: username,
            age: age,
            hobbies: Boolean(hobbies) ? hobbies : [],
        };
        _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.map(function (user) {
            if (user.id === id) {
                Object.assign(user, newUserInfo);
            }
        });
        res.write(JSON.stringify(newUserInfo));
        res.end();
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onPut);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);


var onDelete = function (req, res) {
    var userData = '';
    req
        .on('data', function (chunk) {
        userData += chunk;
    })
        .on('end', function () {
        var indexofLastSlash = req.url.lastIndexOf('/');
        var id = req.url.slice(indexofLastSlash + 1);
        if (isNaN(Number(id))) {
            res.statusCode = 400;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(400, "the id ".concat(id, " is invalid or url is incorect"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var user = _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.find(function (user) { return user.id === id; });
        if (!user) {
            res.statusCode = 404;
            var err = (0,_createError__WEBPACK_IMPORTED_MODULE_0__["default"])(404, "user with the id ".concat(id, " does not exist"));
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
        var IDindex = _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.findIndex(function (user) { return user.id === id; });
        var pathIndex = _model__WEBPACK_IMPORTED_MODULE_1__["default"].paths.findIndex(function (path) { return path === 'api/users/' + id; });
        _model__WEBPACK_IMPORTED_MODULE_1__["default"].users.splice(IDindex, 1);
        _model__WEBPACK_IMPORTED_MODULE_1__["default"].paths.splice(pathIndex, 1);
        res.statusCode = 204;
        res.write("the user with id: ".concat(id, " deleted"));
        res.end();
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onDelete);


/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("cluster");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var cluster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cluster__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_4__);





var env = process.env, pid = process.pid;
var port = env.port;
var server = http__WEBPACK_IMPORTED_MODULE_2__.createServer(_app__WEBPACK_IMPORTED_MODULE_1__["default"]);
if ((cluster__WEBPACK_IMPORTED_MODULE_3___default().isPrimary)) {
    process.stdout.write("Main server pid: ".concat(pid, " \n"));
    var count = os__WEBPACK_IMPORTED_MODULE_4__.cpus().length;
    for (var i = 0; i < count; i += 1) {
        cluster__WEBPACK_IMPORTED_MODULE_3___default().fork();
    }
}
else {
    var id = void 0;
    if ((cluster__WEBPACK_IMPORTED_MODULE_3___default().worker)) {
        id = (cluster__WEBPACK_IMPORTED_MODULE_3___default().worker.id);
    }
    process.stdout.write("worker ID: ".concat(id, ", pid: ").concat(pid, ", port: ").concat(port, " \n"));
    server.listen(port, function () {
        process.stdout.write("Server is running on port: ".concat(port, " \npid is: ").concat(pid, " \n"));
    });
}

})();

/******/ })()
;
//# sourceMappingURL=server.cjs.map