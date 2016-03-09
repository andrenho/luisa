(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":21}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":22}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":23}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":24}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":25}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":26}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":27}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":28}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":29}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":30}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":31}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":32}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":6}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":7,"../core-js/object/get-prototype-of":8}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":5,"../core-js/object/set-prototype-of":10,"../helpers/typeof":20}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":20}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":2,"../core-js/is-iterable":3}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};
},{"../core-js/array/from":1}],20:[function(require,module,exports){
"use strict";

var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":11,"../core-js/symbol/iterator":12}],21:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":38,"../../modules/es6.array.from":78,"../../modules/es6.string.iterator":85}],22:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":76,"../modules/es6.string.iterator":85,"../modules/web.dom.iterable":87}],23:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":77,"../modules/es6.string.iterator":85,"../modules/web.dom.iterable":87}],24:[function(require,module,exports){
var core = require('../../modules/$.core');
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
};
},{"../../modules/$.core":38}],25:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":59}],26:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":59}],27:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.get-own-property-descriptor');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":59,"../../modules/es6.object.get-own-property-descriptor":80}],28:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/$.core').Object.getPrototypeOf;
},{"../../modules/$.core":38,"../../modules/es6.object.get-prototype-of":81}],29:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":38,"../../modules/es6.object.keys":82}],30:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":38,"../../modules/es6.object.set-prototype-of":83}],31:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":38,"../../modules/es6.object.to-string":84,"../../modules/es6.symbol":86}],32:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":74,"../../modules/es6.string.iterator":85,"../../modules/web.dom.iterable":87}],33:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],34:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],35:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":52}],36:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":37,"./$.wks":74}],37:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],38:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],39:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":33}],40:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],41:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":44}],42:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":59}],43:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":38,"./$.ctx":39,"./$.global":46}],44:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],45:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":59,"./$.to-iobject":70}],46:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],47:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],48:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":59,"./$.descriptors":41,"./$.property-desc":63}],49:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":37}],50:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":58,"./$.wks":74}],51:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":37}],52:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],53:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":35}],54:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":59,"./$.hide":48,"./$.property-desc":63,"./$.set-to-string-tag":66,"./$.wks":74}],55:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":59,"./$.export":43,"./$.has":47,"./$.hide":48,"./$.iter-create":54,"./$.iterators":58,"./$.library":61,"./$.redefine":64,"./$.set-to-string-tag":66,"./$.wks":74}],56:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":74}],57:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],58:[function(require,module,exports){
module.exports = {};
},{}],59:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],60:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":59,"./$.to-iobject":70}],61:[function(require,module,exports){
module.exports = true;
},{}],62:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":38,"./$.export":43,"./$.fails":44}],63:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],64:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":48}],65:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":59,"./$.an-object":35,"./$.ctx":39,"./$.is-object":52}],66:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":59,"./$.has":47,"./$.wks":74}],67:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":46}],68:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":40,"./$.to-integer":69}],69:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],70:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":40,"./$.iobject":49}],71:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":69}],72:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":40}],73:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],74:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":46,"./$.shared":67,"./$.uid":73}],75:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":36,"./$.core":38,"./$.iterators":58,"./$.wks":74}],76:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":35,"./$.core":38,"./core.get-iterator-method":75}],77:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./$.classof":36,"./$.core":38,"./$.iterators":58,"./$.wks":74}],78:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":39,"./$.export":43,"./$.is-array-iter":50,"./$.iter-call":53,"./$.iter-detect":56,"./$.to-length":71,"./$.to-object":72,"./core.get-iterator-method":75}],79:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":34,"./$.iter-define":55,"./$.iter-step":57,"./$.iterators":58,"./$.to-iobject":70}],80:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":62,"./$.to-iobject":70}],81:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./$.object-sap":62,"./$.to-object":72}],82:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":62,"./$.to-object":72}],83:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":43,"./$.set-proto":65}],84:[function(require,module,exports){

},{}],85:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":55,"./$.string-at":68}],86:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":59,"./$.an-object":35,"./$.descriptors":41,"./$.enum-keys":42,"./$.export":43,"./$.fails":44,"./$.get-names":45,"./$.global":46,"./$.has":47,"./$.is-array":51,"./$.keyof":60,"./$.library":61,"./$.property-desc":63,"./$.redefine":64,"./$.set-to-string-tag":66,"./$.shared":67,"./$.to-iobject":70,"./$.uid":73,"./$.wks":74}],87:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":58,"./es6.array.iterator":79}],88:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":89,"./lib/keys.js":90}],89:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],90:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],91:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":99,"object-keys":105}],92:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],93:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
        return $isNaN(x) && $isNaN(y);
	}
};

module.exports = ES5;

},{"./helpers/isFinite":94,"./helpers/mod":95,"./helpers/sign":96,"es-to-primitive/es5":97,"is-callable":103}],94:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],95:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],96:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],97:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":98,"is-callable":103}],98:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],99:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],100:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


},{}],101:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":100}],102:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],103:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],104:[function(require,module,exports){
module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],105:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var blacklistedKeys = {
	$console: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$parent: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":106}],106:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],107:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":161,"through":117}],108:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":93,"function-bind":100}],109:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":108,"./polyfill":110,"./shim":111,"define-properties":91,"function-bind":100}],110:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":108}],111:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":110,"define-properties":91}],112:[function(require,module,exports){
var tape = require('tape')

exports = module.exports = tape

// Maintain tape@1 compatibility
exports.Test.prototype._end = (
  exports.Test.prototype._end ||
  exports.Test.prototype.end
)

exports.Test.prototype.run = function () {
  if (!this._cb || this._skip) {
    return this._end()
  }
  this.emit('prerun')
  try {
    this._cb(this)
  }
  catch (err) {
    this.error(err)
    this._end()
    return
  }
  this.emit('run') 
}

},{"tape":113}],113:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":114,"./lib/results":115,"./lib/test":116,"_process":161,"defined":92,"through":117}],114:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":161,"fs":148,"through":117}],115:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":161,"events":154,"function-bind":100,"has":101,"inherits":102,"object-inspect":104,"resumer":107,"through":117}],116:[function(require,module,exports){
(function (process,__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    this.emit('result', trim(msg).replace(/^#\s*/, ''));
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,require('_process'),"/node_modules/tape/lib")
},{"_process":161,"deep-equal":88,"defined":92,"events":154,"has":101,"inherits":102,"path":159,"string.prototype.trim":109}],117:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":161,"stream":172}],118:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BIOS = function (_Device) {
  (0, _inherits3.default)(BIOS, _Device);

  function BIOS(biosCode) {
    (0, _classCallCheck3.default)(this, BIOS);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BIOS).call(this));

    _this._const = _this.constantList();
    if (!biosCode instanceof Uint8Array) {
      throw new Error('Invalid BIOS code.');
    }
    _this._code = biosCode;
    return _this;
  }

  (0, _createClass3.default)(BIOS, [{
    key: 'name',
    value: function name() {
      return 'LuisaBIOS';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.BIOS;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0x0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return false;
    }
  }, {
    key: 'memorySize',
    value: function memorySize() {
      return 0x10000; /* (64 kB) */
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        BIOS_TYPE: 0x00,
        BIOS_VERSION: 0x01,
        BIOS_INTERRUPT: 0x02,
        BIOS_NAME: 0x03,
        BIOS_CODE: 0x10
      };
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(BIOS.prototype), 'get', this).call(this, a);
      } else if (a >= 0x10 && a < this._code.length + 0x10) {
        return this._code[a - 0x10];
      }
      return 0;
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(BIOS.prototype), 'set', this).call(this, a, v);
      }
    }
  }]);
  return BIOS;
}(Device);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],119:[function(require,module,exports){
/*
 * CPU (Central Processing Unit)
 * -----------------------------
 *
 * Execute instructions from memory.
 *
 * - Expected position: 0xF0001020
 * - Size: 64 bytes
 *
 * - Interrupt: 3 (invalid opcode)
 *
 * - Registers:
 *           0000  Device type
 *           0001  Device version
 *     0003..000F  Device name
 *     0010..0013  Register A
 *     0014..0017  Register B
 *     0018..001B  Register C
 *     001C..001F  Register D
 *     0020..0023  Register E
 *     0024..0027  Register F
 *     0028..002B  Register G
 *     002C..002F  Register H
 *     0030..0033  Register I
 *     0034..0037  Register J
 *     0038..003B  Register K
 *     003C..003F  Register L
 *     0040..0043  Register FP (frame pointer)
 *     0044..0047  Register SP (stack pointer)
 *     0048..004B  Register PC (program counter)
 *     004C..004F  Register FL (flags)
 *                    bit 0 - Y (carry)
 *                    bit 1 - V (overflow)
 *                    bit 2 - Z (zero)
 *                    bit 3 - S (sign)
 *                    bit 4 - GT (greater than zero)
 *                    bit 5 - LT (less than zero)
 *                    bit 6 - P (parity)
 *                    bit 7 - T (interrupts active)
 *     0100..04FF  Interrupt vector (256 interrupts of 4 bytes each)
 *     0500..08FF  System call vector (256 system call of 4 bytes each)
 *
 * - Instruction set:
 *     (for now, see https://github.com/andrenho/luisa/wiki/CPU)
 */

/*
 * TODO: 
 *   - improve overflow/carry support (arithmetic)
 *   - improve signedness
 */

'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CPU = function (_Device) {
  (0, _inherits3.default)(CPU, _Device);


  //
  // DEVICE METHODS
  //

  function CPU(motherboard) {
    (0, _classCallCheck3.default)(this, CPU);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CPU).call(this));

    _this._mb = motherboard;
    _this.reset();
    _this._stepFunction = _this.initStepFunctions();
    _this.invalidOpcode = false; // this is meant for the debugger
    return _this;
  }

  (0, _createClass3.default)(CPU, [{
    key: 'reset',
    value: function reset() {
      (0, _get3.default)((0, _getPrototypeOf2.default)(CPU.prototype), 'reset', this).call(this);
      this._reg = new Uint32Array(16);
      this._interruptVector = new Uint32Array(256);
      this._syscallVector = new Uint32Array(256);
      this._interruptsPending = [];
      this.PC = this._mb.get32(this._mb.MB_CPU_INIT);
    }
  }, {
    key: 'name',
    value: function name() {
      return 'LuisaCPU';
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return true;
    }
  }, {
    key: 'pushInterrupt',
    value: function pushInterrupt(n) {
      this._interruptsPending.push(n);
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.CPU;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        CPU_A: 0x10,
        CPU_B: 0x14,
        CPU_C: 0x18,
        CPU_D: 0x1C,
        CPU_E: 0x20,
        CPU_F: 0x24,
        CPU_G: 0x28,
        CPU_H: 0x2C,
        CPU_I: 0x30,
        CPU_J: 0x34,
        CPU_K: 0x38,
        CPU_L: 0x3C,
        CPU_FP: 0x40,
        CPU_SP: 0x44,
        CPU_PC: 0x48,
        CPU_FL: 0x4C,
        CPU_INTERRUPT_VECT: 0x100,
        CPU_SYSCALL_VECT: 0x500
      };
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a <= 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(CPU.prototype), 'get', this).call(this, a);
      } else {
        var v = undefined;
        if (a <= 0x4F) {
          v = this._reg[Math.floor((a - 0x10) / 4)];
        } else if (a >= 0x100 && a < 0x500) {
          v = this._interruptVector[Math.floor((a - 0x100) / 4)];
        } else if (a >= 0x500 && a < 0x8FF) {
          v = this._syscallVector[Math.floor((a - 0x500) / 4)];
        }
        if (v !== undefined) {
          switch (a % 4) {
            case 0:
              return v & 0xFF;
            case 1:
              return v >> 8 & 0xFF;
            case 2:
              return v >> 16 & 0xFF;
            case 3:
              return v >> 24 & 0xFF;
          }
        }
      }
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(CPU.prototype), 'set', this).call(this, a, v);
      } else {
        var r = undefined,
            arr = undefined;
        if (a >= 0x10 && a <= 0x4F) {
          r = Math.floor((a - 0x10) / 4);
          arr = this._reg;
        } else if (a >= 0x100 && a < 0x500) {
          r = Math.floor((a - 0x100) / 4);
          arr = this._interruptVector;
        } else if (a >= 0x500 && a < 0x8FF) {
          r = Math.floor((a - 0x500) / 4);
          arr = this._syscallVector;
        }
        if (arr) {
          switch (a % 4) {
            case 0:
              arr[r] &= ~0xFF;
              arr[r] |= v;
              break;
            case 1:
              arr[r] &= ~0xFF00;
              arr[r] |= v << 8;
              break;
            case 2:
              arr[r] &= ~0xFF0000;
              arr[r] |= v << 16;
              break;
            case 3:
              arr[r] &= ~0xFF000000;
              arr[r] |= v << 24;
              break;
          }
        }
      }
    }

    //
    // STEPPING THROUGH
    //

  }, {
    key: 'step',
    value: function step() {
      var n = this._stepFunction[this._mb.get(this.PC)](this.PC + 1);
      if (n) {
        this.PC += n + 1;
      }
    }
  }, {
    key: 'checkInterrupts',
    value: function checkInterrupts() {
      if (this.T && this._interruptsPending.length > 0) {
        var n = this._interruptsPending.shift();
        this._push32(this.PC);
        this.T = false;
        this.PC = this._interruptVector[n];
      }
    }
  }, {
    key: '_affectFlags',
    value: function _affectFlags(value) {
      this.Z = (value & 0xFFFFFFFF) === 0;
      this.P = value % 2 === 0;
      this.S = value >> 31 & 0x1 ? true : false;
      this.V = false;
      this.Y = false;
      this.GT = false;
      this.LT = false;
      return value & 0xFFFFFFFF;
    }

    //
    // STACK
    //

  }, {
    key: '_push',
    value: function _push(value) {
      this._mb.set(this.SP, value);
      this.SP -= 1;
    }
  }, {
    key: '_push16',
    value: function _push16(value) {
      this.SP -= 1;
      this._mb.set16(this.SP, value);
      this.SP -= 1;
    }
  }, {
    key: '_push32',
    value: function _push32(value) {
      this.SP -= 3;
      this._mb.set32(this.SP, value);
      this.SP -= 1;
    }
  }, {
    key: '_pop',
    value: function _pop() {
      this.SP += 1;
      return this._mb.get(this.SP);
    }
  }, {
    key: '_pop16',
    value: function _pop16() {
      this.SP += 1;
      var r = this._mb.get16(this.SP);
      this.SP += 1;
      return r;
    }
  }, {
    key: '_pop32',
    value: function _pop32() {
      this.SP += 1;
      var r = this._mb.get32(this.SP);
      this.SP += 3;
      return r;
    }

    //
    // GETTERS / SETTERS
    //

  }, {
    key: 'initStepFunctions',

    // jscs:enable validateIndentation

    //
    // INSTRUCTIONS
    //

    value: function initStepFunctions() {
      var _this2 = this;

      // add invalid opcodes
      var f = [];
      for (var i = 0; i < 256; ++i) {
        f.push(function (pos) {
          _this2.fireInterrupt();
          _this2.invalidUpcode = true;
          return 0;
        });
      }

      //
      // MOV
      //
      f[0x01] = function (pos) {
        // mov R, R
        var reg = _this2._reg;
        var mb = _this2._mb;

        var r = reg[mb.get(pos + 1)];
        reg[mb.get(pos)] = _this2._affectFlags(r);
        return 2;
      };
      f[0x02] = function (pos) {
        // mov R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;

        var r = mb.get(pos + 1);
        reg[mb.get(pos)] = _this2._affectFlags(r);
        return 2;
      };
      f[0x03] = function (pos) {
        // mov R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;

        var r = mb.get16(pos + 1);
        reg[mb.get(pos)] = _this2._affectFlags(r);
        return 3;
      };
      f[0x04] = function (pos) {
        // mov R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var r = mb.get32(pos + 1);
        reg[mb.get(pos)] = _this2._affectFlags(r);
        return 5;
      };

      //
      // MOVB
      //

      f[0x05] = function (pos) {
        // movb R, [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get(reg[p2]);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x06] = function (pos) {
        // movb R, [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get(p2);
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      f[0x0B] = function (pos) {
        // movb [R], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p2] & 0xFF;
        mb.set(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x0C] = function (pos) {
        // movb [R], v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = p2;
        mb.set(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x0D] = function (pos) {
        // movb [R], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get(reg[p2]);
        mb.set(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x0E] = function (pos) {
        // movb [R], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get(p2);
        mb.set(reg[p1], _this2._affectFlags(r));
        return 5;
      };

      f[0x21] = function (pos) {
        // movb [v32], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = reg[p2] & 0xFF;
        mb.set(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x22] = function (pos) {
        // movb [v32], v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = p2;
        mb.set(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x23] = function (pos) {
        // movb [v32], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = mb.get(reg[p2]);
        mb.set(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x24] = function (pos) {
        // movb [v32], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get32(pos + 4);

        var r = mb.get(mb.get32(p2));
        mb.set(p1, _this2._affectFlags(r));
        return 8;
      };

      //
      // MOVW
      //

      f[0x07] = function (pos) {
        // movw R, [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get16(reg[p2]);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x08] = function (pos) {
        // movw R, [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get16(p2);
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      f[0x0F] = function (pos) {
        // movw [R], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p2] & 0xFFFF;
        mb.set16(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x1A] = function (pos) {
        // movw [R], v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = p2;
        mb.set16(reg[p1], _this2._affectFlags(r));
        return 3;
      };

      f[0x1B] = function (pos) {
        // movw [R], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get16(reg[p2]);
        mb.set16(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x1C] = function (pos) {
        // movw [R], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get16(p2);
        mb.set16(reg[p1], _this2._affectFlags(r));
        return 5;
      };

      f[0x25] = function (pos) {
        // movw [v32], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = reg[p2] & 0xFFFF;
        mb.set16(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x26] = function (pos) {
        // movw [v32], v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get16(pos + 4);

        var r = p2;
        mb.set16(p1, _this2._affectFlags(r));
        return 6;
      };

      f[0x27] = function (pos) {
        // movw [v32], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        mb.set16(p1, mb.get16(reg[p2]));
        return 5;
      };

      f[0x28] = function (pos) {
        // movw [v32], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get32(pos + 4);

        mb.set16(p1, mb.get16(mb.get32(p2)));
        return 8;
      };

      //
      // MOVD
      //

      f[0x09] = function (pos) {
        // movd R, [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get32(reg[p2]);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x0A] = function (pos) {
        // movd R, [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get32(p2);
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      f[0x1D] = function (pos) {
        // movd [R], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p2];
        mb.set32(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x1E] = function (pos) {
        // movd [R], v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = p2;
        mb.set32(reg[p1], _this2._affectFlags(r));
        return 5;
      };

      f[0x1F] = function (pos) {
        // movd [R], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = mb.get32(reg[p2]);
        mb.set32(reg[p1], _this2._affectFlags(r));
        return 2;
      };

      f[0x20] = function (pos) {
        // movd [R], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = mb.get32(p2);
        mb.set32(reg[p1], _this2._affectFlags(r));
        return 5;
      };

      f[0x29] = function (pos) {
        // movd [v32], R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = reg[p2];
        mb.set32(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x2A] = function (pos) {
        // movd [v32], v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get32(pos + 4);

        var r = p2;
        mb.set32(p1, _this2._affectFlags(r));
        return 8;
      };

      f[0x2B] = function (pos) {
        // movd [v32], [R]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get(pos + 4);

        var r = mb.get32(reg[p2]);
        mb.set32(p1, _this2._affectFlags(r));
        return 5;
      };

      f[0x2C] = function (pos) {
        // movd [v32], [v32]
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get32(pos);
        var p2 = mb.get32(pos + 4);

        var r = mb.get32(mb.get32(p2));
        mb.set32(p1, _this2._affectFlags(r));
        return 8;
      };

      //
      // OR
      //

      f[0x2D] = function (pos) {
        // or R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] | reg[p2];
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x2E] = function (pos) {
        // or R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] | p2;
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x2F] = function (pos) {
        // or R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] | p2;
        reg[p1] = _this2._affectFlags(r);
        return 3;
      };

      f[0x30] = function (pos) {
        // or R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] | p2;
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      //
      // XOR
      //

      f[0x31] = function (pos) {
        // xor R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] ^ reg[p2];
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x32] = function (pos) {
        // xor R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] ^ p2;
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x33] = function (pos) {
        // xor R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] ^ p2;
        reg[p1] = _this2._affectFlags(r);
        return 3;
      };

      f[0x34] = function (pos) {
        // xor R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] ^ p2;
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      //
      // AND
      //

      f[0x35] = function (pos) {
        // and R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] & reg[p2];
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x36] = function (pos) {
        // and R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] & p2;
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x37] = function (pos) {
        // and R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] & p2;
        reg[p1] = _this2._affectFlags(r);
        return 3;
      };

      f[0x38] = function (pos) {
        // and R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] & p2;
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      //
      // SHIFT
      //

      f[0x39] = function (pos) {
        // shl R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] << reg[p2];
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = (reg[p1] >> 31 & 1) == 1;
        return 2;
      };

      f[0x3A] = function (pos) {
        // shl R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] << p2;
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = (reg[p1] >> 31 & 1) == 1;
        return 2;
      };

      f[0x3D] = function (pos) {
        // shr R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] >> reg[p2];
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = (reg[p1] & 1) == 1;
        return 2;
      };

      f[0x3E] = function (pos) {
        // shr R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] >> p2;
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = (reg[p1] & 1) == 1;
        return 2;
      };

      //
      // NOT
      //

      f[0x41] = function (pos) {
        // not
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);

        var r = ~reg[p1];
        reg[p1] = _this2._affectFlags(r);
        return 1;
      };

      //
      // ARITHMETIC
      //

      f[0x42] = function (pos) {
        // add R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] + reg[p2] + (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x43] = function (pos) {
        // add R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] + p2 + (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r > 0xFFFFFFFF;
        return 2;
      };

      f[0x44] = function (pos) {
        // add R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] + p2 + (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r > 0xFFFFFFFF;
        return 3;
      };

      f[0x45] = function (pos) {
        // add R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] + p2 + (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r > 0xFFFFFFFF;
        return 5;
      };

      f[0x46] = function (pos) {
        // sub R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] - reg[p2] - (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r < 0;
        return 2;
      };

      f[0x47] = function (pos) {
        // sub R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] - p2 - (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r < 0;
        return 2;
      };

      f[0x48] = function (pos) {
        // sub R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] - p2 - (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r < 0;
        return 3;
      };

      f[0x49] = function (pos) {
        // sub R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] - p2 - (_this2.Y ? 1 : 0);
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r < 0;
        return 5;
      };

      f[0x4A] = function (pos) {
        // cmp R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        _this2._affectFlags(reg[p1] - reg[p2], 32);
        _this2.LT = reg[p1] < reg[p2];
        _this2.GT = reg[p1] > reg[p2];
        _this2.Y = reg[p1] - reg[p2] < 0;
        return 2;
      };

      f[0x4B] = function (pos) {
        // cmp R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        _this2._affectFlags(reg[p1] - p2, 8);
        _this2.LT = reg[p1] < p2;
        _this2.GT = reg[p1] > p2;
        _this2.Y = reg[p1] - p2 < 0;
        return 2;
      };

      f[0x4C] = function (pos) {
        // cmp R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        _this2._affectFlags(reg[p1] - p2, 16);
        _this2.LT = reg[p1] < p2;
        _this2.GT = reg[p1] > p2;
        _this2.Y = reg[p1] - p2 < 0;
        return 3;
      };

      f[0x4D] = function (pos) {
        // cmp R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        _this2._affectFlags(reg[p1] - p2, 32);
        _this2.LT = reg[p1] < p2;
        _this2.GT = reg[p1] > p2;
        _this2.Y = reg[p1] - p2 < 0;
        return 5;
      };

      f[0x4E] = function (pos) {
        // mul R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] * reg[p2];
        reg[p1] = _this2._affectFlags(r);
        _this2.V = r > 0xFFFFFFFF;
        return 2;
      };

      f[0x4F] = function (pos) {
        // mul R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] * p2;
        reg[p1] = _this2._affectFlags(r);
        _this2.V = r > 0xFFFFFFFF;
        return 2;
      };

      f[0x50] = function (pos) {
        // mul R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] * p2;
        reg[p1] = _this2._affectFlags(r);
        _this2.V = r > 0xFFFFFFFF;
        return 3;
      };

      f[0x51] = function (pos) {
        // mul R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] * p2;
        reg[p1] = _this2._affectFlags(r);
        _this2.V = r > 0xFFFFFFFF;
        return 5;
      };

      f[0x52] = function (pos) {
        // idiv R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = Math.floor(reg[p1] / reg[p2]);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x53] = function (pos) {
        // idiv R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = Math.floor(reg[p1] / p2);
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x54] = function (pos) {
        // idiv R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = Math.floor(reg[p1] / p2);
        reg[p1] = _this2._affectFlags(r);
        return 3;
      };

      f[0x55] = function (pos) {
        // idiv R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = Math.floor(reg[p1] / p2);
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      f[0x56] = function (pos) {
        // mod R, R
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] % reg[p2];
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x57] = function (pos) {
        // mod R, v8
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get(pos + 1);

        var r = reg[p1] % p2;
        reg[p1] = _this2._affectFlags(r);
        return 2;
      };

      f[0x58] = function (pos) {
        // mod R, v16
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get16(pos + 1);

        var r = reg[p1] % p2;
        reg[p1] = _this2._affectFlags(r);
        return 3;
      };

      f[0x59] = function (pos) {
        // mod R, v32
        var reg = _this2._reg;
        var mb = _this2._mb;
        var p1 = mb.get(pos);
        var p2 = mb.get32(pos + 1);

        var r = reg[p1] % p2;
        reg[p1] = _this2._affectFlags(r);
        return 5;
      };

      f[0x5A] = function (pos) {
        // inc R
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        var r = reg[p1] + 1;
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r > 0xFFFFFFFF;
        return 1;
      };

      f[0x5B] = function (pos) {
        // dec R
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        var r = reg[p1] - 1;
        reg[p1] = _this2._affectFlags(r);
        _this2.Y = r < 0;
        return 1;
      };

      //
      // BRANCHES
      //

      f[0x5C] = function (pos) {
        // bz A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.Z) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x5D] = function (pos) {
        // bz v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.Z) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x5E] = function (pos) {
        // bz A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (!_this2.Z) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x5F] = function (pos) {
        // bz v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (!_this2.Z) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x60] = function (pos) {
        // bneg A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.S) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x61] = function (pos) {
        // bneg v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.S) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x62] = function (pos) {
        // bpos A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (!_this2.S) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x63] = function (pos) {
        // bpos v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (!_this2.S) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x64] = function (pos) {
        // bgt A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.GT) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x65] = function (pos) {
        // bgt v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.GT) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x66] = function (pos) {
        // bgte A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.GT && _this2.Z) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x67] = function (pos) {
        // bgte v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.GT && _this2.Z) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x68] = function (pos) {
        // blt A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.LT) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x69] = function (pos) {
        // blt v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.LT) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x6A] = function (pos) {
        // blte A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.LT && _this2.Z) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x6B] = function (pos) {
        // blte v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.LT && _this2.Z) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x6C] = function (pos) {
        // bv A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (_this2.V) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x6D] = function (pos) {
        // bv v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (_this2.V) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x6E] = function (pos) {
        // bv A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get(pos);
        if (!_this2.V) {
          _this2.PC = reg[p1];
          return 0;
        }
        return 1;
      };

      f[0x6F] = function (pos) {
        // bv v32
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = mb.get32(pos);
        if (!_this2.V) {
          _this2.PC = p1;
          return 0;
        }
        return 4;
      };

      f[0x70] = function (pos) {
        // jmp A
        var reg = _this2._reg;
        var mb = _this2._mb;

        var p1 = _this2._mb.get(pos);
        _this2.PC = _this2._reg[p1];
        return 0;
      };

      f[0x71] = function (pos) {
        // jmp v32
        var p1 = _this2._mb.get32(pos);
        _this2.PC = p1;
        return 0;
      };

      f[0x72] = function (pos) {
        // jsr A
        var p1 = _this2._mb.get(pos);
        _this2._push32(_this2.PC + 2);
        _this2.PC = _this2._reg[p1];
        return 0;
      };

      f[0x73] = function (pos) {
        // jsr v32
        var p1 = _this2._mb.get32(pos);
        _this2._push32(_this2.PC + 5);
        _this2.PC = p1;
        return 0;
      };

      f[0x74] = function (pos) {
        // ret
        _this2.PC = _this2._pop32();
        return 0;
      };

      f[0x75] = function (pos) {
        // sys R
        var p1 = _this2._mb.get(pos);
        // TODO - enter supervisor mode
        _this2._push32(_this2.PC + 2);
        _this2.PC = _this2._syscallVector[_this2._reg[p1] & 0xFF];
        return 0;
      };

      f[0x76] = function (pos) {
        // sys v8
        var p1 = _this2._mb.get(pos);
        // TODO - enter supervisor mode
        _this2._push32(_this2.PC + 2);
        _this2.PC = _this2._syscallVector[p1];
        return 0;
      };

      f[0x77] = function (pos) {
        // iret
        _this2.PC = _this2._pop32();
        _this2.T = true;
        return 0;
      };

      f[0x86] = function (pos) {
        // sret
        _this2.PC = _this2._pop32();
        // TODO - leave supervisor mode
        return 0;
      };

      f[0x78] = function (pos) {
        // pushb R
        var p1 = _this2._mb.get(pos);
        _this2._push(_this2._reg[p1] & 0xFF);
        return 1;
      };

      f[0x79] = function (pos) {
        // pushb v8
        var p1 = _this2._mb.get(pos);
        _this2._push(p1);
        return 1;
      };

      f[0x7A] = function (pos) {
        // pushw R
        var p1 = _this2._mb.get(pos);
        _this2._push16(_this2._reg[p1] & 0xFFFF);
        return 1;
      };

      f[0x7B] = function (pos) {
        // pushw v16
        var p1 = _this2._mb.get16(pos);
        _this2._push16(p1);
        return 2;
      };

      f[0x7C] = function (pos) {
        // pushw R
        var p1 = _this2._mb.get(pos);
        _this2._push32(_this2._reg[p1]);
        return 1;
      };

      f[0x7D] = function (pos) {
        // pushw v16
        var p1 = _this2._mb.get32(pos);
        _this2._push32(p1);
        return 4;
      };

      f[0x7E] = function (pos) {
        // push.a
        for (var i = 0x0; i <= 0xB; ++i) {
          _this2._push32(_this2._reg[i]);
        }
        return 0;
      };

      f[0x7F] = function (pos) {
        // popb R
        var p1 = _this2._mb.get(pos);
        _this2._reg[p1] = _this2._pop();
        return 1;
      };

      f[0x80] = function (pos) {
        // popw R
        var p1 = _this2._mb.get(pos);
        _this2._reg[p1] = _this2._pop16();
        return 1;
      };

      f[0x81] = function (pos) {
        // popw R
        var p1 = _this2._mb.get(pos);
        _this2._reg[p1] = _this2._pop32();
        return 1;
      };

      f[0x82] = function (pos) {
        // pop.a
        for (var i = 0xB; i >= 0x0; --i) {
          _this2._reg[i] = _this2._pop32();
        }
        return 0;
      };

      f[0x83] = function (pos) {
        // popx R
        var p1 = _this2._mb.get(pos);
        for (var i = 0; i < _this2._reg[p1]; ++i) {
          _this2._pop();
        }
        return 1;
      };

      f[0x84] = function (pos) {
        // popx v8
        var p1 = _this2._mb.get(pos);
        for (var i = 0; i < p1; ++i) {
          _this2._pop();
        }
        return 1;
      };

      f[0x85] = function (pos) {
        // popx v16
        var p1 = _this2._mb.get16(pos);
        for (var i = 0; i < p1; ++i) {
          _this2._pop();
        }
        return 2;
      };

      f[0x87] = function (pos) {
        // nop
        return 0;
      };

      return f;
    }
  }, {
    key: 'A',
    get: function get() {
      return this._reg[0];
    },
    set: function set(v) {
      this._reg[0] = v;
    }
  }, {
    key: 'B',
    get: function get() {
      return this._reg[1];
    },
    set: function set(v) {
      this._reg[1] = v;
    }
  }, {
    key: 'C',
    get: function get() {
      return this._reg[2];
    },
    set: function set(v) {
      this._reg[2] = v;
    }
  }, {
    key: 'D',
    get: function get() {
      return this._reg[3];
    },
    set: function set(v) {
      this._reg[3] = v;
    }
  }, {
    key: 'E',
    get: function get() {
      return this._reg[4];
    },
    set: function set(v) {
      this._reg[4] = v;
    }
  }, {
    key: 'F',
    get: function get() {
      return this._reg[5];
    },
    set: function set(v) {
      this._reg[5] = v;
    }
  }, {
    key: 'G',
    get: function get() {
      return this._reg[6];
    },
    set: function set(v) {
      this._reg[6] = v;
    }
  }, {
    key: 'H',
    get: function get() {
      return this._reg[7];
    },
    set: function set(v) {
      this._reg[7] = v;
    }
  }, {
    key: 'I',
    get: function get() {
      return this._reg[8];
    },
    set: function set(v) {
      this._reg[8] = v;
    }
  }, {
    key: 'J',
    get: function get() {
      return this._reg[9];
    },
    set: function set(v) {
      this._reg[9] = v;
    }
  }, {
    key: 'K',
    get: function get() {
      return this._reg[10];
    },
    set: function set(v) {
      this._reg[10] = v;
    }
  }, {
    key: 'L',
    get: function get() {
      return this._reg[11];
    },
    set: function set(v) {
      this._reg[11] = v;
    }
  }, {
    key: 'FP',
    get: function get() {
      return this._reg[12];
    },
    set: function set(v) {
      this._reg[12] = v;
    }
  }, {
    key: 'SP',
    get: function get() {
      return this._reg[13];
    },
    set: function set(v) {
      this._reg[13] = v & 0xFFFFFFFF;
    }
  }, {
    key: 'PC',
    get: function get() {
      return this._reg[14];
    },
    set: function set(v) {
      this._reg[14] = v;
    }
  }, {
    key: 'FL',
    get: function get() {
      return this._reg[15];
    },
    set: function set(v) {
      this._reg[15] = v;
    }
  }, {
    key: 'Y',
    get: function get() {
      return this._reg[15] & 0x1 ? true : false;
    },


    // jscs:disable validateIndentation
    set: function set(v) {
      if (v) this._reg[15] |= 1 << 0;else this._reg[15] &= ~(1 << 0);
    }
  }, {
    key: 'V',
    get: function get() {
      return this._reg[15] >> 1 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) this._reg[15] |= 1 << 1;else this._reg[15] &= ~(1 << 1);
    }
  }, {
    key: 'Z',
    get: function get() {
      return this._reg[15] >> 2 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) this._reg[15] |= 1 << 2;else this._reg[15] &= ~(1 << 2);
    }
  }, {
    key: 'S',
    get: function get() {
      return this._reg[15] >> 3 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) this._reg[15] |= 1 << 3;else this._reg[15] &= ~(1 << 3);
    }
  }, {
    key: 'GT',
    get: function get() {
      return this._reg[15] >> 4 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) this._reg[15] |= 1 << 4;else this._reg[15] &= ~(1 << 4);
    }
  }, {
    key: 'LT',
    get: function get() {
      return this._reg[15] >> 5 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) {
        this._reg[15] |= 1 << 5;
      } else {
        this._reg[15] &= ~(1 << 5);
      }
    }
  }, {
    key: 'P',
    get: function get() {
      return this._reg[15] >> 6 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) {
        this._reg[15] |= 1 << 6;
      } else {
        this._reg[15] &= ~(1 << 6);
      }
    }
  }, {
    key: 'T',
    get: function get() {
      return this._reg[15] >> 7 & 0x1 ? true : false;
    },
    set: function set(v) {
      if (v) {
        this._reg[15] |= 1 << 7;
      } else {
        this._reg[15] &= ~(1 << 6);
      }
    }
  }]);
  return CPU;
}(Device);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],120:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Device = function (_LSBStorage) {
  (0, _inherits3.default)(Device, _LSBStorage);

  function Device() {
    (0, _classCallCheck3.default)(this, Device);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Device).call(this));

    _this.interruptNumber = 0; // set externally
    _this.mb = null;

    // abstract class
    if (_this.constructor === LSBStorage) {
      throw new TypeError('Abstact class cannot be instantiated.');
    }

    // a few assertions
    if (_this.name().length > 13) {
      throw new Error('Name must not be longer than 13 bytes');
    }
    var found = false;
    for (var d in Device.Type) {
      if (Device.Type[d] === _this.deviceType()) {
        found = true;
      }
    }
    if (!found) {
      throw new Error('Invalid device type "' + _this.deviceType() + '"');
    }
    if (_this.version() > 0xFF) {
      throw new Error('Maximum version is 0xFF');
    }
    if (_this.memorySize() < 0x1000) {
      throw new Error('Memory must be at least 0x1000 bytes.');
    }
    return _this;
  }

  (0, _createClass3.default)(Device, [{
    key: 'initializeConstants',
    value: function initializeConstants(addr) {
      var ks = this.constantList();
      for (var k in ks) {
        this[k] = ks[k] + addr;
      }
    }
  }, {
    key: 'name',
    value: function name() {
      throw new Error('Implement this method');
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      throw new Error('Implement this method');
    }
  }, {
    key: 'version',
    value: function version() {
      throw new Error('Implement this method');
    }
  }, {
    key: 'memorySize',
    value: function memorySize() {
      return 0x1000; // this method can be implement by the children
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return false; // this method can be implement by the children
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {}; // this method can be implement by the children
    }
  }, {
    key: 'fireInterrupt',
    value: function fireInterrupt() {
      if (this.mb) {
        this.mb.pushInterrupt(this.interruptNumber);
      }
    }
  }, {
    key: 'step',
    value: function step(cycles) {
      // this method can be implement by the children
    }
  }, {
    key: 'reset',
    value: function reset() {
      // this method can be implement by the children
    }
  }, {
    key: 'get',
    value: function get(a) {
      switch (a) {
        case 0x0:
          return this.deviceType();
        case 0x1:
          return this.version();
        case 0x2:
          return this.interruptNumber;
      }
      if (a >= 0x3 && a <= 0xF) {
        if (a - 0x3 >= this.name().length) {
          return 0;
        } else {
          return this.name().charCodeAt(a - 0x3);
        }
      }
      return 0;
      // this method can be completed by the children
    }
  }, {
    key: 'set',
    value: function set(a) {
      // this method can be implement by the children
    }
  }]);
  return Device;
}(LSBStorage);

Device.Type = {
  MOTHERBOARD: 0x00,
  MMU: 0x01,
  CPU: 0x02,
  STORAGE: 0x03,
  KEYBOARD: 0x04,
  TIMER: 0x05,
  BIOS: 0x06,
  VIDEO: 0x07,
  // other
  OTHER_INPUT: 0x80,
  OTHER_OUTPUT: 0x81,
  // special devices
  RAM: 0xFD,
  MOTHERBOARD: 0xFE,
  UNUSED: 0xFF
};

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],121:[function(require,module,exports){
'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keyboard = function (_Device) {
  (0, _inherits3.default)(Keyboard, _Device);

  function Keyboard() {
    (0, _classCallCheck3.default)(this, Keyboard);


    // initialize constants

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Keyboard).call(this));

    _this.KBD_MODE_POLL = 0x0;
    _this.KBD_MODE_INTERRUPT = 0x1;
    _this.KBD_OP_POP = 0x1;

    // initialize keyboard
    _this._const = _this.constantList();
    _this._queue = [];
    _this._mode = _this.KBD_MODE_POLL;
    return _this;
  }

  (0, _createClass3.default)(Keyboard, [{
    key: 'name',
    value: function name() {
      return 'LuisaKeyboard';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.KEYBOARD;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0x0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return true;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        KBD_TYPE: 0x00,
        KBD_VERSION: 0x01,
        KBD_INTERRUPT: 0x02,
        KDB_NAME: 0x03,
        KBD_MODE: 0x10,
        KBD_QUEUE_FULL: 0x11,
        KBD_DEQUEUE: 0x12,
        KBD_FRONT: 0x14
      };
    }
  }, {
    key: 'addEvent',
    value: function addEvent(event) {
      if ((typeof event === 'undefined' ? 'undefined' : (0, _typeof3.default)(event)) !== 'object') {
        throw new Error('Hash expected');
      } else if (event.event === undefined || event.shift === undefined || event.control === undefined || event.alt === undefined || event.key === undefined) {
        throw new Error('Expected format: { event, shift, control, alt, key }');
      } else if (event.event !== 'press' && event.event !== 'release') {
        throw new Error('Event must be one of press/release');
      }
      if (this._queue.length < Keyboard.QUEUE_SIZE) {
        this._queue.push((event.event === 'release' ? 1 : 0) << 0x1F | (event.shift ? 1 : 0) << 0x1E | (event.control ? 1 : 0) << 0x1D | (event.alt ? 1 : 0) << 0x1C | event.key & 0xFFFFFF);
        if (this._mode == this.KBD_MODE_INTERRUPT) {
          this.fireInterrupt();
        }
      }
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(Keyboard.prototype), 'get', this).call(this, a);
      } else if (a === this._const.KBD_MODE) {
        return this._mode;
      } else if (a === this._const.KBD_QUEUE_FULL) {
        return this._queue.length === Keyboard.QUEUE_SIZE ? 1 : 0;
      } else if (a === this._const.KBD_DEQUEUE) {
        this._queue.shift();
      } else if (a >= this._const.KBD_FRONT || a < this._const.KBD_FRONT + 4) {
        var v = this._queue.length === 0 ? 0 : this._queue[0];
        switch (a % 4) {
          case 0:
            return v & 0xFF;
          case 1:
            return v >> 8 & 0xFF;
          case 2:
            return v >> 16 & 0xFF;
          case 3:
            return v >> 24 & 0xFF;
        }
      }
      return 0;
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Keyboard.prototype), 'set', this).call(this, a, v);
      } else if (a === this._const.KBD_MODE) {
        this._mode = v;
      }
    }
  }, {
    key: 'queue',
    get: function get() {
      return this._queue.slice();
    }
  }]);
  return Keyboard;
}(Device);

Keyboard.QUEUE_SIZE = 16;

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"babel-runtime/helpers/typeof":20}],122:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LSBStorage = function () {
  function LSBStorage() {
    (0, _classCallCheck3.default)(this, LSBStorage);

    if (this.constructor === LSBStorage) {
      throw new TypeError('Abstact class cannot be instantiated.');
    }
  }

  (0, _createClass3.default)(LSBStorage, [{
    key: 'get16',
    value: function get16(a) {
      return this.get(a + 1) << 8 | this.get(a);
    }
  }, {
    key: 'set16',
    value: function set16(a, v) {
      this.set(a, v & 0xff);
      this.set(a + 1, v >> 8 & 0xff);
    }
  }, {
    key: 'get32',
    value: function get32(a) {
      var v = this.get(a + 3) << 24 | this.get(a + 2) << 16 | this.get(a + 1) << 8 | this.get(a);
      return v >>> 0; // HACK: convert to Uint32 (see http://goo.gl/8c4IxT)
    }
  }, {
    key: 'set32',
    value: function set32(a, v) {
      this.set(a, v & 0xff);
      this.set(a + 1, v >>> 8 & 0xff);
      this.set(a + 2, v >>> 16 & 0xff);
      this.set(a + 3, v >>> 24);
    }
  }, {
    key: 'getString',
    value: function getString(a, sz) {
      var str = [];
      for (var i = 0; i < sz; ++i) {
        str.push(String.fromCharCode(this.get(a + i)));
      }
      return str.join('');
    }
  }, {
    key: 'setString',
    value: function setString(a, v) {
      for (var i = 0; i < v.length; ++i) {
        this.set(a + i, v.charCodeAt(i));
      }
    }
  }, {
    key: 'getArray',
    value: function getArray(pos, sz) {
      var a = [];
      for (var i = pos; i < pos + sz; ++i) {
        a.push(this.get(i));
      }
      return a;
    }
  }, {
    key: 'setArray',
    value: function setArray(pos, array) {
      for (var i = 0; i < array.length; ++i) {
        this.set(i + pos, array[i]);
      }
    }
  }]);
  return LSBStorage;
}();

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14}],123:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LuisaVM = function () {
  function LuisaVM(ramSizeKb, storageUnits, biosCode, screenWidth, screenHeight, callback) {
    (0, _classCallCheck3.default)(this, LuisaVM);

    this.mb = new Motherboard();
    this.mmu = new MMU(new RAM(ramSizeKb));
    this.cpu = new CPU(this.mb);
    this.storage = new Storage(storageUnits);
    this.keyboard = new Keyboard();
    this.timer = new Timer();
    this.bios = new BIOS(biosCode);
    this.video = new Video(screenWidth, screenHeight, callback);

    this.mb.addDevice(this.mmu);
    this.mb.addDevice(this.cpu);
    this.mb.addDevice(this.storage);
    this.mb.addDevice(this.keyboard);
    this.mb.addDevice(this.timer);
    this.mb.addDevice(this.bios);
    this.mb.addDevice(this.video);
  }

  (0, _createClass3.default)(LuisaVM, [{
    key: 'step',
    value: function step() {
      this.mb.step();
    }
  }]);
  return LuisaVM;
}();

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14}],124:[function(require,module,exports){
/* 
 * MMU (Memory management unit)
 * ----------------------------
 *
 * Coordinate virtual memory management and translate memory access addresses.
 *
 * - Expected position: 0xF0001000
 * - Size: 32 bytes
 *
 * - Interrupt: 2
 *     Fired on the following memory errors:
 *       - MMU_ERR_NONE (0x0)
 *       - MMU_ERR_OUT_OF_BOUNDS (0x1)
 *       - MMU_PAGE_FAULT (0x2)
 *
 * - Registers:
 *           0000  Device type
 *           0001  Device version
 *     0003..000F  Device name
 *     0010..0013  MMU_RAM_SZ:  Physical memory size
 *     0014..0017  MMU_ERR:     Last error (see Interrupt for values)
 *           0018  MMU_VMEM:    Virtual memory activation
 *
 * 
 * VIRTUAL MEMORY
 * --------------
 *
 * Virtual memory is activated by setting the 31th bit of VMEM. If the virtual 
 * memory is enabled, the process for finding the physical address is this:
 *
 * 1. Divide the accessed address and find the directory index, the page table
 *    index and the page offset:
 *       00..0B - Page offset (12 bits, max value 0xFFF)
 *       0C..15 - Page table offset (10 bits, max value 0x3FF)
 *       16..1F - Page directory offset (10 bits, max value 0x3FF)
 *
 * 2. Go to the page directory set in the VMEM register. Each page is 0x1000
 *    (4096 bytes) in size, so to find the starting address of the page, the
 *    value is multiplied by 0x1000.
 *
 * 3. Find the address offset in the page directory. Since each record is 4
 *    bytes long, the offset is the beginning of the page directory + (offset * 4).
 *    This address will contain a 4-byte value, which is the the page that 
 *    contains the page table.
 *
 * 4. The page table page value is multipled by 0x1000 to find the beginning 
 *    of the page. To that value is added the page table offset * 4. This contain
 *    the memory page that contains the information.
 *
 * 5. The final data is found in page beginning + page offset.
 *
 *
 * PAGE INDEX FORMAT
 * -----------------
 *
 *     11111111111111110000000000000000
 *     FEDCBA9876543210FEDCBA9876543210
 *
 *     AxxxxxxxxxPPPPPPPPPPPPPPPPPPPPPP
 *     
 *     A = active
 *     x = doesn't matter
 *     P = page index (24 bits)
 */

'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MMU = function (_Device) {
  (0, _inherits3.default)(MMU, _Device);

  function MMU(ram) {
    (0, _classCallCheck3.default)(this, MMU);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MMU).call(this));

    _this._ram = ram;
    _this.reset();

    _this.MMU_ERR_NONE = 0x0;
    _this.MMU_ERR_OUT_OF_BOUNDS = 0x1;
    _this.MMU_PAGE_FAULT = 0x2;
    return _this;
  }

  (0, _createClass3.default)(MMU, [{
    key: 'reset',
    value: function reset() {
      this._active = false;
      this._lastError = 0;
      this._vmem = {
        active: false,
        page: 0
      };
    }
  }, {
    key: 'name',
    value: function name() {
      return 'LuisaMMU';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.MMU;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return true;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        MMU_TYPE: 0x00,
        MMU_VERSION: 0x01,
        MMU_INTERRUPT: 0x02,
        MMU_NAME: 0x03,
        MMU_RAM_SZ: 0x10,
        MMU_VMEM: 0x14,
        MMU_ERR: 0x18
      };
    }
  }, {
    key: 'translate',
    value: function translate(a) {
      if (this._vmem.active) {
        var pageOffset = a & 0xFFF;
        var pageTableOffset = a >> 12 & 0x3FF;
        var pageDirectoryOffset = a >> 22 & 0x3FF;

        var pageDirectoryAddress = this._vmem.page * 0x1000 + pageDirectoryOffset * 4;
        var pageTableData = this._ram.get32(pageDirectoryAddress);
        var pageTable = {
          page: pageTableData & 0xFFFF,
          active: pageTableData >> 31 ? true : false
        };
        if (!pageTable.active) {
          var e = new Error();
          e.name = 'page fault';
          throw e;
        }
        var pageTableAddress = pageTable.page * 0x1000 + pageTableOffset * 4;
        var pageData = this._ram.get32(pageTableAddress);
        var page = {
          page: pageData & 0xFFFF,
          active: pageData >> 31 ? true : false
        };
        if (!page.active) {
          var e = new Error();
          e.name = 'page fault';
          throw e;
        }

        var location = page.page * 0x1000 + pageOffset;
        return location;
      } else {
        return a;
      }
    }
  }, {
    key: 'get',
    value: function get(a) {
      switch (a) {
        // MMU_RAM_SZ
        case 0x10:
          return this._ram.size & 0xFF;
        case 0x11:
          return this._ram.size >> 8 & 0xFF;
        case 0x12:
          return this._ram.size >> 16 & 0xFF;
        case 0x13:
          return this._ram.size >> 24 & 0xFF;
        // MMU_VMEM
        case 0x14:
          return this._vmem.page & 0xFF;
        case 0x15:
          return this._vmem.page >> 8 & 0xFF;
        case 0x16:
          return 0;
        case 0x17:
          return this._vmem.active ? 0x80 : 0x0;
        // MMU_ERR
        case 0x18:
          return this._lastError & 0xFF;
        case 0x19:
          return this._lastError >> 8 & 0xFF;
        case 0x1A:
          return this._lastError >> 16 & 0xFF;
        case 0x1B:
          return this._lastError >> 24 & 0xFF;
        // others
        default:
          return (0, _get3.default)((0, _getPrototypeOf2.default)(MMU.prototype), 'get', this).call(this, a);
      }
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      switch (a) {
        // MMU_VMEM
        case 0x14:
          this._vmem.page &= ~0xFF;
          this._vmem.page |= v & 0xFF;
          break;
        case 0x15:
          this._vmem.page &= ~0xFF00;
          this._vmem.page |= v << 8 & 0x7F;
          break;
        case 0x17:
          this._vmem.active = v >> 7 ? true : false;
          break;
        // MMU_ERR
        case 0x18:
          this._lastError &= ~0xFF;
          this._lastError |= v & 0xFF;
          break;
        case 0x19:
          this._lastError &= ~0xFF00;
          this._lastError |= v << 8;
          break;
        case 0x1A:
          this._lastError &= ~0xFF0000;
          this._lastError |= v << 16;
          break;
        case 0x1B:
          this._lastError &= ~0xFF000000;
          this._lastError |= v << 24;
          break;
        default:
          (0, _get3.default)((0, _getPrototypeOf2.default)(MMU.prototype), 'set', this).call(this, a, v);
      }
    }
  }, {
    key: 'getMemory',
    value: function getMemory(a) {
      try {
        return this._ram.get(this.translate(a));
      } catch (e) {
        if (e.name === 'out of bounds') {
          this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
          return 0;
        } else {
          throw e;
        }
      }
    }
  }, {
    key: 'setMemory',
    value: function setMemory(a, v) {
      try {
        this._ram.set(this.translate(a), v);
      } catch (e) {
        if (e.name === 'out of bounds') {
          this.fireInterrupt(this.MMU_ERR_OUT_OF_BOUNDS);
        } else {
          throw e;
        }
      }
    }
  }, {
    key: 'fireInterrupt',
    value: function fireInterrupt(err) {
      this._lastError |= err;
      (0, _get3.default)((0, _getPrototypeOf2.default)(MMU.prototype), 'fireInterrupt', this).call(this);
    }
  }, {
    key: 'active',
    get: function get() {
      return this._vmem.active;
    }
  }]);
  return MMU;
}(Device);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],125:[function(require,module,exports){
/* 
 * MOTHERBOARD
 * -----------
 *
 * Controls all the other devices.
 *
 * - Max number of devices: 256
 * - Expected position: 0xF0000000
 * - Size: 0x1000 bytes
 *
 * - Interrupt: 1
 *     Fired when invalid memory address (> 0xF0000000) is accessed,
 *     or tried to be written.
 *
 * - Registers:
 *     0000..03FF  Device address (one device each 4 bytes)
 *           0400  Interrupt reason: (MB_ERR_UNAUTH_READ, MB_ERR_UNAUTH_WRITE)
 *
 * - Special memory access:
 *     FFFFFFFC..FFFFFFFF   Initial CPU address
 *
 */

'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Motherboard = function (_LSBStorage) {
  (0, _inherits3.default)(Motherboard, _LSBStorage);

  function Motherboard() {
    (0, _classCallCheck3.default)(this, Motherboard);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Motherboard).call(this));

    _this._devices = [];
    _this._addr = 0xF0001000;
    _this._interruptCount = 1;
    _this._mmu = null;
    _this._cpu = null;
    _this._memory = new RAM(4); // internal memory
    _this._initialAddress = 0; // changed when the BIOS is installed

    // constants
    _this.MB_DEV_ADDR = 0xF0000000;
    _this.MB_ERR = 0xF0000400;
    _this.MB_CPU_INIT = 0xFFFFFFFD;
    _this.MB_ERR_NONE = 0x0;
    _this.MB_ERR_UNAUTH_READ = 0x1;
    _this.MB_ERR_UNAUTH_WRITE = 0x2;
    return _this;
  }

  (0, _createClass3.default)(Motherboard, [{
    key: 'reset',
    value: function reset() {
      this._memory.reset();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.devices), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var d = _step.value;

          d.reset();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'addDevice',
    value: function addDevice(dev) {
      // add device
      this._devices.push(dev);
      dev.initializeConstants(this._addr);
      dev.addr = this._addr;
      dev.mb = this;
      this._memory.set32((this._devices.length - 1) * 4, this._addr);
      this._addr += dev.memorySize();

      // add interrupt
      if (dev.hasInterrupt()) {
        dev.interruptNumber = ++this._interruptCount;
      }

      // device specific actions
      if (dev.deviceType() === Device.Type.MMU) {
        this._mmu = dev;
      } else if (dev.deviceType() === Device.Type.CPU) {
        this._cpu = dev;
      } else if (dev.deviceType() === Device.Type.BIOS) {
        this._cpu.PC = dev.BIOS_CODE;
      }
    }
  }, {
    key: 'step',
    value: function step() {
      // step devices (including CPU)
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._devices), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var d = _step2.value;

          d.step();
        }

        // step CPU
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this._cpu) {
        this._cpu.checkInterrupts();
      }
    }
  }, {
    key: 'get',
    // clone array to not allow copying
    value: function get(a) {
      if (a < 0xF0000000 && this._mmu) {
        return this._mmu.getMemory(a);
      } else if (a >= 0xF0000000 && a < 0xF0001000) {
        return this._memory.get(a - 0xF0000000);
      } else if (a >= 0xFFFFFFFC) {
        return this._initialAddress & 0xFF;
      } else if (a >= 0xFFFFFFFD) {
        return this._initialAddress >> 8 & 0xFF;
      } else if (a >= 0xFFFFFFFE) {
        return this._initialAddress >> 16 & 0xFF;
      } else if (a >= 0xFFFFFFFF) {
        return this._initialAddress >> 24 & 0xFF;
      } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(this._devices), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var d = _step3.value;

            if (a >= d.addr && a < d.addr + d.memorySize()) {
              return d.get(a - d.addr);
            }
          }
          // fire interrupt
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        this._memory.set(0x400, this.MB_ERR_UNAUTH_READ);
        this.pushInterrupt(0x1);
        return 0;
      }
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0xF0000000 && this._mmu) {
        this._mmu.setMemory(a, v);
      } else if (a == 0xF0000400) {
        this._memory[0x400] = v;
      } else if (a >= 0xF0000000 && a < 0xF0001000) {
        // fire interrupt
        this._memory.set(0x400, this.MB_ERR_UNAUTH_WRITE);
        this.pushInterrupt(0x1);
      } else {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _getIterator3.default)(this._devices), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var d = _step4.value;

            if (a >= d.addr && a < d.addr + d.memorySize()) {
              d.set(a - d.addr, v);
              return;
            }
          }
          // fire interrupt
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        this._memory.set(0x400, this.MB_ERR_UNAUTH_WRITE);
        this.pushInterrupt(0x1);
      }
    }
  }, {
    key: 'pushInterrupt',
    value: function pushInterrupt(n) {
      if (this._cpu) {
        this._cpu.pushInterrupt(n);
      }
    }
  }, {
    key: 'memoryMap',
    value: function memoryMap() {
      var map = [];
      if (this._mmu) {
        map.push({
          addr: 0,
          deviceType: Device.Type.RAM,
          size: this._mmu.active() ? 0xF0000000 : this._mmu.ramSize()
        });
      }
      if (this._mmu.ramSize() < 0xF0000000 && !this._mmu.active()) {
        map.push({
          addr: this._mmu.ramSize(),
          deviceType: Device.Type.UNUSED,
          size: 0xF0000000 - this._mmu.ramSize()
        });
      }
      map.push({ addr: 0xF0000000, deviceType: Device.Type.MOTHERBOARD, size: 0x1000 });
      var addr = 0xF0001000;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)(this._devices), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var d = _step5.value;

          map.push({ addr: addr, deviceType: d.deviceType(), size: d.memorySize() });
          addr += d.memorySize();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      map.push({ addr: addr, deviceType: Device.Type.UNUSED, size: 0x100000000 - addr });
      return map;
    }
  }, {
    key: 'devices',
    get: function get() {
      return this._devices.slice(0);
    }
  }]);
  return Motherboard;
}(LSBStorage);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],126:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RAM = function (_LSBStorage) {
  (0, _inherits3.default)(RAM, _LSBStorage);

  function RAM(_sizeKb) {
    (0, _classCallCheck3.default)(this, RAM);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RAM).call(this));

    _this._size = _sizeKb * 1024;
    _this.reset();
    return _this;
  }

  (0, _createClass3.default)(RAM, [{
    key: 'reset',
    value: function reset() {
      this._data = new Uint8Array(this._size);
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0 || a >= this._size) {
        var e = new Error();
        e.name = 'out of bounds';
        throw e;
      } else {
        return this._data[a];
      }
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0 || a >= this._size) {
        var e = new Error();
        e.name = 'out of bounds';
        throw e;
      } else if (v < 0 || v > 0xFF) {
        var e = new Error();
        e.name = 'invalid data (' + v + ')';
        throw e;
      } else {
        this._data[a] = v;
      }
    }
  }, {
    key: 'size',
    get: function get() {
      return this._size;
    }
  }]);
  return RAM;
}(LSBStorage);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],127:[function(require,module,exports){
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function (_Device) {
  (0, _inherits3.default)(Storage, _Device);

  function Storage(units) {
    (0, _classCallCheck3.default)(this, Storage);


    // check sanity

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Storage).call(this));

    if (units === undefined || units.constructor !== Array) {
      throw new Error('`units` must be an array.');
    }
    if (units.length > 4) {
      throw new Error('Maximum of 4 units');
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(units), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var u = _step.value;

        if (!u.get || !u.set || !u.size) {
          throw new Error('Missing method in unit');
        }
      }

      // STG_OP commands
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _this.STG_OP_READ = 0x1;
    _this.STG_OP_WRITE = 0x2;
    _this.STG_OP_SIZE = 0x3;

    // STG_MODE options
    _this.STG_MODE_POLL = 0x0;
    _this.STG_MODE_INTERRUPT = 0x1;

    // STG_OP_STATUS responses
    _this.STG_STATUS_OK = 0x0;
    _this.STG_STATUS_WAITING = 0x1;
    _this.STG_STATUS_ADDRESS_ERROR = 0x2;
    _this.STG_STATUS_UNAVALIABLE = 0x3;
    _this.STG_STATUS_PHYSICAL_ERROR = 0x4;

    // initialize
    _this._units = units;
    _this._const = _this.constantList();

    _this._mode = _this.STG_MODE_POLL;
    _this._status = _this.STG_STATUS_OK;
    _this._p = new Uint32Array(8);
    _this._r = new Uint32Array(2);
    return _this;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'name',
    value: function name() {
      return 'LuisaStorage';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.STORAGE;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0x0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return true;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        STG_TYPE: 0x00,
        STG_VERSION: 0x01,
        STG_INTERRUPT: 0x02,
        STG_NAME: 0x03,
        STG_MODE: 0x10,
        STG_OP_STATUS: 0x11,
        STG_UNIT_LIST: 0x12,
        STG_OP: 0x13,
        STG_P0: 0x14,
        STG_P1: 0x18,
        STG_P2: 0x1C,
        STG_P3: 0x20,
        STG_P4: 0x24,
        STG_P5: 0x28,
        STG_P6: 0x2C,
        STG_P7: 0x30,
        STG_R0: 0x34,
        STG_R1: 0x38
      };
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(Storage.prototype), 'get', this).call(this, a);
      } else if (a == this._const.STG_MODE) {
        return this._mode;
      } else if (a == this._const.STG_OP_STATUS) {
        return this._status;
      } else if (a == this._const.STG_UNIT_LIST) {
        // unit list
        var n = 0;
        for (var i in this._units) {
          n <<= 1;n |= 1;
        }
        return n;
      } else {
        var v = undefined;
        if (a >= this._const.STG_P0 && a < this._const.STG_P0 + 0x20) {
          v = this._p[Math.floor((a - this._const.STG_P0) / 4)];
        } else if (a >= this._const.STG_R0 && a < this._const.STG_R0 + 0x8) {
          v = this._r[Math.floor((a - this._const.STG_R0) / 4)];
        }
        if (v !== undefined) {
          switch (a % 4) {
            case 0:
              return v & 0xFF;
            case 1:
              return v >> 8 & 0xFF;
            case 2:
              return v >> 16 & 0xFF;
            case 3:
              return v >> 24 & 0xFF;
          }
        }
      }
      return 0;
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Storage.prototype), 'set', this).call(this, a, v);
      } else if (a == this._const.STG_MODE) {
        this._mode = a == 0 ? this.STG_MODE_POLL : this.STG_MODE_INTERRUPT;
      } else if (a == this._const.STG_OP) {
        this._r = this._execute(v);
      } else {
        var r = undefined,
            arr = undefined;
        if (a >= this._const.STG_P0 && a < this._const.STG_P0 + 0x20) {
          r = Math.floor((a - this._const.STG_P0) / 4);
          arr = this._p;
        }
        if (arr) {
          switch (a % 4) {
            case 0:
              arr[r] &= ~0xFF;arr[r] |= v;
              break;
            case 1:
              arr[r] &= ~0xFF00;arr[r] |= v << 8;
              break;
            case 2:
              arr[r] &= ~0xFF0000;arr[r] |= v << 16;
              break;
            case 3:
              arr[r] &= ~0xFF000000;arr[r] |= v << 24;
              break;
          }
        }
      }
    }
  }, {
    key: 'fireInterrupt',
    value: function fireInterrupt(status) {
      this._status = status;
      if (this._mode == this.STG_MODE_INTERRUPT) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Storage.prototype), 'fireInterrupt', this).call(this);
      }
    }
  }, {
    key: '_execute',
    value: function _execute(op) {
      // check if unit exists
      if (op === this.STG_OP_READ || op === this.STG_OP_WRITE || op === this.STG_OP_SIZE) {
        if (this._p[0] >= this._units.length) {
          this.fireInterrupt(this.STG_STATUS_UNAVALIABLE);
          return [0, 0];
        }
      }

      if (op === this.STG_OP_SIZE) {
        var r = this._units[this._p[0]].size;
        var upperBytes = Math.floor(r / Math.pow(2, 32));
        var lowerBytes = r & 0xFFFFFFFF;
        return [lowerBytes, upperBytes];
      } else if (op === this.STG_OP_READ) {
        var unit = this._units[this._p[0]];
        var stgLocation = (this._p[1] | Math.floor(this._p[2] * Math.pow(2, 32))) >>> 0;
        var memLocation = this._p[3];
        var size = this._p[4];
        if (stgLocation + size > unit.size) {
          this.fireInterrupt(this.STG_STATUS_ADDRESS_ERROR);
          return [0, 0];
        }
        for (var i = 0; i < size; ++i) {
          this.mb.set(memLocation + i, unit.get(stgLocation + i));
        }
        this.fireInterrupt(this.STG_STATUS_OK);
      } else if (op === this.STG_OP_WRITE) {
        var unit = this._units[this._p[0]];
        var memLocation = this._p[1];
        var stgLocation = (this._p[2] | Math.floor(this._p[3] * Math.pow(2, 32))) >>> 0;
        var size = this._p[4];
        if (stgLocation + size > unit.size) {
          this.fireInterrupt(this.STG_STATUS_ADDRESS_ERROR);
          return [0, 0];
        }
        for (var i = 0; i < size; ++i) {
          unit.set(stgLocation + i, this.mb.get(memLocation + i));
        }
        this.fireInterrupt(this.STG_STATUS_OK);
      }

      return [0, 0];
    }
  }]);
  return Storage;
}(Device);

;

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],128:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timer = function (_Device) {
  (0, _inherits3.default)(Timer, _Device);

  function Timer() {
    (0, _classCallCheck3.default)(this, Timer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Timer).call(this));

    _this._const = _this.constantList();
    _this._dateDiff = new Date(2016, 1, 1).valueOf();
    _this._currentTime = Date.now() - _this._dateDiff;
    _this._timers = new Uint32Array(10);
    _this._counters = new Uint32Array(10);
    _this._lastStep = Date.now();
    _this._interruptCalled = 0;
    return _this;
  }

  (0, _createClass3.default)(Timer, [{
    key: 'name',
    value: function name() {
      return 'LuisaTimer';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.TIMER;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0x0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return true;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        TM_TYPE: 0x00,
        TM_VERSION: 0x01,
        TM_INTERRUPT: 0x02,
        TM_NAME: 0x03,
        TM_CLOCK: 0x10,
        TM_TIMER0: 0x14,
        TM_TIMER1: 0x18,
        TM_TIMER2: 0x1C,
        TM_TIMER3: 0x20,
        TM_TIMER4: 0x24,
        TM_TIMER5: 0x28,
        TM_TIMER6: 0x2C,
        TM_TIMER7: 0x30,
        TM_TIMER8: 0x34,
        TM_TIMER9: 0x38,
        TM_COUNTER0: 0x3C,
        TM_COUNTER1: 0x40,
        TM_COUNTER2: 0x44,
        TM_COUNTER3: 0x48,
        TM_COUNTER4: 0x4C,
        TM_COUNTER5: 0x50,
        TM_COUNTER6: 0x54,
        TM_COUNTER7: 0x58,
        TM_COUNTER8: 0x5C,
        TM_COUNTER9: 0x60,
        TM_CUR_INT: 0x64
      };
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(Timer.prototype), 'get', this).call(this, a);
      } else if (a === this._const.TM_CUR_INT) {
        return this._interruptCalled;
      } else {
        var v = undefined;
        if (a >= this._const.TM_CLOCK && a < this._const.TM_CLOCK + 4) {
          v = this._currentTime;
        } else if (a >= this._const.TM_TIMER0 && a < this._const.TM_TIMER9 + 4) {
          v = this._timers[Math.floor((a - this._const.TM_TIMER0) / 4)];
        } else if (a >= this._const.TM_COUNTER0 && a < this._const.TM_COUNTER9 + 4) {
          v = this._timers[Math.floor((a - this._const.TM_COUNTER0) / 4)];
        }
        if (v !== undefined) {
          switch (a % 4) {
            case 0:
              return v & 0xFF;
            case 1:
              return v >> 8 & 0xFF;
            case 2:
              return v >> 16 & 0xFF;
            case 3:
              return v >> 24 & 0xFF;
          }
        }
      }
      return 0;
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Timer.prototype), 'set', this).call(this, a, v);
      } else {
        var r = undefined;
        if (a >= this._const.TM_TIMER0 && a < this._const.TM_TIMER9 + 0x20) {
          r = Math.floor((a - this._const.TM_TIMER0) / 4);
        }
        if (r !== undefined) {
          switch (a % 4) {
            case 0:
              this._timers[r] &= ~0xFF;this._timers[r] |= v;
              this._counters[r] = 0;
              break;
            case 1:
              this._timers[r] &= ~0xFF00;this._timers[r] |= v << 8;
              this._counters[r] = 0;
              break;
            case 2:
              this._timers[r] &= ~0xFF0000;this._timers[r] |= v << 16;
              this._counters[r] = 0;
              break;
            case 3:
              this._timers[r] &= ~0xFF000000;this._timers[r] |= v << 24;
              this._counters[r] = 0;
              break;
          }
        }
      }
    }
  }, {
    key: 'step',
    value: function step() {
      // We update the current time here. This way, the CPU can
      // do an atomic read in the register, without worring about
      // the time changing between successive reads of the 4 bytes.
      this._currentTime = Date.now() - this._dateDiff;

      // update counters
      var now = Date.now();
      for (var i = 0; i < 10; ++i) {
        if (this._timers[i] !== 0) {
          this._counters[i] += now - this._lastStep;

          if (this._counters[i] >= this._timers[i]) {
            this._counters[i] = 0;
            this._interruptCalled = i;
            this.fireInterrupt();
          }
        }
      }
      this._lastStep = now;
    }
  }]);
  return Timer;
}(Device);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],129:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = function (_Device) {
  (0, _inherits3.default)(Video, _Device);

  function Video(width, height, callback) {
    (0, _classCallCheck3.default)(this, Video);


    // constants

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Video).call(this));

    _this.VID_OP_CLRSCR = 0x2;
    _this.VID_OP_DRAW_PX = 0x3;
    _this.VID_OP_GET_PX = 0x4;
    _this.VID_OP_WRITE = 0x5;

    // initialize
    _this._const = _this.constantList();
    _this._width = width;
    _this._height = height;
    _this._p = new Uint32Array(8);
    _this._r = new Uint32Array(2);
    _this._callback = callback;
    return _this;
  }

  (0, _createClass3.default)(Video, [{
    key: 'name',
    value: function name() {
      return 'LuisaVideo';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return Device.Type.VIDEO;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0x0;
    }
  }, {
    key: 'hasInterrupt',
    value: function hasInterrupt() {
      return false;
    }
  }, {
    key: 'memorySize',
    value: function memorySize() {
      return 0x6000000; /* 96 Mb */
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return {
        VID_TYPE: 0x00,
        VID_VERSION: 0x01,
        VID_INTERRUPT: 0x02,
        VID_NAME: 0x03,
        VID_WIDTH: 0x10,
        VID_HEIGHT: 0x11,
        VID_OP: 0x12,
        VID_P0: 0x14,
        VID_P1: 0x18,
        VID_P2: 0x1C,
        VID_P3: 0x20,
        VID_P4: 0x24,
        VID_P5: 0x28,
        VID_P6: 0x2C,
        VID_P7: 0x30,
        VID_R0: 0x34,
        VID_R1: 0x38,
        VID_DATA: 0x10000
      };
    }
  }, {
    key: 'get',
    value: function get(a) {
      if (a < 0x10) {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(Video.prototype), 'get', this).call(this, a);
      } else if (a === this._const.VID_WIDTH) {
        return this._width;
      } else if (a === this._const.VID_HEIGHT) {
        return this._height;
      } else {
        var v = undefined;
        if (a >= this._const.VID_P0 && a < this._const.VID_P7 + 4) {
          v = this._p[Math.floor((a - this._const.VID_P0) / 4)];
        } else if (a >= this._const.VID_R0 && a < this._const.VID_R1 + 4) {
          v = this._r[Math.floor((a - this._const.VID_R0) / 4)];
        }
        if (v !== undefined) {
          switch (a % 4) {
            case 0:
              return v & 0xFF;
            case 1:
              return v >> 8 & 0xFF;
            case 2:
              return v >> 16 & 0xFF;
            case 3:
              return v >> 24 & 0xFF;
          }
        }
      }
      return 0;
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      if (a < 0x10) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Video.prototype), 'set', this).call(this, a, v);
      } else if (a === this._const.VID_OP) {
        this._r = this._execute(v);
      } else {
        var r = undefined,
            arr = undefined;
        if (a >= this._const.VID_P0 && a < this._const.VID_P7 + 4) {
          r = Math.floor((a - this._const.VID_P0) / 4);
          arr = this._p;
        } else if (a >= this._const.VID_R0 && a < this._const.VID_R1 + 4) {
          r = Math.floor((a - this._const.VID_R0) / 4);
          arr = this._p;
        }
        if (arr) {
          switch (a % 4) {
            case 0:
              arr[r] &= ~0xFF;arr[r] |= v;
              break;
            case 1:
              arr[r] &= ~0xFF00;arr[r] |= v << 8;
              break;
            case 2:
              arr[r] &= ~0xFF0000;arr[r] |= v << 16;
              break;
            case 3:
              arr[r] &= ~0xFF000000;arr[r] |= v << 24;
              break;
          }
        }
      }
    }
  }, {
    key: '_execute',
    value: function _execute(op) {
      switch (op) {
        case this.VID_OP_GET_PX:
          // TODO
          // const d = this._ctx.getImageData(this._p[0], this._p[1], 1, 1).data;
          //return [(d[0] << 16) | (d[1] << 8) | d[2], 0];
          break;
        case this.VID_OP_CLRSCR:
          this._callback({ device: 'video', cmd: 'clrscr', pars: this._p.slice(0, 7) });
          break;
        case this.VID_OP_DRAW_PX:
          this._callback({ device: 'video', cmd: 'draw_px', pars: this._p.slice(0, 7) });
          break;
        case this.VID_OP_WRITE:
          this._callback({ device: 'video', cmd: 'write', pars: this._p.slice(0, 7) });
          break;
      }
      return [0, 0];
    }
  }]);
  return Video;
}(Device);

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/get":15,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17}],130:[function(require,module,exports){
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _assembler = require('../utils/assembler.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('LuisaVM assembler: assembly to LIF', function (t) {

  var file = undefined,
      result = undefined;

  // simplest file
  file = '\n.section text\n        nop       ; some comment';
  result = {
    text: [0x87]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'simplest file');

  // some useful code
  file = '\n.section text\n        mov     A, 0x4\n        movb    A, [B]\n        movb    A, [0x12345678]\n        movd    [0xABCDEF01], [0x12345678]\n        or      K, 0x4212\n        not     F\n        bz      0x42\n        ret';
  result = {
    text: [0x02, 0x00, 0x04, 0x05, 0x00, 0x01, 0x06, 0x00, 0x78, 0x56, 0x34, 0x12, 0x2C, 0x01, 0xEF, 0xCD, 0xAB, 0x78, 0x56, 0x34, 0x12, 0x2F, 0x0A, 0x12, 0x42, 0x41, 0x05, 0x5D, 0x42, 0x00, 0x00, 0x00, 0x74]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'useful code');

  // decimal, binary, hexa, negative numbers
  file = '\n.section text\n        mov     A, 42\n        mov     A, 0x42\n        mov     A, 0b1010_1111\n        mov     A, -42';
  result = {
    text: [0x02, 0x00, 0x2A, 0x02, 0x00, 0x42, 0x02, 0x00, 0xAF, 0x04, 0x00, 0xD6, 0xFF, 0xFF, 0xFF]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'numeric representation');

  // bss section
  file = '\n.section text\n        nop\n.section bss\n        resb      2\n        resw      2\n        resd      4';
  result = {
    text: [0x87],
    bss: 22
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'bss section');

  // data section
  file = '\n.section text\n        nop\n.section data\n        db      0x12, 0x34\n        dw      0xABCD\n.section rodata\n        dd      0xABCDEF01';
  result = {
    text: [0x87],
    data: [0x12, 0x34, 0xCD, 0xAB],
    rodata: [0x01, 0xEF, 0xCD, 0xAB]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'data section');

  // ascii data
  file = '\n.section text\n        nop\n.section data\n        db      "Abc\\n"\n        db      "Abc\\0"\n        db      "A,A"';
  result = {
    text: [0x87],
    data: [65, 98, 99, 13, 65, 98, 99, 0, 65, 44, 65]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'ascii data');

  // constants
  file = '\n.define TEST 0x1234\n.section text\n        jmp     TEST';
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'local constants');

  // include files
  // TODO
  /*
  file = `
  .import src/test/test1.ls
  .section text
        jmp     TEST`;
  result = {
    text: [0x71, 0x34, 0x12, 0x00, 0x00],
  };
  t.deepEquals(assemblyToLif(file), result, 'import files');
  */

  // private labels
  file = '\n.section text\nlabel:  nop\n        jmp     label\n        jmp     fwd_label\n        nop\nfwd_label:\n        nop';
  result = {
    text: [0x87, 0x71, 'label', 0x00, 0x00, 0x00, 0x71, 'fwd_label', 0x00, 0x00, 0x00, 0x87, 0x87],
    symbols: {
      label: { section: 'text', addr: 0x0 },
      fwd_label: { section: 'text', addr: 0xC }
    }
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'private labels');

  // local labels
  file = '\n.section text\n        nop\n.test1: jmp     .test1\nnew:    nop\n.test1: jmp     .test1';
  result = {
    text: [0x87, 0x71, '.test1', 0x00, 0x00, 0x00, 0x87, 0x71, 'new.test1', 0x00, 0x00, 0x00],
    symbols: {
      '.test1': { section: 'text', addr: 0x01 },
      'new': { section: 'text', addr: 0x6 },
      'new.test1': { section: 'text', addr: 0x07 }
    }
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'local labels');

  // labels in data
  file = '\n.section text\n        movb    A, [ldat]\n.section data\n        dw      0x1\nldat:   db      0x1';
  result = {
    text: [0x06, 0x00, 'ldat', 0x00, 0x00, 0x00],
    data: [0x01, 0x00, 0x01],
    symbols: {
      'ldat': { section: 'data', addr: 0x02 }
    }
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'data labels');

  // labels in bss
  file = '\n.section text\n        movb    A, [ldat]\n.section bss\n        resw    0x1\nldat:   resb    0x1';
  result = {
    text: [0x06, 0x00, 'ldat', 0x00, 0x00, 0x00],
    bss: 3,
    symbols: {
      'ldat': { section: 'bss', addr: 0x02 }
    }
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'data labels');

  // public labels
  file = '\n.section text\n@test:  nop';
  result = {
    text: [0x87],
    symbols: {
      '@test': { section: 'text', addr: 0x00 }
    }
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'global labels');

  // unresolved symbols
  file = '\n.section text\n        jmp     @test';
  result = {
    text: [0x71, '@test', 0x00, 0x00, 0x00]
  };
  t.deepEquals((0, _assembler.assemblyToLif)(file), result, 'unresolved symbols');

  t.end();
});

(0, _tape2.default)('LuisaVM assembler: join LIF objects', function (t) {

  var objA = {
    text: [0x06, 0x00, '@ldat', 0x00, 0x00, 0x00],
    bss: 2,
    data: [0x00],
    symbols: {
      '@ldat': { section: 'text', addr: 0x02 }
    }
  };

  var objB = {
    text: [0x07, 'abc', 0x00, 0x00, 0x00],
    bss: 32,
    data: [0x24, 0xFF],
    symbols: {
      'abc': { section: 'text', addr: 0x0 },
      'xxx': { section: 'bss', addr: 0xA },
      'dt': { section: 'data', addr: 0x1 }
    }
  };

  var objC = {
    text: [0x4, 0x5],
    symbols: {
      'c': { section: 'text', addr: 0x0 }
    }
  };

  var result = {
    text: [0x06, 0x00, '@ldat', 0x00, 0x00, 0x00, 0x07, 'abc', 0x00, 0x00, 0x00, 0x04, 0x05],
    bss: 34,
    data: [0x00, 0x24, 0xFF],
    symbols: {
      '@ldat': { section: 'text', addr: 0x02 },
      'abc': { section: 'text', addr: 0x6 },
      'c': { section: 'text', addr: 0xB },
      'xxx': { section: 'bss', addr: 0xC },
      'dt': { section: 'data', addr: 0x2 }
    }
  };

  t.deepEquals((0, _assembler.joinLifObjects)([objA, objB, objC]), result, 'lifs joined');
  t.end();
});

(0, _tape2.default)('LuisaVM assembler: create relocation table', function (t) {

  var ok = {
    text: [0x06, 'private', 0x00, 0x00, 0x00, 0x08, '@global', 0x00, 0x00, 0x00, 0x0A, 'private', 0x00, 0x00, 0x00, 0x0B, '@pending', 0x00, 0x00, 0x00],
    data: [0x24, 0x12],
    symbols: {
      'private': { section: 'text', addr: 0x6 },
      '@global': { section: 'data', addr: 0x1 }
    }
  };

  var expectedPrivate = {
    text: [0x06, 0x00, 0x00, 0x00, 0x00, 0x08, '@global', 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x0B, '@pending', 0x00, 0x00, 0x00],
    data: [0x24, 0x12],
    symbols: {
      '@global': { section: 'data', addr: 0x1 }
    },
    reloc: [{ offset: 0x1, desloc: 0x6, section: 'text' }, { offset: 0xB, desloc: 0x6, section: 'text' }]
  };
  t.deepEquals((0, _assembler.createRelocationTable)(JSON.parse((0, _stringify2.default)(ok)), false, true), expectedPrivate, 'generate & leave public pending');

  var expectedPublic = {
    text: [0x06, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x0B, '@pending', 0x00, 0x00, 0x00],
    data: [0x24, 0x12],
    reloc: [{ offset: 0x1, desloc: 0x6, section: 'text' }, { offset: 0x6, desloc: 0x1, section: 'data' }, { offset: 0xB, desloc: 0x6, section: 'text' }]
  };
  t.deepEquals((0, _assembler.createRelocationTable)(JSON.parse((0, _stringify2.default)(ok)), true, true), expectedPublic, 'generate & solve public');
  t.throws(function () {
    return (0, _assembler.createRelocationTable)(JSON.parse((0, _stringify2.default)(ok)), true, false);
  }, null, 'try to solve public, but fail');

  t.end();
});

_tape2.default.skip('LuisaVM assembler: convert LIF to LRF', function (t) {
  t.end();
});

(0, _tape2.default)('LuisaVM assembler: convert LIF to raw binary', function (t) {

  var obj = {
    text: [0x1, 0x2, 0x3, 0x0, 0x0, 0x0, 0x0, 0xA, 0x0, 0x0, 0x0, 0x0, 0xF, 0x0, 0x0, 0x0, 0x0],
    bss: 32,
    data: [0xA, 0xB, 0xC],
    reloc: [{ offset: 0x3, desloc: 0x3, section: 'text' }, { offset: 0x8, desloc: 0x10, section: 'bss' }, { offset: 0xD, desloc: 0x1, section: 'data' }]
  };

  var expected = [
  // text
  0x01, 0x02, 0x03, 0x03, 0x00, 0x0F, 0x00, // F0000
  0x0A, 0x24, 0x00, 0x0F, 0x00, // F0007
  0x0F, 0x12, 0x00, 0x0F, 0x00, // F000C
  // data
  0x0A, 0x0B, 0x0C, // F0011
  // bss
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // F0014
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // F0024
  ];

  t.deepEquals((0, _assembler.convertLifToBinary)(obj, 0xF0000), expected, 'convert with offset = 0xF0000');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../utils/assembler.js":145,"babel-runtime/core-js/json/stringify":4,"tape":113}],131:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _bios = require('../emu/bios');

var _bios2 = _interopRequireDefault(_bios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('BIOS: code', function (t) {
  var mb = new _motherboard2.default();
  mb.addDevice(new _mmu2.default(new _ram2.default(256)));
  var cpu = new _cpu2.default(mb);
  mb.addDevice(cpu);
  var bios = new _bios2.default(new Uint8Array([0, 1, 2, 3, 4]));
  mb.addDevice(bios);

  t.equals(mb.get(bios.BIOS_CODE + 2), 2, 'BIOS code loaded');
  t.equals(cpu.PC, bios.BIOS_CODE, 'CPU pointing to BIOS code');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/bios":118,"../emu/cpu":119,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"tape":113}],132:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _debugger = require('../utils/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCPU() {
  var m = new _motherboard2.default();
  m.addDevice(new _mmu2.default(new _ram2.default(256)));
  var c = new _cpu2.default(m);
  m.addDevice(c);
  return [m, c];
}

(0, _tape2.default)('CPU: Sanity check', function (t) {
  var m = undefined,
      c = undefined;
  t.doesNotThrow(function () {
    var _makeCPU, _makeCPU2;

    return _makeCPU = makeCPU(), _makeCPU2 = (0, _slicedToArray3.default)(_makeCPU, 2), m = _makeCPU2[0], c = _makeCPU2[1], _makeCPU;
  }, null, 'CPU is created without errors');
  c.A = 24;
  c.FL = 2;
  t.equals(c.A, 24, 'register setter/getter');
  t.ok(c.V, 'flag bits set correctly');
  t.equals(c.PC, 0, 'CPU init address');
  t.end();
});

(0, _tape2.default)('CPU: Get register contents from memory', function (t) {
  var _makeCPU3 = makeCPU();

  var _makeCPU4 = (0, _slicedToArray3.default)(_makeCPU3, 2);

  var mb = _makeCPU4[0];
  var cpu = _makeCPU4[1];

  cpu.K = 0xABCDEF01;
  t.equals(cpu.CPU_K, 0xF0002038, 'CPU_K == 0xF0002038');
  t.equals(mb.get32(cpu.CPU_K), 0xABCDEF01, 'read register from memory');
  mb.set32(cpu.CPU_K, 0x12345678);
  t.equals(cpu.K, 0x12345678, 'set register from memory');
  t.equals(mb.get32(cpu.CPU_K), 0x12345678, 'set and then read register from memory');
  t.end();
});

(0, _tape2.default)('CPU: Execute valid basic commands', function (t) {
  var _makeCPU5 = makeCPU();

  var _makeCPU6 = (0, _slicedToArray3.default)(_makeCPU5, 2);

  var mb = _makeCPU6[0];
  var cpu = _makeCPU6[1];


  function opc(s, pre) {
    mb.reset();
    if (pre) {
      pre();
    }
    mb.setArray(0, _debugger2.default.encode(s));
    var r = '[0x' + (mb.get(0) < 0x10 ? '0' : '') + mb.get(0).toString(16) + '] ' + s;
    mb.step();
    return r;
  }

  var s = undefined;

  //
  // MOV
  //
  t.comment('Register movement (mov)');

  s = opc('mov A, B', function () {
    return cpu.B = 0x42;
  });
  t.equals(cpu.A, 0x42, s);
  t.equals(cpu.PC, 3, 'checking PC position');

  s = opc('mov A, 0x34');
  t.equals(cpu.A, 0x34, s);

  s = opc('mov A, 0x1234');
  t.equals(cpu.A, 0x1234, s);

  s = opc('mov A, 0xFABC1234');
  t.equals(cpu.A, 0xFABC1234, s);

  t.comment('Test movement flags');

  s = opc('mov A, 0');
  t.true(cpu.Z, 'cpu.Z = 1');
  t.true(cpu.P, 'cpu.P = 1');
  t.false(cpu.S, 'cpu.S = 0');

  s = opc('mov A, 0xF0000001');
  t.false(cpu.Z, 'cpu.Z = 0');
  t.false(cpu.P, 'cpu.P = 0');
  t.true(cpu.S, 'cpu.S = 1');

  //
  // MOVB
  //

  t.comment('8-bit movement (movb)');

  s = opc('movb A, [B]', function () {
    cpu.B = 0x1000;mb.set(cpu.B, 0xAB);
  });
  t.equals(cpu.A, 0xAB, s);

  s = opc('movb A, [0x1000]', function () {
    return mb.set(0x1000, 0xAB);
  });
  t.equals(cpu.A, 0xAB, s);

  s = opc('movb [A], A', function () {
    return cpu.A = 0x64;
  });
  t.equals(mb.get(0x64), 0x64, s);

  s = opc('movb [A], 0xFA', function () {
    return cpu.A = 0x64;
  });
  t.equals(mb.get(0x64), 0xFA, s);

  s = opc('movb [A], [B]', function () {
    cpu.A = 0x32;cpu.B = 0x64;mb.set(0x64, 0xFF);
  });
  t.equals(mb.get(0x32), 0xFF, s);

  s = opc('movb [A], [0x6420]', function () {
    cpu.A = 0x32;mb.set(0x6420, 0xFF);
  });
  t.equals(mb.get(0x32), 0xFF, s);

  s = opc('movb [0x64], A', function () {
    return cpu.A = 0xAC32;
  });
  t.equals(mb.get(0x64), 0x32, s);

  s = opc('movb [0x64], 0xF0');
  t.equals(mb.get(0x64), 0xF0, s);

  s = opc('movb [0xCC64], [A]', function () {
    cpu.A = 0xF000;mb.set(0xF000, 0x42);
  });
  t.equals(mb.get(0xCC64), 0x42, s);

  s = opc('movb [0x64], [0xABF0]', function () {
    mb.set32(0xABF0, 0x1234);mb.set(0x1234, 0x3F);
  });
  t.equals(mb.get(0x64), 0x3F, s);

  //
  // MOVW
  //

  t.comment('16-bit movement (movw)');

  s = opc('movw A, [B]', function () {
    cpu.B = 0x1000;mb.set16(cpu.B, 0xABCD);
  });
  t.equals(cpu.A, 0xABCD, s);

  s = opc('movw A, [0x1000]', function () {
    return mb.set16(0x1000, 0xABCD);
  });
  t.equals(cpu.A, 0xABCD, s);

  s = opc('movw [A], A', function () {
    return cpu.A = 0x6402;
  });
  t.equals(mb.get16(0x6402), 0x6402, s);

  s = opc('movw [A], 0xFABA', function () {
    return cpu.A = 0x64;
  });
  t.equals(mb.get16(0x64), 0xFABA, s);

  s = opc('movw [A], [B]', function () {
    cpu.A = 0x32CC;cpu.B = 0x64;mb.set16(0x64, 0xFFAB);
  });
  t.equals(mb.get16(0x32CC), 0xFFAB, s);

  s = opc('movw [A], [0x6420]', function () {
    cpu.A = 0x32;mb.set16(0x6420, 0xFFAC);
  });
  t.equals(mb.get16(0x32), 0xFFAC, s);

  s = opc('movw [0x64], A', function () {
    return cpu.A = 0xAB32AC;
  });
  t.equals(mb.get16(0x64), 0x32AC, s);

  s = opc('movw [0x64], 0xF0FA');
  t.equals(mb.get16(0x64), 0xF0FA, s);

  s = opc('movw [0xCC64], [A]', function () {
    cpu.A = 0xF000;mb.set16(0xF000, 0x4245);
  });
  t.equals(mb.get16(0xCC64), 0x4245, s);

  s = opc('movw [0x64], [0xABF0]', function () {
    mb.set32(0xABF0, 0x1234);mb.set16(0x1234, 0x3F54);
  });
  t.equals(mb.get16(0x64), 0x3F54, s);

  //
  // MOVD
  //

  t.comment('32-bit movement (movd)');

  s = opc('movd A, [B]', function () {
    cpu.B = 0x1000;mb.set32(cpu.B, 0xABCDEF01);
  });
  t.equals(cpu.A, 0xABCDEF01, s);

  s = opc('movd A, [0x1000]', function () {
    return mb.set32(0x1000, 0xABCDEF01);
  });
  t.equals(cpu.A, 0xABCDEF01, s);

  s = opc('movd [A], A', function () {
    return cpu.A = 0x16402;
  });
  t.equals(mb.get32(0x16402), 0x16402, s);

  s = opc('movd [A], 0xFABA1122', function () {
    return cpu.A = 0x64;
  });
  t.equals(mb.get32(0x64), 0xFABA1122, s);

  s = opc('movd [A], [B]', function () {
    cpu.A = 0x32CC;cpu.B = 0x64;mb.set32(0x64, 0xFFAB5678);
  });
  t.equals(mb.get32(0x32CC), 0xFFAB5678, s);

  s = opc('movd [A], [0x6420]', function () {
    cpu.A = 0x32;mb.set32(0x6420, 0xFFAC9876);
  });
  t.equals(mb.get32(0x32), 0xFFAC9876, s);

  s = opc('movd [0x64], A', function () {
    return cpu.A = 0xAB32AC44;
  });
  t.equals(mb.get32(0x64), 0xAB32AC44, s);

  s = opc('movd [0x64], 0xF0FA1234');
  t.equals(mb.get32(0x64), 0xF0FA1234, s);

  s = opc('movd [0xCC64], [A]', function () {
    cpu.A = 0xF000;mb.set32(0xF000, 0x4245AABB);
  });
  t.equals(mb.get32(0xCC64), 0x4245AABB, s);

  s = opc('movd [0x64], [0xABF0]', function () {
    mb.set32(0xABF0, 0x1234);mb.set32(0x1234, 0x3F54FABC);
  });
  t.equals(mb.get32(0x64), 0x3F54FABC, s);

  //
  // LOGIC OPERATIONS
  //

  t.comment('Logic operations');

  s = opc('or A, B', function () {
    cpu.A = 10;cpu.B = 12;
  });
  t.equals(cpu.A, 14, s);
  t.false(cpu.S, "cpu.S == 0");
  t.true(cpu.P, "cpu.P == 1");
  t.false(cpu.Z, "cpu.Z == 0");
  t.false(cpu.Y, "cpu.Y == 0");
  t.false(cpu.V, "cpu.V == 0");

  s = opc('or A, 0x4', function () {
    cpu.A = 3;
  });
  t.equals(cpu.A, 7, s);

  s = opc('or A, 0x4000', function () {
    cpu.A = 7;
  });
  t.equals(cpu.A, 0x4007, s);

  s = opc('or A, 0x2A426653', function () {
    cpu.A = 0x10800000;
  });
  t.equals(cpu.A, 0x3AC26653, s);

  s = opc('xor A, B', function () {
    cpu.A = 10;cpu.B = 12;
  });
  t.equals(cpu.A, 6, s);

  s = opc('xor A, 0x4', function () {
    cpu.A = 3;
  });
  t.equals(cpu.A, 7, s);

  s = opc('xor A, 0xFF00', function () {
    cpu.A = 0xFF0;
  });
  t.equals(cpu.A, 0xF0F0, s);

  s = opc('xor A, 0x2A426653', function () {
    cpu.A = 0x148ABD12;
  });
  t.equals(cpu.A, 0x3EC8DB41, s);

  s = opc('and A, B', function () {
    cpu.A = 3;cpu.B = 12;
  });
  t.equals(cpu.A, 0, s);
  t.true(cpu.Z, "cpu.Z == 1");

  s = opc('and A, 0x7', function () {
    cpu.A = 3;
  });
  t.equals(cpu.A, 3, s);

  s = opc('and A, 0xFF00', function () {
    cpu.A = 0xFF0;
  });
  t.equals(cpu.A, 0xF00, s);

  s = opc('and A, 0x2A426653', function () {
    cpu.A = 0x148ABD12;
  });
  t.equals(cpu.A, 0x22412, s);

  s = opc('shl A, B', function () {
    cpu.A = 170;cpu.B = 4;
  });
  t.equals(cpu.A, 2720, s);

  s = opc('shl A, 4', function () {
    cpu.A = 170;
  });
  t.equals(cpu.A, 2720, s);

  s = opc('shr A, B', function () {
    cpu.A = 170;cpu.B = 4;
  });
  t.equals(cpu.A, 10, s);

  s = opc('shr A, 4', function () {
    cpu.A = 170;
  });
  t.equals(cpu.A, 10, s);

  s = opc('not A', function () {
    cpu.A = 202;
  });
  t.equals(cpu.A, 4294967093, s);

  //
  // integer math
  //

  t.comment('Integer arithmetic');

  s = opc('add A, B', function () {
    cpu.A = 0x12;cpu.B = 0x20;
  });
  t.equals(cpu.A, 0x32, s);

  s = opc('add A, 0x20', function () {
    return cpu.A = 0x12;
  });
  t.equals(cpu.A, 0x32, s);

  s = opc('add A, 0x20', function () {
    cpu.A = 0x12, cpu.Y = true;
  });
  t.equals(cpu.A, 0x33, 'add A, 0x20 (with carry)');

  s = opc('add A, 0x2000', function () {
    return cpu.A = 0x12;
  });
  t.equals(cpu.A, 0x2012, s);

  s = opc('add A, 0xF0000000', function () {
    return cpu.A = 0x10000012;
  });
  t.equals(cpu.A, 0x12, s);
  t.true(cpu.Y, "cpu.Y == 1");

  s = opc('sub A, B', function () {
    cpu.A = 0x30;cpu.B = 0x20;
  });
  t.equals(cpu.A, 0x10, s);
  t.false(cpu.S, 'cpu.S == 0');

  s = opc('sub A, B', function () {
    cpu.A = 0x20;cpu.B = 0x30;
  });
  t.equals(cpu.A, 0xFFFFFFF0, 'sub A, B (negative)');
  t.true(cpu.S, 'cpu.S == 1');

  s = opc('sub A, 0x20', function () {
    return cpu.A = 0x22;
  });
  t.equals(cpu.A, 0x2, s);

  s = opc('sub A, 0x20', function () {
    cpu.A = 0x22;cpu.Y = true;
  });
  t.equals(cpu.A, 0x1, 'sub A, 0x20 (with carry)');

  s = opc('sub A, 0x2000', function () {
    return cpu.A = 0x12;
  });
  t.equals(cpu.A, 0xFFFFE012, s);
  t.true(cpu.S, 'cpu.S == 1');
  t.true(cpu.Y, 'cpu.Y == 1');

  s = opc('sub A, 0xF0000000', function () {
    return cpu.A = 0x10000012;
  });
  t.equals(cpu.A, 0x20000012, s);
  t.true(cpu.Y, 'cpu.Y == 1');

  s = opc('cmp A, B');
  t.true(cpu.Z, s);

  s = opc('cmp A, 0x12');
  t.true(cpu.LT && !cpu.GT, s);

  s = opc('cmp A, 0x1234', function () {
    return cpu.A = 0x6000;
  });
  t.true(!cpu.LT && cpu.GT, s);

  s = opc('cmp A, 0x12345678', function () {
    return cpu.A = 0xF0000000;
  });
  t.true(!cpu.LT && cpu.GT, s); // because of the signal!

  s = opc('mul A, B', function () {
    cpu.A = 0xF0;cpu.B = 0xF000;
  });
  t.equals(cpu.A, 0xE10000, s);

  s = opc('mul A, 0x12', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x147A8, s);

  s = opc('mul A, 0x12AF', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x154198C, s);
  t.false(cpu.V, 'cpu.V == 0');

  s = opc('mul A, 0x12AF87AB', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x233194BC, s);
  t.true(cpu.V, 'cpu.V == 1');

  s = opc('idiv A, B', function () {
    cpu.A = 0xF000;cpu.B = 0xF0;
  });
  t.equals(cpu.A, 0x100, s);

  s = opc('idiv A, 0x12', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x102, s);

  s = opc('idiv A, 0x2AF', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x6, s);

  s = opc('idiv A, 0x12AF', function () {
    return cpu.A = 0x123487AB;
  });
  t.equals(cpu.A, 0xF971, s);

  s = opc('mod A, B', function () {
    cpu.A = 0xF000;cpu.B = 0xF0;
  });
  t.equals(cpu.A, 0x0, s);
  t.true(cpu.Z, 'cpu.Z == 1');

  s = opc('mod A, 0x12', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x10, s);

  s = opc('mod A, 0x2AF', function () {
    return cpu.A = 0x1234;
  });
  t.equals(cpu.A, 0x21A, s);

  s = opc('mod A, 0x12AF', function () {
    return cpu.A = 0x123487AB;
  });
  t.equals(cpu.A, 0x116C, s);

  s = opc('inc A', function () {
    return cpu.A = 0x42;
  });
  t.equals(cpu.A, 0x43, s);

  s = opc('inc A', function () {
    return cpu.A = 0xFFFFFFFF;
  });
  t.equals(cpu.A, 0x0, 'inc A (overflow)');
  t.true(cpu.Y, 'cpu.Y == 1');
  t.true(cpu.Z, 'cpu.Z == 1');

  s = opc('dec A', function () {
    return cpu.A = 0x42;
  });
  t.equals(cpu.A, 0x41, s);

  s = opc('dec A', function () {
    return cpu.A = 0x0;
  });
  t.equals(cpu.A, 0xFFFFFFFF, 'dec A (underflow)');
  t.false(cpu.Z, 'cpu.Z == 0');

  //
  // branches
  //

  t.comment('Branch operations');

  s = opc('bz A', function () {
    cpu.Z = true;cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bz A', function () {
    cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x2, 'bz A (false)');

  s = opc('bz 0x1000', function () {
    return cpu.Z = true;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bnz A', function () {
    return cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bnz 0x1000');
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bneg A', function () {
    cpu.S = true;cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bneg A', function () {
    cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x2, 'bneg A (false)');

  s = opc('bneg 0x1000', function () {
    return cpu.S = true;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bpos A', function () {
    return cpu.A = 0x1000;
  });
  t.equals(cpu.PC, 0x1000, s);

  s = opc('bpos 0x1000');
  t.equals(cpu.PC, 0x1000, s);

  s = opc('jmp 0x12345678');
  t.equals(cpu.PC, 0x12345678, s);

  //
  // stack
  //

  t.comment('Stack operations');

  mb.reset();
  cpu.SP = 0xFFF;
  cpu.A = 0xABCDEF12;

  mb.setArray(0x0, _debugger2.default.encode('pushb A'));
  mb.setArray(0x2, _debugger2.default.encode('pushb 0x12'));
  mb.setArray(0x4, _debugger2.default.encode('pushw A'));
  mb.setArray(0x6, _debugger2.default.encode('pushd A'));

  mb.setArray(0x8, _debugger2.default.encode('popd B'));
  mb.setArray(0xA, _debugger2.default.encode('popw B'));
  mb.setArray(0xC, _debugger2.default.encode('popb B'));

  mb.setArray(0xE, _debugger2.default.encode('popx 1'));

  mb.step();
  t.equals(mb.get(0xFFF), 0x12, 'pushb A');
  t.equals(cpu.SP, 0xFFE, 'SP = 0xFFE');

  mb.step();
  t.equals(mb.get(0xFFE), 0x12, 'pushb 0x12');
  t.equals(cpu.SP, 0xFFD, 'SP = 0xFFD');

  mb.step();
  t.equals(mb.get16(0xFFC), 0xEF12, s);
  t.equals(mb.get(0xFFD), 0xEF, s);
  t.equals(mb.get(0xFFC), 0x12, s);
  t.equals(cpu.SP, 0xFFB, 'SP = 0xFFB');

  mb.step();
  t.equals(mb.get32(0xFF8), 0xABCDEF12);
  t.equals(cpu.SP, 0xFF7, 'SP = 0xFF7');

  mb.step();
  t.equals(cpu.B, 0xABCDEF12, 'popd B');

  mb.step();
  t.equals(cpu.B, 0xEF12, 'popw B');

  mb.step();
  t.equals(cpu.B, 0x12, 'popb B');

  mb.step();
  t.equals(cpu.SP, 0xFFF, 'popx 1');

  // all registers
  s = opc('push.a', function () {
    cpu.SP = 0xFFF;
    cpu.A = 0xA1B2C3E4;
    cpu.B = 0xFFFFFFFF;
  });
  t.equals(cpu.SP, 0xFCF, s);
  t.equals(mb.get32(0xFFC), 0xA1B2C3E4, 'A is saved');
  t.equals(mb.get32(0xFF8), 0xFFFFFFFF, 'B is saved');

  s = opc('pop.a', function () {
    cpu.SP = 0xFCF;
    mb.set32(0xFFC, 0xA1B2C3E4);
    mb.set32(0xFF8, 0xFFFFFFFF);
  });
  t.equals(cpu.SP, 0xFFF, s);
  t.equals(cpu.A, 0xA1B2C3E4, 'A is restored');
  t.equals(cpu.B, 0xFFFFFFFF, 'B is restored');

  opc('nop');

  t.end();
});

(0, _tape2.default)('CPU: subroutines and system calls', function (t) {
  var _makeCPU7 = makeCPU();

  var _makeCPU8 = (0, _slicedToArray3.default)(_makeCPU7, 2);

  var mb = _makeCPU8[0];
  var cpu = _makeCPU8[1];

  // jsr

  mb.reset();
  mb.setArray(0x200, _debugger2.default.encode('jsr 0x1234'));
  mb.setArray(0x1234, _debugger2.default.encode('ret'));
  cpu.PC = 0x200;
  cpu.SP = 0xFFF;
  mb.step();
  t.equals(cpu.PC, 0x1234, 'jsr 0x1234');
  t.equals(mb.get(0xFFC), 0x5, '[FFC] = 0x5');
  t.equals(mb.get(0xFFD), 0x2, '[FFD] = 0x2');
  t.equals(cpu.SP, 0xFFB, 'SP = 0xFFB');
  t.equals(mb.get32(0xFFC), 0x200 + 5, 'address in stack');

  mb.step();
  t.equals(cpu.PC, 0x205, 'ret');
  t.equals(cpu.SP, 0xFFF, 'SP = 0xFFF');

  // sys
  mb.reset();
  cpu.SP = 0xFFF;
  mb.setArray(0, _debugger2.default.encode('sys 2'));
  mb.set32(cpu.CPU_SYSCALL_VECT + 8, 0x1000);
  t.equals(cpu._syscallVector[2], 0x1000, 'syscall vector');
  mb.setArray(0x1000, _debugger2.default.encode('sret'));

  mb.step();
  t.equals(cpu.PC, 0x1000, 'sys 2');
  t.equals(cpu.SP, 0xFFB, 'SP = 0xFFD');
  mb.step();
  t.equals(cpu.PC, 0x2, 'sret');
  t.equals(cpu.SP, 0xFFF, 'SP = 0xFFF');

  t.end();
});

(0, _tape2.default)('CPU: interrupts', function (t) {
  var _makeCPU9 = makeCPU();

  var _makeCPU10 = (0, _slicedToArray3.default)(_makeCPU9, 2);

  var mb = _makeCPU10[0];
  var cpu = _makeCPU10[1];

  cpu.T = true;
  cpu.SP = 0x800;
  mb.set32(cpu.CPU_INTERRUPT_VECT + 8, 0x1000);
  mb.setArray(0x0, _debugger2.default.encode('movb A, [0xE0000000]'));
  mb.setArray(0x1000, _debugger2.default.encode('iret'));

  mb.step(); // cause the exception
  t.equals(cpu.PC, 0x1000, 'interrupt called');
  t.true(cpu.T, 'interrupts disabled');

  mb.step(); // iret
  t.equals(cpu.PC, 0x6, 'iret');
  t.true(cpu.T, 'interrupts enabled');

  t.end();
});

(0, _tape2.default)('CPU: invalid opcode', function (t) {
  var _makeCPU11 = makeCPU();

  var _makeCPU12 = (0, _slicedToArray3.default)(_makeCPU11, 2);

  var mb = _makeCPU12[0];
  var cpu = _makeCPU12[1];

  cpu.T = true;
  mb.set32(cpu.CPU_INTERRUPT_VECT + 12, 0x1000);
  mb.set(0x0, 0xFF);
  mb.step();
  t.equals(cpu.PC, 0x1000, 'interrupt called');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/cpu":119,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"../utils/debugger":146,"babel-runtime/helpers/slicedToArray":18,"tape":113}],133:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _luisavm = require('../emu/luisavm');

var _luisavm2 = _interopRequireDefault(_luisavm);

var _debugger = require('../utils/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// DECODER
//

(0, _tape2.default)('Debugger decoder', function (t) {

  var tm = new _luisavm2.default(256, [], Uint8Array.from([]));
  var dbg = new _debugger2.default(tm);

  function ok(t, a, s) {
    tm.mb.setArray(0x0, a);
    var c = dbg.decode(0x0);
    t.equals(c[0], s, s);
    t.equals(c[1], a.length, 'operation size = ' + a.length);
  }

  ok(t, [0xFF], 'data    0xFF');
  ok(t, [0x74], 'ret');
  ok(t, [0x06, 0x01, 0x78, 0x56, 0x34, 0x12], 'movb    B, [0x12345678]');
  ok(t, [0x2C, 0x78, 0x56, 0x34, 0x12, 0x01, 0xEF, 0xCD, 0xAB], 'movd    [0x12345678], [0xABCDEF01]');
  ok(t, [0x2F, 0x02, 0x34, 0x12], 'or      C, 0x1234');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/luisavm":123,"../utils/debugger":146,"tape":113}],134:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _device = require('../emu/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockDevice = function (_Device) {
  (0, _inherits3.default)(MockDevice, _Device);

  function MockDevice() {
    (0, _classCallCheck3.default)(this, MockDevice);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MockDevice).apply(this, arguments));
  }

  (0, _createClass3.default)(MockDevice, [{
    key: 'name',
    value: function name() {
      return 'MockDevice';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return _device2.default.Type.OTHER_OUTPUT;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return { 'CONST': 0x123 };
    }
  }]);
  return MockDevice;
}(_device2.default);

(0, _tape2.default)('Device: registers', function (t) {
  var d = new MockDevice();
  t.equal(d.get(0), _device2.default.Type.OTHER_OUTPUT, 'device type register');
  t.equal(d.get(1), 0, 'device version register');
  t.equal(d.get(3), 'M'.charCodeAt(0), 'device name register');
  t.end();
});

(0, _tape2.default)('Device: constants', function (t) {
  var d = new MockDevice();
  d.initializeConstants(0xF0000000);
  t.equal(d.CONST, 0xF0000123, 'constants are set');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/device":120,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"tape":113}],135:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _encoder = require('../utils/encoder');

var _encoder2 = _interopRequireDefault(_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// ENCODER
//

(0, _tape2.default)('Encoder: valid commands', function (t) {

  function ok(t, s, v) {
    t.same((0, _encoder2.default)(s), v, s);
  }

  ok(t, 'mov A, 0xABCD', [0x03, 0x00, 0xCD, 0xAB]);
  ok(t, 'mov A, B', [0x01, 0x00, 0x01]);
  ok(t, 'movb [A], 0x42', [0x0C, 0x00, 0x42]);
  ok(t, 'movw [0x42], K', [0x25, 0x42, 0x00, 0x00, 0x00, 0x0A]);
  ok(t, 'movd [A], 0x1', [0x1E, 0x00, 0x01, 0x00, 0x00, 0x00]);
  ok(t, 'or C, 0x1234', [0x2F, 0x02, 0x34, 0x12]);
  ok(t, 'not B', [0x41, 0x1]);
  ok(t, 'bz 0x12', [0x5D, 0x12, 0x00, 0x00, 0x00]);
  ok(t, 'ret', [0x74]);
  ok(t, 'push.a', [0x7E]);
  ok(t, 'movb A, [0x1000]', [0x06, 0x00, 0x00, 0x10, 0x00, 0x00]);
  t.end();
});

(0, _tape2.default)('Encoder: number systems', function (t) {

  function ok(t, s, v) {
    t.same((0, _encoder2.default)(s), v, s);
  }

  ok(t, 'mov A, 42', [0x02, 0x00, 0x2A]);
  ok(t, 'mov A, 0x42', [0x02, 0x00, 0x42]);
  ok(t, 'mov A, 0b1010_1111', [0x02, 0x00, 0xAF]);
  ok(t, 'mov A, -42', [0x04, 0x00, 0xD6, 0xFF, 0xFF, 0xFF]);
  t.end();
});

(0, _tape2.default)('Encoder: invalid commands', function (t) {

  function nok(t, s) {
    t.throws(function () {
      return (0, _encoder2.default)(s);
    }, null, s);
  }

  nok(t, 'mov [B], 0x42');
  nok(t, 'movb A, 0x1234');
  nok(t, 'movb 0x42, A');
  nok(t, 'not 0x42');
  nok(t, 'or A, B, 0x42');
  nok(t, 'sys 0x1234');
  nok(t, 'pushb 0x1234');
  nok(t, 'movb A, [test]');
  t.end();
});

(0, _tape2.default)('Encoder: labels', function (t) {

  function ok(t, s, v) {
    t.same((0, _encoder2.default)(s, true), v, s);
  }

  ok(t, 'movb A, [test]', [0x6, 0x0, 'test', 0x0, 0x0, 0x0]);
  ok(t, 'mov A, test', [0x4, 0x0, 'test', 0x0, 0x0, 0x0]);
  ok(t, 'jmp label', [0x71, 'label', 0, 0, 0]);
  t.same((0, _encoder2.default)('jmp .la', true, 'xy'), [0x71, 'xy.la', 0, 0, 0], 'jmp .la');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../utils/encoder":147,"tape":113}],136:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _keyboard = require('../emu/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeKeyboard() {
  var m = new _motherboard2.default();
  m.addDevice(new _mmu2.default(new _ram2.default(256)));
  var c = new _cpu2.default(m);
  m.addDevice(c);
  var k = new _keyboard2.default();
  m.addDevice(k);
  return [m, c, k];
}

(0, _tape2.default)('Keyboard: sanity', function (t) {
  t.doesNotThrow(function () {
    return new _keyboard2.default();
  }, null, "keyboard created");
  t.doesNotThrow(function () {
    return makeKeyboard();
  }, null, "keyboard created and added to motherboard");
  t.end();
});

(0, _tape2.default)('Keyboard: invalid event', function (t) {
  var kbd = new _keyboard2.default();
  t.throws(function () {
    return kbd.addEvent('event');
  }, null, 'invalid event causes error');
  t.throws(function () {
    return kbd.addEvent({ event: 'aaa' });
  }, null, 'invalid event causes error');
  t.end();
});

(0, _tape2.default)('Keyboard: keypresses (poll)', function (t) {
  var _makeKeyboard = makeKeyboard();

  var _makeKeyboard2 = (0, _slicedToArray3.default)(_makeKeyboard, 3);

  var mb = _makeKeyboard2[0];
  var cpu = _makeKeyboard2[1];
  var kbd = _makeKeyboard2[2];


  kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  kbd.addEvent({ event: 'release', shift: false, control: false, alt: true, key: 0x20 });

  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 0, 'queue is not full');
  t.equals(mb.get32(kbd.KBD_FRONT), 1 << 0x1C | 0x20, 'event #1');
  mb.set(mb.get(kbd.KBD_DEQUEUE));
  t.equals(mb.get32(kbd.KBD_FRONT), (1 << 0x1F | 1 << 0x1C | 0x20) >>> 0, 'event #2');
  mb.set(mb.get(kbd.KBD_DEQUEUE));
  t.equals(mb.get32(kbd.KBD_FRONT), 0, 'all events dequeued');

  t.end();
});

(0, _tape2.default)('Keyboard: keypresses (interrupt)', function (t) {
  var _makeKeyboard3 = makeKeyboard();

  var _makeKeyboard4 = (0, _slicedToArray3.default)(_makeKeyboard3, 3);

  var mb = _makeKeyboard4[0];
  var cpu = _makeKeyboard4[1];
  var kbd = _makeKeyboard4[2];

  // prepare

  mb.set(0x0, 0x86); // nop
  mb.set(kbd.KBD_MODE, kbd.KBD_MODE_INTERRUPT);
  mb.set32(cpu.CPU_INTERRUPT_VECT + 4 * mb.get(kbd.KBD_INTERRUPT), 0x1000);
  cpu.T = true;

  kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  mb.step();

  t.equals(cpu.PC, 0x1000, 'interrupt was called');
  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 0, 'queue is not full');
  t.equals(mb.get32(kbd.KBD_FRONT), 1 << 0x1C | 0x20, 'event #1');

  t.end();
});

(0, _tape2.default)('Keyboard: queue full', function (t) {
  var _makeKeyboard5 = makeKeyboard();

  var _makeKeyboard6 = (0, _slicedToArray3.default)(_makeKeyboard5, 3);

  var mb = _makeKeyboard6[0];
  var cpu = _makeKeyboard6[1];
  var kbd = _makeKeyboard6[2];


  for (var i = 0; i < _keyboard2.default.QUEUE_SIZE; ++i) {
    kbd.addEvent({ event: 'press', shift: false, control: false, alt: true, key: 0x20 });
  }

  t.equals(mb.get(kbd.KBD_QUEUE_FULL), 1, 'queue is full');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/cpu":119,"../emu/keyboard":121,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"babel-runtime/helpers/slicedToArray":18,"tape":113}],137:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _lsbstorage = require('../emu/lsbstorage');

var _lsbstorage2 = _interopRequireDefault(_lsbstorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockStorage = function (_LSBStorage) {
  (0, _inherits3.default)(MockStorage, _LSBStorage);

  function MockStorage() {
    (0, _classCallCheck3.default)(this, MockStorage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MockStorage).call(this));

    _this.z = new Uint8Array(8);
    return _this;
  }

  (0, _createClass3.default)(MockStorage, [{
    key: 'get',
    value: function get(a) {
      return this.z[a];
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      this.z[a] = v;
    }
  }]);
  return MockStorage;
}(_lsbstorage2.default);

(0, _tape2.default)('LSBStorage: 16 bits', function (t) {
  var m = new MockStorage();
  m.set16(2, 0xABCD);
  t.equal(m.z[2], 0xCD, '1st byte');
  t.equal(m.z[3], 0xAB, '2nd byte');
  t.deepEqual(m.get16(2), 0xABCD, 'LSB read');
  t.end();
});

(0, _tape2.default)('LSBStorage: 32 bits', function (t) {
  var m = new MockStorage();
  m.set32(4, 0xFBCDEF01);
  t.equal(m.z[4], 0x01, '1st byte');
  t.equal(m.z[5], 0xEF, '2nd byte');
  t.equal(m.z[6], 0xCD, '3rd byte');
  t.equal(m.z[7], 0xFB, '4th byte');
  t.deepEqual(m.get32(4), 0xFBCDEF01, 'LSB read');
  t.end();
});

(0, _tape2.default)('LSBStorage: string', function (t) {
  var m = new MockStorage();
  m.setString(0, 'abcd');
  t.equal(m.z[1], 'b'.charCodeAt(0), '1st byte');
  t.equal(m.getString(0, 4), 'abcd', 'full read');
  t.end();
});

(0, _tape2.default)('LSBStorage: array', function (t) {
  var m = new MockStorage();
  m.setArray(2, [0x1, 0x2, 0x3]);
  t.equal(m.z[3], 0x2, '2nd byte');
  t.deepEqual(m.getArray(2, 3), [0x1, 0x2, 0x3], 'full read');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/lsbstorage":122,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"tape":113}],138:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _luisavm = require('../emu/luisavm');

var _luisavm2 = _interopRequireDefault(_luisavm);

var _debugger = require('../utils/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var biosCode = new Uint8Array([0, 1, 2, 3, 4]);

(0, _tape2.default)('LuisaVM: sanity', function (t) {
  t.doesNotThrow(function () {
    return new _luisavm2.default(256, [], biosCode);
  }, null, "LuisaVM created");
  t.end();
});

(0, _tape2.default)('LuisaVM: step', function (t) {
  var tm = new _luisavm2.default(256, [], biosCode);
  t.doesNotThrow(function () {
    return tm.step();
  }, null, "step");
  t.end();
});

(0, _tape2.default)('LuisaVM: full example', function (t) {
  var b = [];
  b = b.concat(_debugger2.default.encode('movd [0xF0016014], 64')); // movd [VID_P0], '@'
  b = b.concat(_debugger2.default.encode('movd [0xF0016018], 5')); // movd [VID_P1], 5
  b = b.concat(_debugger2.default.encode('movd [0xF001601C], 5')); // movd [VID_P1], 5
  b = b.concat(_debugger2.default.encode('movd [0xF0016020], 0')); // movd [VID_P2], 0x000000
  b = b.concat(_debugger2.default.encode('movd [0xF0016024], 0xFF0000')); // movd [VID_P4], 0xFF0000
  b = b.concat(_debugger2.default.encode('movb [0xF0016012], 0x5')); // movb [VID_OP], VID_OP_WRITE

  var tm = new _luisavm2.default(256, [], Uint8Array.from(b));

  t.equals(tm.cpu.PC, 0xF0006010, 'PC is initial position');
  t.equals(tm.mb.get(0xF0006010), 0x2A, 'code loaded into BIOS');

  for (var i = 0; i < 6; ++i) {
    tm.step();
  }
  tm.video.update();
  t.equals(tm.cpu.PC, 0xF0006010 + b.length, 'PC is in the right place');

  // check pixel
  // TODO t.deepEqual(canvas.getContext('2d').getImageData(41, 56, 1, 1).data.slice(0, 3), [0xFF, 0, 0], 'character was set on the screen');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/luisavm":123,"../utils/debugger":146,"tape":113}],139:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// VMEM disabled
//

(0, _tape2.default)('MMU: translation (VMEM disabled)', function (t) {
  var m = new _mmu2.default(new _ram2.default(4));
  t.equal(m.translate(8), 8, 'translation');
  t.end();
});

(0, _tape2.default)('MMU: physical memory access (VMEM disabled)', function (t) {
  var m = new _mmu2.default(new _ram2.default(4));
  m.initializeConstants(0);
  t.equal(m.getMemory(3), 0, 'get byte');
  m.setMemory(3, 0xFF);
  t.equal(m.getMemory(3), 0xFF, 'get changed byte');
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_NONE, 'no errors');
  t.end();
});

(0, _tape2.default)('MMU: physical memory size', function (t) {
  var m = new _mmu2.default(new _ram2.default(4));
  m.initializeConstants(0);
  t.equal(m.get32(m.MMU_RAM_SZ), 4 * 1024, 'memory size register');
  t.end();
});

(0, _tape2.default)('MMU: physical access out of bounds', function (t) {
  var m = new _mmu2.default(new _ram2.default(4));
  m.initializeConstants(0);
  m.getMemory(0xEE0000);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_OUT_OF_BOUNDS, 'access is out of bounds');
  t.end();
});

(0, _tape2.default)('MMU: clear error', function (t) {
  var m = new _mmu2.default(new _ram2.default(4));
  m.initializeConstants(0);
  m.getMemory(0xEE0000);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_OUT_OF_BOUNDS, 'error as expected');
  m.set32(m.MMU_ERR, m.MMU_ERR_NONE);
  t.equal(m.get(m.MMU_ERR), m.MMU_ERR_NONE, 'error is cleared');
  t.end();
});

//
// VMEM enabled
//

function mmu_vmem() {
  var m = new _mmu2.default(new _ram2.default(256));
  m.initializeConstants(0);
  m._ram.set32(0x4ABC, 0x1F | 1 << 31);
  m._ram.set32(0x1F344, 0x2B | 1 << 31);
  m.set32(m.MMU_VMEM, 0x4 | 1 << 31);
  return m;
}

(0, _tape2.default)('MMU: enabled VMEM', function (t) {
  var m = mmu_vmem();
  t.equal(m.get32(m.MMU_VMEM), (0x4 | 1 << 31) >>> 0, 'VMEM register is correct');
  t.ok(m.active, 'VMEM is active');
  t.equal(m._vmem.page, 0x4, 'VMEM page is 0x4');
  t.end();
});

(0, _tape2.default)('MMU: VMEM memory translation', function (t) {
  var m = mmu_vmem();
  t.equal(m.translate(0xABCD1234), 0x2B234, 'translation is correct');
  t.end();
});

(0, _tape2.default)('MMU: VMEM page fault', function (t) {
  var m = mmu_vmem();
  m._ram.set32(0x4ABC, 0x1F);
  t.throws(function () {
    return m.translate(0xABCD1234);
  }, Error, 'page fault');
  t.end();
});

(0, _tape2.default)('MMU: VMEM memory access', function (t) {
  var m = mmu_vmem();
  m.setMemory(0xABCD1234, 0x42);
  t.equal(m._ram.get(0x2B234), 0x42, 'RAM address is correctly set');
  t.equal(m.getMemory(0xABCD1234), 0x42, 'setting/fetching via VMEM works');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/mmu":124,"../emu/ram":126,"tape":113}],140:[function(require,module,exports){
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tapeCatch = require('tape-catch');

var _tapeCatch2 = _interopRequireDefault(_tapeCatch);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _device = require('../emu/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockMMU = function (_Device) {
  (0, _inherits3.default)(MockMMU, _Device);

  function MockMMU() {
    (0, _classCallCheck3.default)(this, MockMMU);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MockMMU).call(this));

    _this.x = {};_this.y = {};return _this;
  }

  (0, _createClass3.default)(MockMMU, [{
    key: 'name',
    value: function name() {
      return 'MockMMU';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return _device2.default.Type.MMU;
    }
  }, {
    key: 'version',
    value: function version() {
      return 0;
    }
  }, {
    key: 'ramSize',
    value: function ramSize() {
      return 0x10000;
    }
  }, {
    key: 'active',
    value: function active() {
      return false;
    }
  }, {
    key: 'get',
    value: function get(a) {
      return this.x[a];
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      this.x[a] = v;
    }
  }, {
    key: 'getMemory',
    value: function getMemory(a) {
      return this.y[a];
    }
  }, {
    key: 'setMemory',
    value: function setMemory(a, v) {
      this.y[a] = v;
    }
  }]);
  return MockMMU;
}(_device2.default);

var MockDevice = function (_Device2) {
  (0, _inherits3.default)(MockDevice, _Device2);

  function MockDevice() {
    (0, _classCallCheck3.default)(this, MockDevice);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MockDevice).apply(this, arguments));
  }

  (0, _createClass3.default)(MockDevice, [{
    key: 'name',
    value: function name() {
      return 'MockDevice';
    }
  }, {
    key: 'deviceType',
    value: function deviceType() {
      return _device2.default.Type.OTHER_OUTPUT;
    }
  }, {
    key: 'version',
    value: function version() {
      return 1;
    }
  }, {
    key: 'memorySize',
    value: function memorySize() {
      return 0x2000;
    }
  }, {
    key: 'constantList',
    value: function constantList() {
      return { 'CONST': 0x123 };
    }
  }]);
  return MockDevice;
}(_device2.default);

(0, _tapeCatch2.default)('Motherboard: add devices', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockDevice());
  t.equals(m.devices.length, 1, 'one device added');
  t.equals(m.devices[0].CONST, 0xF0001123, 'device constant set');
  t.equals(m.get(0xF0001001), 1, 'device version is ok');
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: devices addresses', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockDevice());
  m.addDevice(new MockDevice());
  t.equals(m.get32(0xF0000000), 0xF0001000, 'device 0 address');
  t.equals(m.get32(0xF0000004), 0xF0003000, 'device 1 address');
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: mmu access', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockMMU());
  t.ok(m._mmu, '_mmu is set');
  m.set(0x5, 0x42);
  t.equals(m.get(0x5), 0x42, 'mmu is working');
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: memory map', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockMMU());
  m.addDevice(new MockDevice());
  var expectedMemoryMap = [{ addr: 0x0, deviceType: _device2.default.Type.RAM, size: 0x10000 }, { addr: 0x10000, deviceType: _device2.default.Type.UNUSED, size: 0xEFFF0000 }, { addr: 0xF0000000, deviceType: _device2.default.Type.MOTHERBOARD, size: 0x1000 }, { addr: 0xF0001000, deviceType: _device2.default.Type.MMU, size: 0x1000 }, { addr: 0xF0002000, deviceType: _device2.default.Type.OTHER_OUTPUT, size: 0x2000 }, { addr: 0xF0004000, deviceType: _device2.default.Type.UNUSED, size: 0xFFFC000 }];
  var memoryMap = m.memoryMap();
  t.equals(memoryMap.length, expectedMemoryMap.length, '# of entries in memoryMap is correct');
  for (var i = 0; i < memoryMap.length; ++i) {
    t.equals(memoryMap[i].addr, expectedMemoryMap[i].addr, 'memoryMap.address is correct (record ' + i + ')');
    t.equals(memoryMap[i].deviceType, expectedMemoryMap[i].deviceType, 'memoryMap.deviceType is correct (record ' + i + ')');
    t.equals(memoryMap[i].size, expectedMemoryMap[i].size, 'memoryMap.size is correct (record ' + i + ')');
  }
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: step', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockMMU());
  m.addDevice(new MockDevice());
  try {
    m.step();
    t.pass('step has succeded');
  } catch (e) {
    t.fail('step has failed');
  }
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: unauthorized read', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockMMU());
  m.get(0xFF000000);
  t.equals(m.get(m.MB_ERR), m.MB_ERR_UNAUTH_READ, 'MB_ERR_UNAUTH_WRITE is set');
  t.end();
});

(0, _tapeCatch2.default)('Motherboard: unauthorized write', function (t) {
  var m = new _motherboard2.default();
  m.addDevice(new MockMMU());
  m.set(0xFF000000, 1);
  t.equals(m.get(m.MB_ERR), m.MB_ERR_UNAUTH_WRITE, 'MB_ERR_UNAUTH_WRITE is set');
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/device":120,"../emu/motherboard":125,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"tape-catch":112}],141:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('RAM: Get/set', function (t) {
  var r = new _ram2.default(4);
  t.equal(r.get(3), 0, 'get byte');
  r.set(3, 0xFF);
  t.equal(r.get(3), 0xFF, 'get changed byte');
  t.end();
});

(0, _tape2.default)('RAM: Size', function (t) {
  var r = new _ram2.default(4);
  t.equal(r.size, 4 * 1024, 'size ok');
  t.end();
});

(0, _tape2.default)('RAM: Invalid value', function (t) {
  var r = new _ram2.default(4);
  try {
    r.set(3, 257);
    t.fail('accepted an invalid value');
  } catch (_) {
    t.pass('did not accept');
  }
  t.end();
});

(0, _tape2.default)('RAM: Out of bounds', function (t) {
  var r = new _ram2.default(4);
  try {
    r.set(0xFFFFFFFF, 1);
    t.fail('accepted an invalid value');
  } catch (e) {
    if (e.name === 'out of bounds') {
      t.pass('out of bounds');
    } else {
      t.fail('invalid exception');
    }
  }
  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/ram":126,"tape":113}],142:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _lsbstorage = require('../emu/lsbstorage');

var _lsbstorage2 = _interopRequireDefault(_lsbstorage);

var _storage = require('../emu/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FakeDisk = function (_LSBStorage) {
  (0, _inherits3.default)(FakeDisk, _LSBStorage);

  function FakeDisk() {
    (0, _classCallCheck3.default)(this, FakeDisk);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FakeDisk).call(this));

    _this._data = new Uint8Array(1024);return _this;
  }

  (0, _createClass3.default)(FakeDisk, [{
    key: 'get',
    value: function get(a) {
      return this._data[a];
    }
  }, {
    key: 'set',
    value: function set(a, v) {
      this._data[a] = v;
    }
  }, {
    key: 'size',
    get: function get() {
      return 1024;
    }
  }]);
  return FakeDisk;
}(_lsbstorage2.default);

;

function makeStorage(units) {
  var m = new _motherboard2.default();
  m.addDevice(new _mmu2.default(new _ram2.default(256)));
  var c = new _cpu2.default(m);
  m.addDevice(c);
  var s = new _storage2.default(units);
  m.addDevice(s);
  return [m, c, s];
}

(0, _tape2.default)('Storage: sanity', function (t) {
  t.doesNotThrow(function () {
    return new _storage2.default([new FakeDisk()]);
  }, null, "storage created");
  t.doesNotThrow(function () {
    return makeStorage([new FakeDisk()]);
  }, null, "storage created and added to motherboard");
  t.end();
});

(0, _tape2.default)('Storage: unit list', function (t) {
  var _makeStorage = makeStorage([]);

  var _makeStorage2 = (0, _slicedToArray3.default)(_makeStorage, 3);

  var mb1 = _makeStorage2[0];
  var cpu1 = _makeStorage2[1];
  var stg1 = _makeStorage2[2];

  t.equals(mb1.get(stg1.STG_UNIT_LIST), 0, 'no storage units');

  var _makeStorage3 = makeStorage([new FakeDisk()]);

  var _makeStorage4 = (0, _slicedToArray3.default)(_makeStorage3, 3);

  var mb2 = _makeStorage4[0];
  var cpu2 = _makeStorage4[1];
  var stg2 = _makeStorage4[2];

  t.equals(mb2.get(stg2.STG_UNIT_LIST), 1, 'one storage unit');

  var _makeStorage5 = makeStorage([new FakeDisk(), new FakeDisk()]);

  var _makeStorage6 = (0, _slicedToArray3.default)(_makeStorage5, 3);

  var mb3 = _makeStorage6[0];
  var cpu3 = _makeStorage6[1];
  var stg3 = _makeStorage6[2];

  t.equals(mb3.get(stg3.STG_UNIT_LIST), 3, 'two storage units');

  t.end();
});

(0, _tape2.default)('Get storage unit size', function (t) {
  var _makeStorage7 = makeStorage([new FakeDisk()]);

  var _makeStorage8 = (0, _slicedToArray3.default)(_makeStorage7, 3);

  var mb = _makeStorage8[0];
  var cpu = _makeStorage8[1];
  var stg = _makeStorage8[2];


  mb.set(0x0, 0x86); // nop

  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set(stg.STG_OP, stg.STG_OP_SIZE);

  mb.step();

  t.equals(mb.get32(stg.STG_R0), 1024, 'lower 4 bytes == 1024');
  t.equals(mb.get32(stg.STG_R1), 0, 'upper 4 bytes == 0');

  t.end();
});

(0, _tape2.default)('Storage: read (poll)', function (t) {
  var _makeStorage9 = makeStorage([new FakeDisk()]);

  var _makeStorage10 = (0, _slicedToArray3.default)(_makeStorage9, 3);

  var mb = _makeStorage10[0];
  var cpu = _makeStorage10[1];
  var stg = _makeStorage10[2];


  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86); // nop
  stg._units[0].setString(0x100, 'abcdefghijklm'); // 13 bytes

  // read data

  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set32(stg.STG_P1, 0x100); // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20); // memory position: 0x20
  mb.set32(stg.STG_P4, 13); // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equals(mb.get(0x20), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equals(mb.get(0x2C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});

(0, _tape2.default)('Storage: write (poll)', function (t) {
  var _makeStorage11 = makeStorage([new FakeDisk()]);

  var _makeStorage12 = (0, _slicedToArray3.default)(_makeStorage11, 3);

  var mb = _makeStorage12[0];
  var cpu = _makeStorage12[1];
  var stg = _makeStorage12[2];


  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86); // nop
  mb.setString(0x20, 'abcdefghijklm'); // 13 bytes

  // write data

  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set32(stg.STG_P1, 0x20); // memory position: 0x20
  mb.set32(stg.STG_P2, 0x100); // position in stg: 0x100
  mb.set32(stg.STG_P3, 0x0);
  mb.set32(stg.STG_P4, 13); // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_WRITE);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equals(stg._units[0].get(0x100), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equals(stg._units[0].get(0x10C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});

(0, _tape2.default)('Storage: read (interrupt)', function (t) {
  var _makeStorage13 = makeStorage([new FakeDisk()]);

  var _makeStorage14 = (0, _slicedToArray3.default)(_makeStorage13, 3);

  var mb = _makeStorage14[0];
  var cpu = _makeStorage14[1];
  var stg = _makeStorage14[2];


  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = done');

  mb.set(0x0, 0x86); // nop
  stg._units[0].setString(0x100, 'abcdefghijklm'); // 13 bytes

  // preapre interrupt
  mb.set(stg.STG_MODE, stg.STG_MODE_INTERRUPT);
  mb.set32(cpu.CPU_INTERRUPT_VECT + 4 * mb.get(stg.STG_INTERRUPT), 0x1000);
  cpu.T = true;

  // read data
  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set32(stg.STG_P1, 0x100); // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20); // memory position: 0x20
  mb.set32(stg.STG_P4, 13); // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  t.equals(cpu.PC, 0x1000, 'interrupt was called');
  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'writing successful');
  t.equals(mb.get(0x20), 'a'.charCodeAt(0), 'stored correctly - first byte');
  t.equals(mb.get(0x2C), 'm'.charCodeAt(0), 'stored correctly - last byte');

  t.end();
});

(0, _tape2.default)('Storage: invalid read (above size)', function (t) {
  var _makeStorage15 = makeStorage([new FakeDisk()]);

  var _makeStorage16 = (0, _slicedToArray3.default)(_makeStorage15, 3);

  var mb = _makeStorage16[0];
  var cpu = _makeStorage16[1];
  var stg = _makeStorage16[2];


  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_OK, 'initial status = ok');

  mb.set(0x0, 0x86); // nop

  // read data

  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set32(stg.STG_P1, 0xFFFF0000); // position in stg: 0x100
  mb.set32(stg.STG_P2, 0x0);
  mb.set32(stg.STG_P3, 0x20); // memory position: 0x20
  mb.set32(stg.STG_P4, 1); // size: 13 bytes
  mb.set(stg.STG_OP, stg.STG_OP_READ);

  mb.step();

  while (mb.get(stg.STG_OP_STATUS) === stg.STG_STATUS_WAITING) {}

  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_ADDRESS_ERROR, 'invalid read caused error');

  t.end();
});

(0, _tape2.default)('Storage: invalid read (unit unavaliable)', function (t) {
  var _makeStorage17 = makeStorage([]);

  var _makeStorage18 = (0, _slicedToArray3.default)(_makeStorage17, 3);

  var mb = _makeStorage18[0];
  var cpu = _makeStorage18[1];
  var stg = _makeStorage18[2];


  mb.set(0x0, 0x86); // nop

  mb.set32(stg.STG_P0, 0x0); // unit 0
  mb.set(stg.STG_OP, stg.STG_OP_SIZE);

  mb.step();

  t.equals(mb.get(stg.STG_OP_STATUS), stg.STG_STATUS_UNAVALIABLE, 'unit unavaliable caused error');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/cpu":119,"../emu/lsbstorage":122,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"../emu/storage":127,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":16,"babel-runtime/helpers/possibleConstructorReturn":17,"babel-runtime/helpers/slicedToArray":18,"tape":113}],143:[function(require,module,exports){
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _timer = require('../emu/timer');

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeTimer() {
  var m = new _motherboard2.default();
  m.addDevice(new _mmu2.default(new _ram2.default(256)));
  var c = new _cpu2.default(m);
  m.addDevice(c);
  var t = new _timer2.default();
  m.addDevice(t);
  return [m, c, t];
}

function sleep(ms) {
  var d = Date.now() + ms >>> 0;
  while (d > Date.now() >>> 0) {} // busy wait
}

(0, _tape2.default)('Timer: sanity', function (t) {
  t.doesNotThrow(function () {
    return new _timer2.default();
  }, null, "timer created");
  t.doesNotThrow(function () {
    return makeTimer();
  }, null, "timer created and added to motherboard");
  t.end();
});

(0, _tape2.default)('Timer: clock', function (t) {
  var _makeTimer = makeTimer();

  var _makeTimer2 = (0, _slicedToArray3.default)(_makeTimer, 3);

  var mb = _makeTimer2[0];
  var cpu = _makeTimer2[1];
  var tm = _makeTimer2[2];

  var d = new Date(2016, 1, 1).valueOf();

  mb.step();

  var cp_now = Date.now() - d >>> 0;
  var vm_now = mb.get32(tm.TM_CLOCK);

  t.ok(vm_now >= cp_now - 10000 && vm_now <= cp_now + 10000, 'times match 0x' + vm_now.toString(16) + ' (VM) vs 0x' + cp_now.toString(16));

  t.end();
});

(0, _tape2.default)('Timer: counter', function (t) {
  var _makeTimer3 = makeTimer();

  var _makeTimer4 = (0, _slicedToArray3.default)(_makeTimer3, 3);

  var mb = _makeTimer4[0];
  var cpu = _makeTimer4[1];
  var tm = _makeTimer4[2];


  mb.set32(tm.TM_TIMER0, 1000);
  sleep(100);
  mb.step();
  var v = mb.get32(tm.TM_COUNTER0);
  t.notEqual(v, 0, 'counter != 0');
  t.ok(v > 50, 'counter > 50');

  t.end();
});

(0, _tape2.default)('Timer: interrupt', function (t) {
  var _makeTimer5 = makeTimer();

  var _makeTimer6 = (0, _slicedToArray3.default)(_makeTimer5, 3);

  var mb = _makeTimer6[0];
  var cpu = _makeTimer6[1];
  var tm = _makeTimer6[2];


  mb.set(0x0, 0x86); // nop
  mb.set32(cpu.CPU_INTERRUPT_VECT + 4 * mb.get(tm.TM_INTERRUPT), 0x1000);
  cpu.T = true;

  mb.set32(tm.TM_TIMER1, 50); // setup timer
  sleep(100);
  mb.step();

  t.equals(cpu.PC, 0x1000, 'interrupt was called');
  t.equals(mb.get(tm.TM_CUR_INT), 0x1, 'the correct interrupt was called');

  t.end();
});

// vim: ts=2:sw=2:sts=2:expandtab

},{"../emu/cpu":119,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"../emu/timer":128,"babel-runtime/helpers/slicedToArray":18,"tape":113}],144:[function(require,module,exports){
'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _motherboard = require('../emu/motherboard');

var _motherboard2 = _interopRequireDefault(_motherboard);

var _ram = require('../emu/ram');

var _ram2 = _interopRequireDefault(_ram);

var _mmu = require('../emu/mmu');

var _mmu2 = _interopRequireDefault(_mmu);

var _cpu = require('../emu/cpu');

var _cpu2 = _interopRequireDefault(_cpu);

var _video = require('../emu/video');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../emu/cpu":119,"../emu/mmu":124,"../emu/motherboard":125,"../emu/ram":126,"../emu/video":129,"tape":113}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.assemblyToLif = assemblyToLif;
exports.joinLifObjects = joinLifObjects;
exports.createRelocationTable = createRelocationTable;
exports.convertLifToLrf = convertLifToLrf;
exports.convertLifToBinary = convertLifToBinary;

var _encoder = require('./encoder');

var _encoder2 = _interopRequireDefault(_encoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'); // LIF : Luisa Internal Format (acutally a JSON object)
// LRF : Luisa Relocatable Format (executables, object files and libraries)

var reservedWords = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'fp', 'sp', 'pc', 'fl', 'y', 'v', 'z', 's', 'gt', 'lt', 'p', 't', 'mov', 'movb', 'movw', 'movd', 'or', 'xor', 'and', 'shl', 'shr', 'not', 'add', 'sub', 'cmp', 'mul', 'idiv', 'mod', 'inc', 'dec', 'bz', 'beq', 'bnz', 'bneq', 'bneg', 'bpos', 'bgt', 'bgte', 'blt', 'blte', 'bv', 'bnv', 'jmp', 'jsr', 'ret', 'sys', 'iret', 'sret', 'pushb', 'pushw', 'pushd', 'push.a', 'popb', 'popw', 'popd', 'pop.a', 'popx', 'nop', 'db', 'dw', 'dd', 'resb', 'resw', 'resd'];

//
// CONVERT ASSEMBLY TO LIF
//

function assemblyToLif(code) {

  function replaceConstants(line, ctx) {
    for (var c in ctx.constants) {
      line = line.replace(c, ctx.constants[c]);
    }
    return line;
  }

  function parseSection(pars, ctx) {
    if (pars.length !== 1) {
      throw new Error('Syntax error in line ' + ctx.nline + '. [section]');
    }
    var section = pars[0];
    if (section === 'text' || section === 'bss' || section === 'data' || section === 'rodata') {
      return section;
    } else {
      throw new Error('Invalid section ' + section + ' in line ' + ctx.nline + '.');
    }
  }

  function parseConstant(pars, ctx) {
    if (pars.length !== 2) {
      throw new Error('Syntax error in line ' + ctx.nline + '. [define]');
    }

    var _pars = (0, _slicedToArray3.default)(pars, 2);

    var name = _pars[0];
    var value = _pars[1];

    if (!/[A-z]\w*/.test(name)) {
      throw new Error('Invalid name for a define in line ' + ctx.nline + '. [define]');
    }
    if (reservedWords.includes(name)) {
      throw new Error(name + ' is a reserved word in line ' + ctx.nline + '. [define]');
    }
    ctx.constants[name] = value;
  }

  function parseImport(pars, ctx) {
    if (pars.length !== 1) {
      throw new Error('Syntax error in line ' + ctx.nline + '. [import]');
    }
    var importedFile = undefined;
    try {
      importedFile = fs.readFileSync(pars[0]);
    } catch (e) {
      throw new Error('Error reading file ' + pars[0] + ': ' + e);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(importedFile.toString().split('\n')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var line = _step.value;

        line = line.replace(/;.*/, '').trim();
        if (line.startsWith('.define')) {
          parseConstant(line.trim().split(/[\s\t]+/).slice(1), ctx);
        } else if (line !== '') {
          throw new Error('Invalid line in file ' + pars[0] + ': \'' + line + '\'');
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function chompLabels(line, ctx) {
    var re = /[\.@]?[A-z]\w*:[\s\t]*/g;
    var a = undefined;
    var last = 0;
    // for each symbol found
    while ((a = re.exec(line)) !== null) {
      // prepare symbol
      var label = a[0].trim();
      label = label.slice(0, label.length - 1);
      // check if it's local or static/global
      if (label.startsWith('.')) {
        label = ctx.currentSymbol + label;
      } else {
        ctx.currentSymbol = label;
      }
      // check if symbol is duplicated
      if (label in ctx.symbols) {
        throw new Error('Symbol \'' + label + '\' duplicated in line ' + ctx.nline + '.');
      }
      // find address
      var addr = undefined;
      if (ctx.currentSection === 'bss') {
        addr = ctx.bss;
      } else {
        addr = ctx[ctx.currentSection].length;
      }
      // add symbol
      ctx.symbols[label] = { section: ctx.currentSection, addr: addr };
      last = re.lastIndex;
    }
    return line.slice(last);
  }

  function parseText(line, ctx) {
    var bytes = (0, _encoder2.default)(line, true, ctx.currentSymbol);
    return bytes;
  }

  function parseBSS(line, ctx) {
    var sp = line.split(/[\s\t]+/);
    if (sp.length !== 2) {
      throw new Error('Syntax error in line ' + ctx.nline + '. [bss]');
    }

    var _sp = (0, _slicedToArray3.default)(sp, 2);

    var cmd = _sp[0];
    var par = _sp[1];

    par = parseInt(par);
    if (isNaN(par)) {
      throw new Error('Invalid number in line ' + ctx.nline + '. [bss]');
    }
    switch (cmd) {
      case 'resb':
        return par;
      case 'resw':
        return par * 2;
      case 'resd':
        return par * 4;
      default:
        throw new Error('Invalid command \'' + cmd + '\' in line ' + ctx.nline + '.');
    }
  }

  function parseData(line, section, ctx) {
    var sp = line.split(/[\s\t]+/);
    if (sp.length < 2) {
      throw new Error('Syntax error in line ' + ctx.nline + '. [' + section + ']');
    }

    var _sp2 = (0, _toArray3.default)(sp);

    var cmd = _sp2[0];

    var par = _sp2.slice(1);

    var data = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(par.join(' ').split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var b = _step2.value;
        // split by commas
        if (b === undefined) {
          continue;
        }
        var value = undefined;
        if (cmd == 'db' && (b.startsWith('"') || b.startsWith("'"))) {
          // string
          data = data.concat(parseString(b, ctx));
        } else {
          // numbers
          value = parseInt(b);
          if (isNaN(value)) {
            throw new Error('Invalid number in line ' + ctx.nline + '.');
          }
          switch (cmd) {
            case 'db':
              if (value > 0xFF) {
                throw new Error('Number too large in line ' + ctx.nline + '.');
              }
              data.push(value);
              break;
            case 'dw':
              if (value > 0xFFFF) {
                throw new Error('Number too large in line ' + ctx.nline + '.');
              }
              data = data.concat([value & 0xFF, value >> 8]);
              break;
            case 'dd':
              if (value > 0xFFFFFFFF) {
                throw new Error('Number too large in line ' + ctx.nline + '.');
              }
              data = data.concat([value & 0xFF, value >> 8 & 0xFF, value >> 16 & 0xFF, value >> 24 & 0xFF]);
              break;
            default:
              throw new Error('Invalid command \'' + cmd + '\' in line ' + ctx.nline + '.');
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return data;
  }

  function parseString(s, ctx) {
    var data = [];
    s = s.slice(1, s.length - 1); // remove quotes
    for (var i = 0; i < s.length; ++i) {
      if (s[i] === '\\') {
        if (i === s.length - 1) {
          throw new Error('Backslash requires a character afterwords, at ' + ctx.nline + '.');
        }
        var v = undefined;
        switch (s[i + 1]) {
          case 'n':
            v = 13;break;
          case '0':
            v = 0;break;
          case '\\':
            v = '\\'.charCodeAt(0);break;
          default:
            throw new Error('Invalid backslash at ' + ctx.nline + '.');
        }
        data.push(v);
        ++i;
      } else {
        data.push(s[i].charCodeAt(0));
      }
    }
    return data;
  }

  function addExports(ctx) {
    ctx.exports = (0, _keys2.default)(ctx.symbols).filter(function (n) {
      return n.startsWith('@');
    });
  }

  //
  // MAIN PROCEDURE
  //

  var ctx = {
    text: [],
    bss: 0,
    data: [],
    rodata: [],
    symbols: {},
    constants: {},
    reloc: [],
    exports: [],
    unresolved: [],
    currentSection: undefined,
    currentSymbol: '',
    nline: 1
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(code.split('\n')), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var line = _step3.value;


      // remove comments
      line = line.replace(/;.*/, '');

      // remove spaces around
      line = line.trim();

      // replace constants
      line = replaceConstants(line, ctx);

      if (line.startsWith('.') && !line.includes(':')) {
        // directive

        var _line$split = line.split(' ');

        var _line$split2 = (0, _toArray3.default)(_line$split);

        var directive = _line$split2[0];

        var pars = _line$split2.slice(1);

        pars = pars.filter(function (n) {
          return n.trim() !== '';
        });
        switch (directive) {
          case '.section':
            ctx.currentSection = parseSection(pars, ctx);break;
          case '.define':
            parseConstant(pars, ctx);break;
          case '.import':
            parseImport(pars, ctx);break;
          default:
            throw new Error('Invalid directive ' + directive + ' in line ' + ctx.nline + '.');
        }
      } else {
        var origLine = line;
        // code
        line = chompLabels(line, ctx);
        if (line !== '') {
          switch (ctx.currentSection) {
            case 'text':
              ctx.text = ctx.text.concat(parseText(line, ctx));break;
            case 'bss':
              ctx.bss += parseBSS(line, ctx);break;
            case 'data':
              ctx.data = ctx.data.concat(parseData(line, 'data', ctx));break;
            case 'rodata':
              ctx.rodata = ctx.rodata.concat(parseData(line, 'rodata', ctx));break;
            default:
              throw new Error('Invalid section in line ' + ctx.nline + '.');
          }
        }
      }

      ++ctx.nline;
    }

    // final adjustments
    // addExports(ctx); - TODO

    // remove contextual unwanted info
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  delete ctx.currentSection;
  delete ctx.currentSymbol;
  delete ctx.constants;
  delete ctx.nline;
  if ((0, _keys2.default)(ctx.symbols).length === 0) {
    delete ctx.symbols;
  }
  if (ctx.text.length === 0) {
    delete ctx.text;
  }
  if (ctx.bss === 0) {
    delete ctx.bss;
  }
  if (ctx.data.length === 0) {
    delete ctx.data;
  }
  if (ctx.rodata.length === 0) {
    delete ctx.rodata;
  }
  if (ctx.reloc.length === 0) {
    delete ctx.reloc;
  }
  if (ctx.exports.length === 0) {
    delete ctx.exports;
  }
  if (ctx.unresolved.length === 0) {
    delete ctx.unresolved;
  }

  return ctx;
}

//
// JOIN LIF FILES
//

function joinLifObjects(objects) {

  function joinTwoLifObjects(objA, objB) {
    var joined = {};
    // join sections text, data and rodata
    var _arr = ['text', 'data', 'rodata'];
    for (var _i = 0; _i < _arr.length; _i++) {
      var section = _arr[_i];
      if (objA[section] || objB[section]) {
        joined[section] = (objA[section] ? objA[section] : []).concat(objB[section] ? objB[section] : []);
      }
    }
    // join bss
    if (objA.bss || objB.bss) {
      joined.bss = (objA.bss ? objA.bss : 0) + (objB.bss ? objB.bss : 0);
    }
    // add symbols
    joined.symbols = {};
    if (objA.symbols) {
      (0, _keys2.default)(objA.symbols).forEach(function (k) {
        return joined.symbols[k] = objA.symbols[k];
      });
    }
    if (objB.symbols) {
      (0, _keys2.default)(objB.symbols).forEach(function (k) {
        var sym = { section: objB.symbols[k].section, addr: objB.symbols[k].addr };
        if (sym.section === 'bss') {
          sym.addr += objA.bss ? objA.bss : 0;
        } else {
          sym.addr += objA[sym.section] ? objA[sym.section].length : 0;
        }
        joined.symbols[k] = sym;
      });
    }
    if ((0, _keys2.default)(joined.symbols).length === 0) {
      delete joined.symbols;
    }
    return joined;
  }

  // join all LIF objects
  var joined = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, _getIterator3.default)(objects), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var obj = _step4.value;

      joined = joinTwoLifObjects(joined, obj);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return joined;
}

//
// RESOLVE SYMBOLS & CREATE RELOCATION TABLE
//

function createRelocationTable(obj, resolvePublic, allowToLeavePublicPending) {
  if (!obj.text) {
    return obj;
  }
  if (!obj.reloc) {
    obj.reloc = [];
  }

  // resolve references in text
  var resolved = {};
  for (var i = 0; i < obj.text.length; ++i) {
    var v = obj.text[i];
    if (typeof v === 'string') {
      if (v.startsWith('@') && !resolvePublic) {
        continue;
      }
      var sym = obj.symbols[v];
      if (!sym) {
        if (v.startsWith('@') && allowToLeavePublicPending) {} else {
          throw new Error('Symbol ' + v + ' was not found in symbol table.');
        }
      } else {
        obj.reloc.push({ offset: i, desloc: sym.addr, section: sym.section });
        resolved[v] = true;
        obj.text[i] = 0x00;
      }
    }
  }

  // remove resolved symbols
  if (obj.symbols) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)((0, _keys2.default)(obj.symbols)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var s = _step5.value;

        if (s in resolved) {
          delete obj.symbols[s];
        }
      }

      // check if everything was resolved
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = (0, _getIterator3.default)((0, _keys2.default)(obj.symbols)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var s = _step6.value;

        if (!s.startsWith('@') || s.startsWith('@') && !allowToLeavePublicPending) {
          throw new Error('Symbol ' + s + ' could not be resolved.');
        }
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }

  // remove symbol table, if empty
  if (obj.symbols && (0, _keys2.default)(obj.symbols).length === 0) {
    delete obj.symbols;
  }

  return obj;
}

//
// GENERATE BINARY
//

function convertLifToLrf(obj) {
  throw new Error('not implemented yet');
}

function convertLifToBinary(obj, offset) {
  // find positions
  var pos = {};
  pos.text = offset;
  pos.data = pos.text + (obj.text ? obj.text.length : 0);
  pos.rodata = pos.data + (obj.data ? obj.data.length : 0);
  pos.bss = pos.rodata + (obj.rodata ? obj.rodata.length : 0);

  // add data
  var data = [];
  var _arr2 = ['text', 'data', 'rodata'];
  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var section = _arr2[_i2];
    if (obj[section]) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = (0, _getIterator3.default)(obj[section]), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var d = _step8.value;
          data.push(d);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  }
  if (obj.bss) {
    for (var i = 0; i < obj.bss; ++i) {
      data.push(0);
    }
  }

  // replace relocation symbols
  function replace(data, position, newData) {
    if (position + 3 > data.length) {
      throw new Error('Invalid relocation in position 0x' + position.toString(16) + '.');
    }
    data[position] = newData & 0xFF;
    data[position + 1] = newData >> 8 & 0xFF;
    data[position + 2] = newData >> 16 & 0xFF;
    data[position + 3] = newData >> 24 & 0xFF;
  }

  if (obj.reloc) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = (0, _getIterator3.default)(obj.reloc), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var r = _step7.value;

        replace(data, r.offset, r.desloc + pos[r.section]);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }

  return data;
}

// vim: ts=2:sw=2:sts=2:expandtab

},{"./encoder":147,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/slicedToArray":18,"babel-runtime/helpers/toArray":19,"fs":148}],146:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function h(n, digits) {
  return (Array(digits || 0).join('0') + n.toString(16)).substr(-digits).toUpperCase();
}

var Debugger = function () {
  function Debugger(luisavm) {
    (0, _classCallCheck3.default)(this, Debugger);

    this._vm = luisavm;
    this._const = this._loadConstants();
    this._last = '';
    this._lastAddress = undefined;
    this._breakpoints = {};
  }

  (0, _createClass3.default)(Debugger, [{
    key: 'parse',
    value: function parse(s) {
      var _this = this;

      var _s$split = s.split(' ');

      var _s$split2 = (0, _toArray3.default)(_s$split);

      var cmd = _s$split2[0];

      var pars = _s$split2.slice(1);

      pars = pars.map(function (i) {
        return _this._translate(i);
      });

      if (cmd === '') {
        if (this._last === 's' || this._last === 'n' || this._last === 'l') {
          cmd = this._last;
        }
      }
      this._last = cmd;

      if (cmd !== 'l') {
        this._lastAddress = undefined;
      }

      switch (cmd) {
        case '?':case 'h':
          return this._help();
        case 'r':
          return this._registers();
        case 's':
          return this._step();
        case 'n':
          return this._stepOver();
        case 'c':
          return this._continue();
        case 'l':
          return this._list(pars[0]);
        case 'b':
          return this._setBreakpoint(pars[0]);
        case 'd':
          return this._unsetBreakpoint(pars[0]);
        case 'm':
          return this._dumpMemory(pars[0], pars[1]);
        case 'p':case 'pb':
          return this._printMemory(8, pars[0]);
        case 'pw':
          return this._printMemory(16, pars[0]);
        case 'pd':
          return this._printMemory(32, pars[0]);
        case 'e':case 'eb':
          return this._enterMemory(8, pars[0], pars[1]);
        case 'ew':
          return this._enterMemory(16, pars[0], pars[1]);
        case 'ed':
          return this._enterMemory(32, pars[0], pars[1]);
        case 'f':
          return this._fillMemory(pars[0], pars[1], pars[2]);
        case 'x':
          return this._copyMemory(pars[0], pars[1], pars[2]);
        case 'v':
          return 'Not implemented yet (sorry).';
        default:
          return 'syntax error (use [?] for help)';
      }
    }
  }, {
    key: 'welcome',
    value: function welcome() {
      return 'Welcome to LuisaVM debugger. Type \'?\' for help.\n\n' + this._instruction();
    }
  }, {
    key: '_loadConstants',
    value: function _loadConstants() {
      var _const = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._vm.mb.devices), _step2; !(_iteratorNormalCompletion = (_step2 = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dev = _step2.value;

          for (var c in dev.constantList()) {
            _const[dev[c]] = c;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _const;
    }
  }, {
    key: '_help',
    value: function _help() {
      return 'CPU:\n  [r] Registers\n  [s] step through\n  [n] step over\n  [c] start/continue execution\n  [b]/[d] set/delete breakpoint ([address=PC])\n  [l] disassemly ([address=PC])\n\nMemory:\n  [m] dump memory block       (address [size=0x100])\n  [p/pw/pd] print memory data (address)\n  [e/ew/ed] enter memory data (address value)\n  [f] fill memory with data   (address size value)\n  [x] copy memory block       (origin destination size)\n  [v] virtual memory info';
    }
  }, {
    key: '_instruction',
    value: function _instruction(addr) {
      if (addr === undefined) {
        addr = this._vm.cpu.PC;
      }
      return (this._breakpoints[addr] ? '*' : ' ') + ' 0x' + h(addr, 8) + ' -> ' + this.decode(addr)[0];
    }
  }, {
    key: '_registers',
    value: function _registers() {
      var c = this._vm.cpu;
      return 'A: ' + h(c.A, 8) + '    E: ' + h(c.E, 8) + '    I: ' + h(c.I, 8) + '    FP: ' + h(c.FP, 8) + '\nB: ' + h(c.B, 8) + '    F: ' + h(c.F, 8) + '    J: ' + h(c.J, 8) + '    SP: ' + h(c.SP, 8) + '\nC: ' + h(c.C, 8) + '    G: ' + h(c.G, 8) + '    K: ' + h(c.K, 8) + '    PC: ' + h(c.PC, 8) + '\nD: ' + h(c.D, 8) + '    H: ' + h(c.H, 8) + '    L: ' + h(c.L, 8) + '    FL: ' + h(c.FL, 8) + '\n\nFlags => Y:' + (c.Y ? 1 : 0) + '  V:' + (c.V ? 1 : 0) + '  Z:' + (c.Z ? 1 : 0) + '  S:' + (c.S ? 1 : 0) + '  GT:' + (c.GT ? 1 : 0) + '  LT:' + (c.LT ? 1 : 0) + '  P:' + (c.P ? 1 : 0) + '  T:' + (c.T ? 1 : 0) + '\n\n' + this._instruction();
    }
  }, {
    key: '_step',
    value: function _step() {
      this._vm.step();
      return this._instruction();
    }
  }, {
    key: '_stepOver',
    value: function _stepOver() {
      var next = this._vm.cpu.PC + this.decode()[1];
      this._setBreakpoint(next);
      var s = this._continue();
      this._unsetBreakpoint(next);
      return s;
    }
  }, {
    key: '_continue',
    value: function _continue() {
      do {
        this._vm.step();
        if (this._vm.cpu.invalidUpcode) {
          this._vm.cpu.invalidUpcode = false;
          return 'Invalid opcode detected!\n' + this._instruction();
        }
      } while (!(this._vm.cpu.PC in this._breakpoints));
      return this._instruction();
    }
  }, {
    key: '_list',
    value: function _list(cmd) {
      var addr = undefined;
      if (cmd) {
        addr = cmd;
      } else if (this._lastAddress !== undefined) {
        addr = this._lastAddress;
      } else {
        addr = this._vm.cpu.PC;
      }

      var r = [];
      for (var i = 0; i < 5; ++i) {
        var _decode = this.decode(addr);

        var _decode2 = (0, _slicedToArray3.default)(_decode, 2);

        var op = _decode2[0];
        var a = _decode2[1];

        r.push((this._breakpoints[addr] ? '*' : ' ') + ' 0x' + h(addr, 8) + ' -> ' + op);
        addr += a;
      }
      this._lastAddress = addr;

      return r.join('\n');
    }
  }, {
    key: '_breakpointList',
    value: function _breakpointList() {
      if ((0, _keys2.default)(this._breakpoints).length === 0) {
        return 'Breakpoints: none.';
      } else {
        return 'Breakpoints: ' + (0, _keys2.default)(this._breakpoints).map(function (a) {
          return '0x' + h(parseInt(a), 8);
        }).join(' ');
      }
    }
  }, {
    key: '_setBreakpoint',
    value: function _setBreakpoint(addr) {
      if (addr === undefined) {
        addr = this._vm.cpu.PC;
      }
      this._breakpoints[addr] = true;
      return this._breakpointList();
    }
  }, {
    key: '_unsetBreakpoint',
    value: function _unsetBreakpoint(addr) {
      if (addr === undefined) {
        addr = this._vm.cpu.PC;
      }
      if (!(addr in this._breakpoints)) {
        return 'No such breakpoint. ' + this._breakpointList();
      }

      delete this._breakpoints[addr];
      return this._breakpointList();
    }
  }, {
    key: '_dumpMemory',
    value: function _dumpMemory(addr, sz) {
      if (addr === undefined) {
        return 'Syntax: m address [size]';
      }

      sz = sz || 0x100;

      addr = Math.floor(addr / 0x10) * 0x10;
      sz = Math.floor(sz / 0x10) * 0x10;

      var ret = [];
      for (var a = addr; a < addr + sz; a += 0x10) {
        var s = [h(a, 8) + ':   '];
        for (var b = a; b < a + 0x10; ++b) {
          s.push(h(this._vm.mb.get(b), 2) + ' ');
          if (b - a == 0x7) {
            s.push(' ');
          }
        }
        s.push('  ');
        for (var b = a; b < a + 0x10; ++b) {
          var m = this._vm.mb.get(b);
          if (m >= 32 && m < 127) {
            s.push(String.fromCharCode(m));
          } else {
            s.push('.');
          }
        }
        ret.push(s.join(''));
      }

      return ret.join('\n');
    }
  }, {
    key: '_printMemory',
    value: function _printMemory(sz, addr) {
      if (addr === undefined) {
        return 'Syntax: p[b/w/d] address';
      }
      console.log(addr, addr.toString(16));
      console.log(this._vm.mb.get(addr));
      if (sz === 8) {
        return '[' + h(addr, 8) + '] = 0x' + h(this._vm.mb.get(addr), 2);
      } else if (sz === 16) {
        return '[' + h(addr, 8) + '] = 0x' + h(this._vm.mb.get16(addr), 4);
      } else if (sz === 32) {
        return '[' + h(addr, 8) + '] = 0x' + h(this._vm.mb.get32(addr), 8);
      }
    }
  }, {
    key: '_enterMemory',
    value: function _enterMemory(sz, addr, value) {
      if (addr === undefined || value === undefined) {
        return 'Syntax: e[b/w/d] address value';
      }
      if (value >= Math.pow(2, sz)) {
        return 'Value too large.';
      }
      if (sz === 8) {
        this._vm.mb.set(addr, value);
      } else if (sz === 16) {
        this._vm.mb.set16(addr, value);
      } else if (sz === 32) {
        this._vm.mb.set32(addr, value);
      }
      return 'Memory set.';
    }
  }, {
    key: '_fillMemory',
    value: function _fillMemory(addr, sz, value) {
      if (addr === undefined || sz === undefined || value === undefined) {
        return 'Syntax: f address size value';
      }
      for (var a = addr; a < addr + sz; ++a) {
        this._vm.mb.set(a, value);
      }
      return 'Memory filled.';
    }
  }, {
    key: '_copyMemory',
    value: function _copyMemory(origin, dest, sz) {
      if (origin === undefined || dest === undefined || sz === undefined) {
        return 'Syntax: c origin destination size';
      }
      for (var i = 0; i < sz; ++i) {
        this._vm.mb.set(dest + i, this._vm.mb.get(origin + i));
      }
      return 'Memory copied.';
    }
  }, {
    key: '_translate',
    value: function _translate(addr) {
      if (addr.startsWith('0x')) {
        addr = addr.slice(2);
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(this._const)), _step3; !(_iteratorNormalCompletion2 = (_step3 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var k = _step3.value;

          if (addr === this._const[k]) {
            return parseInt(k);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return parseInt('0x' + addr);
    }

    //
    // INSTRUCTION ENCODING
    //

  }, {
    key: 'decode',


    //
    // DECODING
    //
    value: function decode(addr) {

      if (addr === undefined) addr = this._vm.cpu.PC;

      function reg(n) {
        switch (n) {
          case 0x0:
            return 'A';
          case 0x1:
            return 'B';
          case 0x2:
            return 'C';
          case 0x3:
            return 'D';
          case 0x4:
            return 'E';
          case 0x5:
            return 'F';
          case 0x6:
            return 'G';
          case 0x7:
            return 'H';
          case 0x8:
            return 'I';
          case 0x9:
            return 'J';
          case 0xA:
            return 'K';
          case 0xB:
            return 'L';
          case 0xC:
            return 'FP';
          case 0xD:
            return 'SP';
          case 0xE:
            return 'PC';
          case 0xF:
            return 'FL';
          default:
            return '?';
        }
      }

      function v8(n) {
        if (n instanceof Array) {
          return '0x' + h(n[0], 2);
        } else {
          return '0x' + h(n, 2);
        }
      }

      function v16(n) {
        return '0x' + h(n[1], 2) + h(n[0], 2);
      }

      var _const = this._const;
      function v32(n) {
        var value = (n[3] << 24 | n[2] << 16 | n[1] << 8 | n[0]) >>> 0;
        if (value in _const) {
          return _const[value];
        } else {
          return '0x' + h(n[3], 2) + h(n[2], 2) + h(n[1], 2) + h(n[0], 2);
        }
      }

      var r = {
        0x01: function _(p) {
          return ['mov     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x02: function _(p) {
          return ['mov     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x03: function _(p) {
          return ['mov     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x04: function _(p) {
          return ['mov     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x05: function _(p) {
          return ['movb    ' + reg(p[0]) + ', [' + reg(p[1]) + ']', 3];
        },
        0x06: function _(p) {
          return ['movb    ' + reg(p[0]) + ', [' + v32(p.slice(1, 5)) + ']', 6];
        },
        0x07: function _(p) {
          return ['movw    ' + reg(p[0]) + ', [' + reg(p[1]) + ']', 3];
        },
        0x08: function _(p) {
          return ['movw    ' + reg(p[0]) + ', [' + v32(p.slice(1, 5)) + ']', 6];
        },
        0x09: function _(p) {
          return ['movd    ' + reg(p[0]) + ', [' + reg(p[1]) + ']', 3];
        },
        0x0A: function _(p) {
          return ['movd    ' + reg(p[0]) + ', [' + v32(p.slice(1, 5)) + ']', 6];
        },

        0x0B: function _(p) {
          return ['movb    [' + reg(p[0]) + '], ' + reg(p[1]), 3];
        },
        0x0C: function _(p) {
          return ['movb    [' + reg(p[0]) + '], ' + v8(p[1]), 3];
        },
        0x0D: function _(p) {
          return ['movb    [' + reg(p[0]) + '], [' + reg(p[1]) + ']', 3];
        },
        0x0E: function _(p) {
          return ['movb    [' + reg(p[0]) + '], [' + v32(p.slice(1, 5)) + ']', 6];
        },
        0x0F: function _(p) {
          return ['movw    [' + reg(p[0]) + '], ' + reg(p[1]), 3];
        },
        0x1A: function _(p) {
          return ['movw    [' + reg(p[0]) + '], ' + v16(p.slice(1, 3)), 4];
        },
        0x1B: function _(p) {
          return ['movw    [' + reg(p[0]) + '], [' + reg(p[1]) + ']', 3];
        },
        0x1C: function _(p) {
          return ['movw    [' + reg(p[0]) + '], [' + v32(p.slice(1, 5)) + ']', 6];
        },
        0x1D: function _(p) {
          return ['movd    [' + reg(p[0]) + '], ' + reg(p[1]), 3];
        },
        0x1E: function _(p) {
          return ['movd    [' + reg(p[0]) + '], ' + v32(p.slice(1, 5)), 6];
        },
        0x1F: function _(p) {
          return ['movd    [' + reg(p[0]) + '], [' + reg(p[1]) + ']', 3];
        },
        0x20: function _(p) {
          return ['movd    [' + reg(p[0]) + '], [' + v32(p.slice(1, 5)) + ']', 6];
        },

        0x21: function _(p) {
          return ['movb    [' + v32(p.slice(0, 4)) + '], ' + reg(p[4]), 6];
        },
        0x22: function _(p) {
          return ['movb    [' + v32(p.slice(0, 4)) + '], ' + v8(p[4]), 6];
        },
        0x23: function _(p) {
          return ['movb    [' + v32(p.slice(0, 4)) + '], [' + reg(p[4]) + ']', 6];
        },
        0x24: function _(p) {
          return ['movb    [' + v32(p.slice(0, 4)) + '], [' + v32(p.slice(4, 8)) + ']', 9];
        },
        0x25: function _(p) {
          return ['movw    [' + v32(p.slice(0, 4)) + '], ' + reg(p[4]), 6];
        },
        0x26: function _(p) {
          return ['movw    [' + v32(p.slice(0, 4)) + '], ' + v16(p.slice(4, 6)), 7];
        },
        0x27: function _(p) {
          return ['movw    [' + v32(p.slice(0, 4)) + '], [' + reg(p[4]) + ']', 6];
        },
        0x28: function _(p) {
          return ['movw    [' + v32(p.slice(0, 4)) + '], [' + v32(p.slice(4, 8)) + ']', 9];
        },
        0x29: function _(p) {
          return ['movd    [' + v32(p.slice(0, 4)) + '], ' + reg(p[4]), 6];
        },
        0x2A: function _(p) {
          return ['movd    [' + v32(p.slice(0, 4)) + '], ' + v32(p.slice(4, 8)), 9];
        },
        0x2B: function _(p) {
          return ['movd    [' + v32(p.slice(0, 4)) + '], [' + reg(p[4]) + ']', 6];
        },
        0x2C: function _(p) {
          return ['movd    [' + v32(p.slice(0, 4)) + '], [' + v32(p.slice(4, 8)) + ']', 9];
        },

        0x2D: function _(p) {
          return ['or      ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x2E: function _(p) {
          return ['or      ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x2F: function _(p) {
          return ['or      ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x30: function _(p) {
          return ['or      ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x31: function _(p) {
          return ['xor     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x32: function _(p) {
          return ['xor     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x33: function _(p) {
          return ['xor     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x34: function _(p) {
          return ['xor     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x35: function _(p) {
          return ['and     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x36: function _(p) {
          return ['and     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x37: function _(p) {
          return ['and     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x38: function _(p) {
          return ['and     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x39: function _(p) {
          return ['shl     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x3A: function _(p) {
          return ['shl     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x3B: function _(p) {
          return ['shr     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x3C: function _(p) {
          return ['shr     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x3D: function _(p) {
          return ['not     ' + reg(p[0]), 2];
        },

        0x42: function _(p) {
          return ['add     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x43: function _(p) {
          return ['add     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x44: function _(p) {
          return ['add     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x45: function _(p) {
          return ['add     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x46: function _(p) {
          return ['sub     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x47: function _(p) {
          return ['sub     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x48: function _(p) {
          return ['sub     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x49: function _(p) {
          return ['sub     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x4A: function _(p) {
          return ['cmp     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x4B: function _(p) {
          return ['cmp     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x4C: function _(p) {
          return ['cmp     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x4D: function _(p) {
          return ['cmp     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x4E: function _(p) {
          return ['mul     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x4F: function _(p) {
          return ['mul     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x50: function _(p) {
          return ['mul     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x51: function _(p) {
          return ['mul     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x52: function _(p) {
          return ['idiv    ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x53: function _(p) {
          return ['idiv    ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x54: function _(p) {
          return ['idiv    ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x55: function _(p) {
          return ['idiv    ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x56: function _(p) {
          return ['mod     ' + reg(p[0]) + ', ' + reg(p[1]), 3];
        },
        0x57: function _(p) {
          return ['mod     ' + reg(p[0]) + ', ' + v8(p[1]), 3];
        },
        0x58: function _(p) {
          return ['mod     ' + reg(p[0]) + ', ' + v16(p.slice(1, 3)), 4];
        },
        0x59: function _(p) {
          return ['mod     ' + reg(p[0]) + ', ' + v32(p.slice(1, 5)), 6];
        },
        0x5A: function _(p) {
          return ['inc     ' + reg(p[0]), 2];
        },
        0x5B: function _(p) {
          return ['dec     ' + reg(p[0]), 2];
        },

        0x5C: function _(p) {
          return ['bz      ' + reg(p[0]), 2];
        },
        0x5D: function _(p) {
          return ['bz      ' + v32(p.slice(0, 4)), 5];
        },
        0x5E: function _(p) {
          return ['bnz     ' + reg(p[0]), 2];
        },
        0x5F: function _(p) {
          return ['bnz     ' + v32(p.slice(0, 4)), 5];
        },
        0x60: function _(p) {
          return ['bneg    ' + reg(p[0]), 2];
        },
        0x61: function _(p) {
          return ['bneg    ' + v32(p.slice(0, 4)), 5];
        },
        0x62: function _(p) {
          return ['bpos    ' + reg(p[0]), 2];
        },
        0x63: function _(p) {
          return ['bpos    ' + v32(p.slice(0, 4)), 5];
        },
        0x64: function _(p) {
          return ['bgt     ' + reg(p[0]), 2];
        },
        0x65: function _(p) {
          return ['bgt     ' + v32(p.slice(0, 4)), 5];
        },
        0x66: function _(p) {
          return ['bgte    ' + reg(p[0]), 2];
        },
        0x67: function _(p) {
          return ['bgte    ' + v32(p.slice(0, 4)), 5];
        },
        0x68: function _(p) {
          return ['blt     ' + reg(p[0]), 2];
        },
        0x69: function _(p) {
          return ['blt     ' + v32(p.slice(0, 4)), 5];
        },
        0x6A: function _(p) {
          return ['blte    ' + reg(p[0]), 2];
        },
        0x6B: function _(p) {
          return ['blte    ' + v32(p.slice(0, 4)), 5];
        },
        0x6C: function _(p) {
          return ['bv      ' + reg(p[0]), 2];
        },
        0x6D: function _(p) {
          return ['bv      ' + v32(p.slice(0, 4)), 5];
        },
        0x6E: function _(p) {
          return ['bnv     ' + reg(p[0]), 2];
        },
        0x6F: function _(p) {
          return ['bnv     ' + v32(p.slice(0, 4)), 5];
        },
        0x70: function _(p) {
          return ['jmp     ' + reg(p[0]), 2];
        },
        0x71: function _(p) {
          return ['jmp     ' + v32(p.slice(0, 4)), 5];
        },
        0x72: function _(p) {
          return ['jsr     ' + reg(p[0]), 2];
        },
        0x73: function _(p) {
          return ['jsr     ' + v32(p.slice(0, 4)), 5];
        },
        0x74: function _(p) {
          return ['ret', 1];
        },
        0x75: function _(p) {
          return ['sys     ' + reg(p[0]), 2];
        },
        0x76: function _(p) {
          return ['sys     ' + v8(p[0]), 2];
        },
        0x77: function _(p) {
          return ['iret', 1];
        },
        0x86: function _(p) {
          return ['sret', 1];
        },

        0x78: function _(p) {
          return ['pushb   ' + reg(p[0]), 2];
        },
        0x79: function _(p) {
          return ['pushb   ' + v8(p[0]), 2];
        },
        0x7A: function _(p) {
          return ['pushw   ' + reg(p[0]), 2];
        },
        0x7B: function _(p) {
          return ['pushw   ' + v16(p.slice(0, 2)), 3];
        },
        0x7C: function _(p) {
          return ['pushd   ' + reg(p[0]), 2];
        },
        0x7D: function _(p) {
          return ['pushd   ' + v32(p.slice(0, 4)), 5];
        },
        0x7E: function _(p) {
          return ['push.a', 1];
        },
        0x7F: function _(p) {
          return ['popb    ' + reg(p[0]), 2];
        },
        0x80: function _(p) {
          return ['popw    ' + reg(p[0]), 2];
        },
        0x81: function _(p) {
          return ['popd    ' + reg(p[0]), 2];
        },
        0x82: function _(p) {
          return ['pop.a', 1];
        },
        0x83: function _(p) {
          return ['popx    ' + reg(p[0]), 2];
        },
        0x84: function _(p) {
          return ['popx    ' + v8(p[0]), 2];
        },
        0x85: function _(p) {
          return ['popx    ' + v16(p.slice(0, 2)), 3];
        },

        0x87: function _(p) {
          return ['nop', 1];
        }
      };

      var op = this._vm.mb.get(addr);
      var p = this._vm.mb.getArray(addr + 1, 8);

      if (op in r) {
        return r[op](p);
      } else {
        return ['data    ' + v8(op), 1];
      }
    }
  }], [{
    key: 'encode',
    value: function (_encode) {
      function encode(_x) {
        return _encode.apply(this, arguments);
      }

      encode.toString = function () {
        return _encode.toString();
      };

      return encode;
    }(function (s) {
      return encode(s);
    })
  }]);
  return Debugger;
}();

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/slicedToArray":18,"babel-runtime/helpers/toArray":19}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

exports.default = encode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function encode(line) {
  var acceptLabel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var labelPrefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];


  // separate operand and parameters

  var _line$split = line.split(/[\s\t]+/);

  var _line$split2 = (0, _toArray3.default)(_line$split);

  var operand = _line$split2[0];

  var rest = _line$split2.slice(1);

  rest = rest.join('');

  // find parameters
  var parameters = rest.split(/[\s\t]*,[\s\t]*/).filter(function (s) {
    return s !== '';
  });
  if (parameters.length > 2) {
    throw new Error('Invalid number of parameters.');
  }

  var pars = parameters.map(function (p) {
    return parseParameter(p, acceptLabel, labelPrefix);
  });
  return parseOpcode(operand, pars, line);
}

//
// OPCODES
//
var opcodes = [
// movement
[0x01, 'mov', 'reg', 'reg'], [0x02, 'mov', 'reg', 'v8'], [0x03, 'mov', 'reg', 'v16'], [0x04, 'mov', 'reg', 'v32'], [0x05, 'movb', 'reg', 'indreg'], [0x06, 'movb', 'reg', 'indv32'], [0x07, 'movw', 'reg', 'indreg'], [0x08, 'movw', 'reg', 'indv32'], [0x09, 'movd', 'reg', 'indreg'], [0x0A, 'movd', 'reg', 'indv32'], [0x0B, 'movb', 'indreg', 'reg'], [0x0C, 'movb', 'indreg', 'v8'], [0x0D, 'movb', 'indreg', 'indreg'], [0x0E, 'movb', 'indreg', 'indv32'], [0x0F, 'movw', 'indreg', 'reg'], [0x1A, 'movw', 'indreg', 'v16'], [0x1B, 'movw', 'indreg', 'indreg'], [0x1C, 'movw', 'indreg', 'indv32'], [0x1D, 'movd', 'indreg', 'reg'], [0x1E, 'movd', 'indreg', 'v32'], [0x1F, 'movd', 'indreg', 'indreg'], [0x20, 'movd', 'indreg', 'indv32'], [0x21, 'movb', 'indv32', 'reg'], [0x22, 'movb', 'indv32', 'v8'], [0x23, 'movb', 'indv32', 'indreg'], [0x24, 'movb', 'indv32', 'indv32'], [0x25, 'movw', 'indv32', 'reg'], [0x26, 'movw', 'indv32', 'v16'], [0x27, 'movw', 'indv32', 'indreg'], [0x28, 'movw', 'indv32', 'indv32'], [0x29, 'movd', 'indv32', 'reg'], [0x2A, 'movd', 'indv32', 'v32'], [0x2B, 'movd', 'indv32', 'indreg'], [0x2C, 'movd', 'indv32', 'indv32'],

// logic
[0x2D, 'or', 'reg', 'reg'], [0x2E, 'or', 'reg', 'v8'], [0x2F, 'or', 'reg', 'v16'], [0x30, 'or', 'reg', 'v32'], [0x31, 'xor', 'reg', 'reg'], [0x32, 'xor', 'reg', 'v8'], [0x33, 'xor', 'reg', 'v16'], [0x34, 'xor', 'reg', 'v32'], [0x35, 'and', 'reg', 'reg'], [0x36, 'and', 'reg', 'v8'], [0x37, 'and', 'reg', 'v16'], [0x38, 'and', 'reg', 'v32'], [0x39, 'shl', 'reg', 'reg'], [0x3A, 'shl', 'reg', 'v8'], [0x3D, 'shr', 'reg', 'reg'], [0x3E, 'shr', 'reg', 'v8'], [0x41, 'not', 'reg'],

// arithmetic
[0x42, 'add', 'reg', 'reg'], [0x43, 'add', 'reg', 'v8'], [0x44, 'add', 'reg', 'v16'], [0x45, 'add', 'reg', 'v32'], [0x46, 'sub', 'reg', 'reg'], [0x47, 'sub', 'reg', 'v8'], [0x48, 'sub', 'reg', 'v16'], [0x49, 'sub', 'reg', 'v32'], [0x4A, 'cmp', 'reg', 'reg'], [0x4B, 'cmp', 'reg', 'v8'], [0x4C, 'cmp', 'reg', 'v16'], [0x4D, 'cmp', 'reg', 'v32'], [0x4E, 'mul', 'reg', 'reg'], [0x4F, 'mul', 'reg', 'v8'], [0x50, 'mul', 'reg', 'v16'], [0x51, 'mul', 'reg', 'v32'], [0x52, 'idiv', 'reg', 'reg'], [0x53, 'idiv', 'reg', 'v8'], [0x54, 'idiv', 'reg', 'v16'], [0x55, 'idiv', 'reg', 'v32'], [0x56, 'mod', 'reg', 'reg'], [0x57, 'mod', 'reg', 'v8'], [0x58, 'mod', 'reg', 'v16'], [0x59, 'mod', 'reg', 'v32'], [0x5A, 'inc', 'reg'], [0x5B, 'dec', 'reg'],

// jumps
[0x5C, 'bz', 'reg'], [0x5D, 'bz', 'v32'], [0x5C, 'beq', 'reg'], [0x5D, 'beq', 'v32'], [0x5E, 'bnz', 'reg'], [0x5F, 'bnz', 'v32'], [0x60, 'bneg', 'reg'], [0x61, 'bneg', 'v32'], [0x62, 'bpos', 'reg'], [0x63, 'bpos', 'v32'], [0x64, 'bgt', 'reg'], [0x65, 'bgt', 'v32'], [0x66, 'bgte', 'reg'], [0x67, 'bgte', 'v32'], [0x68, 'blt', 'reg'], [0x69, 'blt', 'v32'], [0x6A, 'blte', 'reg'], [0x6B, 'blte', 'v32'], [0x6C, 'bv', 'reg'], [0x6D, 'bv', 'v32'], [0x6E, 'bnv', 'reg'], [0x6F, 'bnv', 'v32'], [0x70, 'jmp', 'reg'], [0x71, 'jmp', 'v32'], [0x72, 'jsr', 'reg'], [0x73, 'jsr', 'v32'], [0x74, 'ret'], [0x75, 'sys', 'reg'], [0x76, 'sys', 'v8'], [0x77, 'iret'], [0x86, 'sret'],

// stack
[0x78, 'pushb', 'reg'], [0x79, 'pushb', 'v8'], [0x7A, 'pushw', 'reg'], [0x7B, 'pushw', 'v16'], [0x7C, 'pushd', 'reg'], [0x7D, 'pushd', 'v32'], [0x7E, 'push.a'], [0x7F, 'popb', 'reg'], [0x80, 'popw', 'reg'], [0x81, 'popd', 'reg'], [0x82, 'pop.a'], [0x83, 'popx', 'reg'], [0x84, 'popx', 'v8'], [0x85, 'popx', 'v9'],

// other
[0x87, 'nop']];

function parseOpcode(operand, pars, line) {
  // find opcode
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(opcodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var op = _step.value;

      var ptype = pars.map(function (p) {
        return p ? p.type : undefined;
      });
      if (operand.toLowerCase() === op[1] && ptype[0] === op[2] && ptype[1] === op[3]) {
        var a = [op[0]];
        if (pars[0]) a = a.concat(pars[0].array);
        if (pars[1]) a = a.concat(pars[1].array);
        return a;
      }
    }

    // if opcode wasn't found, and par is < v32, try to find higher value
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var increasePar = function increasePar(p) {
    return p.type === 'v16' ? { type: 'v32', array: p.array.concat([0, 0]) } : { type: 'v16', array: p.array.concat([0]) };
  };
  var canIncrease = function canIncrease(p) {
    return p && (p.type === 'v8' || p.type === 'v16');
  };

  if (canIncrease(pars[0])) {
    try {
      return parseOpcode(operand, [increasePar(pars[0]), pars[1]]);
    } catch (e) {}
  } else if (canIncrease(pars[1])) {
    try {
      return parseOpcode(operand, [pars[0], increasePar(pars[1])]);
    } catch (e) {}
  }
  if (canIncrease(pars[0]) && canIncrease(pars[1])) {
    try {
      return parseOpcode(operand, [increasePar(pars[0]), increasePar(pars[1])]);
    } catch (e) {}
  }

  throw new Error('Invalid command ' + line + '.');
}

//
// PARSE PARAMETERS
//
function parseParameter(p, acceptLabel, labelPrefix) {

  function registerValue(r) {
    switch (r) {
      case 'a':
        return 0;
      case 'b':
        return 1;
      case 'c':
        return 2;
      case 'd':
        return 3;
      case 'e':
        return 4;
      case 'f':
        return 5;
      case 'g':
        return 6;
      case 'h':
        return 7;
      case 'i':
        return 8;
      case 'j':
        return 9;
      case 'k':
        return 10;
      case 'l':
        return 11;
      case 'fp':
        return 12;
      case 'sp':
        return 13;
      case 'pc':
        return 14;
      case 'fl':
        return 15;
      default:
        return -1;
    }
  }

  var _ref = [0, 'none', []];
  var type = _ref[0];
  var array = _ref[1];

  // if indirect, add indirection and return

  if (p.startsWith('[') && p.endsWith(']')) {
    var pp = parseParameter(p.slice(1, p.length - 1), acceptLabel, labelPrefix);
    if (pp.type === 'v8') {
      pp.array = pp.array.concat([0, 0, 0]);
      pp.type = 'v32';
    } else if (pp.type === 'v16') {
      pp.array = pp.array.concat([0, 0]);
      pp.type = 'v32';
    }
    pp.type = 'ind' + pp.type;
    return pp;
  }

  // if binary, convert to number
  if (/0b[01_]+/.test(p)) {
    p = parseInt(p.slice(2).replace('_', ''), 2).toString();
  }

  // is it a number?
  if (/^-?\d+$/.test(p) || /^0[Xx][\dA-Fa-f]+$/.test(p)) {
    var value = parseInt(p);
    if (value < 0) {
      value = value >>> 0;
    }
    if (value <= 0xFF) {
      type = 'v8';
      array = [value];
    } else if (value <= 0xFFFF) {
      type = 'v16';
      array = [value & 0xFF, value >> 8];
    } else if (value <= 0xFFFFFFFF) {
      type = 'v32';
      array = [value & 0xFF, value >> 8 & 0xFF, value >> 16 & 0xFF, value >> 24 & 0xFF];
    } else {
      throw new Error('Values higher than 32-bit are unsupported.');
    }

    // is a register or label
  } else {
      var value = registerValue(p.toLowerCase());

      // is a register
      if (value >= 0) {
        type = 'reg';
        array = [value];

        // is a label
      } else if (acceptLabel) {
          type = 'v32';
          array = [p.startsWith('.') ? labelPrefix + p : p, 0, 0, 0];

          // its niether
        } else {
            throw new Error('Could not understand expression \'' + p + '\'.');
          }
    }

  return { type: type, array: array };
}

// vim: ts=2:sw=2:sts=2:expandtab

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/helpers/toArray":19}],148:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"dup":84}],149:[function(require,module,exports){
;(function (exports) {
  'use strict'

  var i
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var lookup = []
  for (i = 0; i < code.length; i++) {
    lookup[i] = code[i]
  }
  var revLookup = []

  for (i = 0; i < code.length; ++i) {
    revLookup[code.charCodeAt(i)] = i
  }
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  function decode (elt) {
    var v = revLookup[elt.charCodeAt(0)]
    return v !== undefined ? v : -1
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function encode (num) {
    return lookup[num]
  }

  function tripletToBase64 (num) {
    return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
  }

  function encodeChunk (uint8, start, end) {
    var temp
    var output = []
    for (var i = start; i < end; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output.push(tripletToBase64(temp))
    }
    return output.join('')
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var parts = []
    var temp, length
    var maxChunkLength = 16383 // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later

    for (i = 0, length = uint8.length - extraBytes; i < length; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > length ? length : (i + maxChunkLength)))
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    parts.push(output)

    return parts.join('')
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],150:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"dup":84}],151:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":149,"ieee754":155,"isarray":152}],152:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],153:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":157}],154:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],155:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],156:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102}],157:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],158:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],159:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":161}],160:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn) {
  var args = new Array(arguments.length - 1);
  var i = 0;
  while (i < args.length) {
    args[i++] = arguments[i];
  }
  process.nextTick(function afterTick() {
    fn.apply(null, args);
  });
}

}).call(this,require('_process'))
},{"_process":161}],161:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],162:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":163}],163:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/



/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

},{"./_stream_readable":165,"./_stream_writable":167,"core-util-is":153,"inherits":156,"process-nextick-args":160}],164:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":166,"core-util-is":153,"inherits":156}],165:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/


/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events');

/*<replacement>*/
var EElistenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/



/*<replacement>*/
var Stream;
(function (){try{
  Stream = require('st' + 'ream');
}catch(_){}finally{
  if (!Stream)
    Stream = require('events').EventEmitter;
}}())
/*</replacement>*/

var Buffer = require('buffer').Buffer;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/



/*<replacement>*/
var debugUtil = require('util');
var debug;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var StringDecoder;

util.inherits(Readable, Stream);

var Duplex;
function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

var Duplex;
function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function')
    this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function() {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}


// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (n === null || isNaN(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else {
      return state.length;
    }
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (ret !== null)
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!(Buffer.isBuffer(chunk)) &&
      typeof chunk !== 'string' &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      processNextTick(emitReadable_, stream);
    else
      emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    processNextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      if (state.pipesCount === 1 &&
          state.pipes[0] === dest &&
          src.listenerCount('data') === 1 &&
          !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];


  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined))
      return;
    else if (!state.objectMode && (!chunk || !chunk.length))
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }; }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};


// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else if (list.length === 1)
      ret = list[0];
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
},{"./_stream_duplex":163,"_process":161,"buffer":151,"core-util-is":153,"events":154,"inherits":156,"isarray":158,"process-nextick-args":160,"string_decoder/":173,"util":150}],166:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function')
      this._transform = options.transform;

    if (typeof options.flush === 'function')
      this._flush = options.flush;
  }

  this.once('prefinish', function() {
    if (typeof this._flush === 'function')
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":163,"core-util-is":153,"inherits":156}],167:[function(require,module,exports){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/


/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/



/*<replacement>*/
var Stream;
(function (){try{
  Stream = require('st' + 'ream');
}catch(_){}finally{
  if (!Stream)
    Stream = require('events').EventEmitter;
}}())
/*</replacement>*/

var Buffer = require('buffer').Buffer;

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

var Duplex;
function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function (){try {
Object.defineProperty(WritableState.prototype, 'buffer', {
  get: internalUtil.deprecate(function() {
    return this.getBuffer();
  }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' +
     'instead.')
});
}catch(_){}}());


var Duplex;
function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function')
      this._write = options.write;

    if (typeof options.writev === 'function')
      this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;

  if (!(Buffer.isBuffer(chunk)) &&
      typeof chunk !== 'string' &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = nop;

  if (state.ended)
    writeAfterEnd(this, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.bufferedRequest)
      clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string')
    encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64',
'ucs2', 'ucs-2','utf16le', 'utf-16le', 'raw']
.indexOf((encoding + '').toLowerCase()) > -1))
    throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync)
    processNextTick(cb, er);
  else
    cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      processNextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var buffer = [];
    var cbs = [];
    while (entry) {
      cbs.push(entry.callback);
      buffer.push(entry);
      entry = entry.next;
    }

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    state.lastBufferedRequest = null;
    doWrite(stream, state, true, state.length, buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null)
      state.lastBufferedRequest = null;
  }
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined)
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(state) {
  return (state.ending &&
          state.length === 0 &&
          state.bufferedRequest === null &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      processNextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./_stream_duplex":163,"buffer":151,"core-util-is":153,"events":154,"inherits":156,"process-nextick-args":160,"util-deprecate":174}],168:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":164}],169:[function(require,module,exports){
var Stream = (function (){
  try {
    return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":163,"./lib/_stream_passthrough.js":164,"./lib/_stream_readable.js":165,"./lib/_stream_transform.js":166,"./lib/_stream_writable.js":167}],170:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":166}],171:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":167}],172:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":154,"inherits":156,"readable-stream/duplex.js":162,"readable-stream/passthrough.js":168,"readable-stream/readable.js":169,"readable-stream/transform.js":170,"readable-stream/writable.js":171}],173:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":151}],174:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[130,131,132,133,134,135,136,137,138,139,140,141,142,143,144]);
