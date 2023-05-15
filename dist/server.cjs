/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dotenv/config.js":
/*!***************************************!*\
  !*** ./node_modules/dotenv/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(function () {
  (__webpack_require__(/*! ./lib/main */ "./node_modules/dotenv/lib/main.js").config)(
    Object.assign(
      {},
      __webpack_require__(/*! ./lib/env-options */ "./node_modules/dotenv/lib/env-options.js"),
      __webpack_require__(/*! ./lib/cli-options */ "./node_modules/dotenv/lib/cli-options.js")(process.argv)
    )
  )
})()


/***/ }),

/***/ "./node_modules/dotenv/lib/cli-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/cli-options.js ***!
  \************************************************/
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

/***/ "./node_modules/dotenv/lib/env-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/env-options.js ***!
  \************************************************/
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

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! fs */ "fs")
const path = __webpack_require__(/*! path */ "path")
const os = __webpack_require__(/*! os */ "os")

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

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller/index.ts");

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

/***/ "./src/controller/createError.ts":
/*!***************************************!*\
  !*** ./src/controller/createError.ts ***!
  \***************************************/
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

/***/ "./src/controller/index.ts":
/*!*********************************!*\
  !*** ./src/controller/index.ts ***!
  \*********************************/
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
/* harmony import */ var _onGet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onGet */ "./src/controller/onGet.ts");
/* harmony import */ var _onPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onPost */ "./src/controller/onPost.ts");
/* harmony import */ var _onPut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onPut */ "./src/controller/onPut.ts");
/* harmony import */ var _onDelete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onDelete */ "./src/controller/onDelete.ts");
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createError */ "./src/controller/createError.ts");








/***/ }),

/***/ "./src/controller/onDelete.ts":
/*!************************************!*\
  !*** ./src/controller/onDelete.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createError */ "./src/controller/createError.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ "./src/model.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-node/validate.js");



var onDelete = function (req, res) {
    var userData = '';
    req
        .on('data', function (chunk) {
        userData += chunk;
    })
        .on('end', function () {
        var indexofLastSlash = req.url.lastIndexOf('/');
        var id = req.url.slice(indexofLastSlash + 1);
        if (!(0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])(id)) {
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

/***/ "./src/controller/onGet.ts":
/*!*********************************!*\
  !*** ./src/controller/onGet.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model */ "./src/model.ts");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controller */ "./src/controller/index.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-node/validate.js");





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
        if (!(0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])(id) && url.slice(0, 10) === '/api/users') {
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

/***/ "./src/controller/onPost.ts":
/*!**********************************!*\
  !*** ./src/controller/onPost.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createError */ "./src/controller/createError.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ "./src/model.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-node/v4.js");



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
            var id = (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
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

/***/ "./src/controller/onPut.ts":
/*!*********************************!*\
  !*** ./src/controller/onPut.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createError */ "./src/controller/createError.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ "./src/model.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-node/validate.js");



var onPut = function (req, res) {
    var userData = '';
    req
        .on('data', function (chunk) {
        userData += chunk;
    })
        .on('end', function () {
        var indexofLastSlash = req.url.lastIndexOf('/');
        var id = req.url.slice(indexofLastSlash + 1);
        if (!(0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])(id)) {
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

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
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

/***/ "./node_modules/uuid/dist/esm-node/native.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/native.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID: (crypto__WEBPACK_IMPORTED_MODULE_0___default().randomUUID)
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/regex.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/regex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/rng.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/rng.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/stringify.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/stringify.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-node/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v4.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v4.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-node/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-node/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-node/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/validate.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/validate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-node/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/app.ts");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dotenv/config */ "./node_modules/dotenv/config.js");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_2__);



var env = process.env, pid = process.pid;
var port = env.port;
var server = http__WEBPACK_IMPORTED_MODULE_0__.createServer(_app__WEBPACK_IMPORTED_MODULE_1__["default"]);
server.listen(port, function () {
    process.stdout.write("Server is running on port: ".concat(port, " \npid is: ").concat(pid, " \n"));
});

})();

/******/ })()
;
//# sourceMappingURL=server.cjs.map