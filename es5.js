(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("prop-types"); } catch(e) {} }()), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory((function webpackLoadOptionalExternalModule() { try { return require("prop-types"); } catch(e) {} }()), require("react")) : factory(root["prop-types"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isObject = function isObject(object) {
    return object instanceof Object;
};
var isFunction = function isFunction(object) {
    return object instanceof Function;
};
var isArray = function isArray(object) {
    return Array.isArray(object);
};
var range = function range(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(i);
    }return result;
};

var originSymbol = '__symbol_icopier_origin';
var setOrigin = function setOrigin(object, name, value) {
    if (isObject(object)) {

        if (!object[originSymbol]) {
            Object.defineProperty(object, originSymbol, {
                value: {},
                configurable: false,
                enumerable: false
            });
        }

        object[originSymbol][name] = value;
    }
};

var getOrigin = function getOrigin(object, name) {
    if (isObject(object)) {
        if (object[originSymbol]) {
            return object[originSymbol][name];
        } else {
            return object[name];
        }
    }
};

var _copy = function _copy(object, depth) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (depth !== null && level > depth) {
        return object;
    }

    if (isFunction(object)) {
        return object;
    }

    if (!isObject(object)) {
        return object;
    }

    var names = [];
    var result = null;

    if (isArray(object)) {
        names = range(object.length);
        result = [];
    } else {
        names = Object.getOwnPropertyNames(object).filter(function (name) {
            return name !== originSymbol;
        });
        var Clone = function Clone() {};

        Clone.prototype = isFunction(Object.getPrototypeOf) ? Object.getPrototypeOf(object) : object;
        result = new Clone();
    }

    for (var i = 0; i < names.length; i++) {
        var name = names[i];

        if (isObject(object[name])) {
            if (options.strict) {
                setOrigin(result, name, object[name]);
            }

            result[name] = _copy(object[name], depth, options, level + 1);
        } else {
            result[name] = object[name];
        }
    }

    return result;
};

var copy = function copy(object) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return _copy(object, depth, Object.assign({ strict: true }, options));
};

var _isSame = function _isSame(object1, object2) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    if (depth !== null && level > depth) {
        return true;
    }

    var names = [];

    if (isArray(object1) && isArray(object2)) {
        if (object1.length !== object2.length) {
            return false;
        }

        names = range(object1.length);
    } else if (isObject(object1) && isObject(object2)) {
        names = [].concat(_toConsumableArray(Object.getOwnPropertyNames(object1)), _toConsumableArray(Object.getOwnPropertyNames(object2))).filter(function (name) {
            return name !== originSymbol;
        });

        names = [].concat(_toConsumableArray(new Set(names)));
    } else if (isFunction(object1) && isFunction(object2)) {
        if (options.strictFunction) {
            return object1 === object2;
        } else {
            return true;
        }
    } else {
        return object1 === object2;
    }

    for (var idx = 0; idx < names.length; idx++) {
        var name = names[idx];

        if (object1[name] !== object2[name]) {
            if (isObject(object1[name]) && isObject(object2[name])) {
                if (options.strictOrigin && getOrigin(object1, name) !== getOrigin(object2, name)) {
                    return false;
                }

                if (!_isSame(object1[name], object2[name], depth, options, level + 1)) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    return true;
};

var isSame = function isSame(object1, object2) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    options = Object.assign({
        strictFunction: true,
        strictOrigin: true
    }, options);
    return _isSame(object1, object2, depth, options);
};

module.exports = {
    copy: copy,
    isSame: isSame
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Observer() {
    this.subscribers = [];
}
Observer.prototype = {
    subscribe: function subscribe(subscriber) {
        if (subscriber instanceof Function) {
            this.subscribers.push(subscriber);
        }
        return this;
    },

    unsubscribe: function unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(function (aSubscriber) {
            return aSubscriber !== subscriber;
        });
    },

    notify: function notify() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.subscribers.forEach(function (subscriber) {
            return subscriber(event);
        });
    }
};

var observableSymbol = '__symbol_iobserver';
var isObject = function isObject(object) {
    return object instanceof Object;
};
var isFunction = function isFunction(object) {
    return object instanceof Function;
};

var observable = function observable() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!isObject(object)) {
        throw new Error('Do not support this: ' + object);
    }

    if (object[observableSymbol]) {
        return object;
    } else {
        Object.defineProperty(object, observableSymbol, {
            value: new Observer(),
            enumerable: false,
            configurable: false
        });

        return object;
    }
};

var observableObserver = function observableObserver(observableObject) {
    return observable(observableObject)[observableSymbol];
};
var subscribe = function subscribe(observableObject, subscriber) {
    return observableObserver(observableObject).subscribe(subscriber);
};

var unsubscribe = function unsubscribe(observableObject, subscriber) {
    return observableObserver(observableObject).unsubscribe(subscriber);
};
var notify = function notify(observableObject) {
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return observableObserver(observableObject).notify(event);
};

var update = function update(observableObject) {
    var updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return null;
    };

    var push = function push() {
        return notify(observableObject, observableObject);
    };
    var result = updater(observableObject);

    return Promise.resolve().then(function () {

        if (isObject(result) && isFunction(result.then)) {
            push();

            return Promise.resolve(result).then(function () {
                return result;
            }).then(function (result) {
                push();
                return result;
            }).catch(function (error) {
                push();
                return Promise.reject(error);
            });
        } else {
            push();
            return result;
        }
    });
};

module.exports = {
    Observer: Observer,
    observable: observable,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    notify: notify,
    update: update,
    observableObserver: observableObserver,
    observableSymbol: observableSymbol,
    isObject: isObject,
    isFunction: isFunction
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_2__ === 'undefined') {var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(3);
var observer = __webpack_require__(1);
var copier = __webpack_require__(0);

var copy = copier.copy,
    isSame = copier.isSame;
var Children = React.Children,
    Component = React.Component;
var observable = observer.observable,
    update = observer.update,
    subscribe = observer.subscribe,
    unsubscribe = observer.unsubscribe,
    isFunction = observer.isFunction,
    isObject = observer.isObject;


var PropTypes = null;
try {
  PropTypes = __webpack_require__(2);
} catch (error) {
  // eslint-disable-next-line
  PropTypes = React.PropTypes;
}

var Store = observable;

var PropsReader = function PropsReader(creators) {
  if (!isObject(creators)) {
    throw new Error('Do not support this: ' + creators);
  }

  var names = Object.getOwnPropertyNames(creators);

  var props = names.map(function (name) {
    if (!isFunction(creators[name])) {
      throw new Error(name + ' is not a function');
    } else {
      return {
        name: name,
        creator: creators[name]
      };
    }
  });

  var actions = {};

  return function (store) {
    var instance = {};

    props.forEach(function (_ref) {
      var name = _ref.name,
          creator = _ref.creator;

      var value = null;

      if (actions[name]) {
        value = actions[name];
      } else {
        value = creator(store);

        if (isFunction(value)) {
          var originValue = value;
          value = function value() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return update(store, function () {
              return originValue.apply(creators, args);
            });
          };
          actions[name] = value;
        }
      }

      instance[name] = value;
    });
    return instance;
  };
};

var storeSymbol = '__symbol_ireactivity_store';
var connect = function connect(component) {
  var propsCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  if (isFunction(propsCreators)) {
    return widget(component, propsCreators, options);
  }

  var propsReader = PropsReader(propsCreators);
  var previousState = {};

  options = Object.assign({
    stateless: false,
    store: null,
    depth: 0
  }, options);

  if (options.store) {
    Store(options.store);
  }

  var ConnectedComponent = function (_Component) {
    _inherits(ConnectedComponent, _Component);

    function ConnectedComponent(props, context) {
      _classCallCheck(this, ConnectedComponent);

      var _this = _possibleConstructorReturn(this, (ConnectedComponent.__proto__ || Object.getPrototypeOf(ConnectedComponent)).call(this, props, context));

      _this.store = options.store || Provider.getStoreByContext(context);
      _this.state = _this.getObservableState();

      if (!options.stateless) {
        previousState = copy(_this.state, options.depth);
      }

      _this.mounted = false;

      _this.updateByObservableState = _this.updateByObservableState.bind(_this);
      return _this;
    }

    _createClass(ConnectedComponent, [{
      key: 'getObservableState',
      value: function getObservableState() {
        return Object.assign({}, this.state, propsReader(this.store), this.props);
      }
    }, {
      key: 'updateByObservableState',
      value: function updateByObservableState() {
        if (!this.mounted) {
          return null;
        }

        var state = this.getObservableState();

        if (options.stateless) {
          this.setState(state);
        } else {
          if (!isSame(state, previousState, options.depth)) {
            this.setState(state);
            previousState = copy(state, options.depth);
          }
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.mounted = true;
        subscribe(this.store, this.updateByObservableState);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
        unsubscribe(this.store, this.updateByObservableState);
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(component, this.state);
      }
    }]);

    return ConnectedComponent;
  }(Component);

  ConnectedComponent.contextTypes = _defineProperty({}, storeSymbol, PropTypes.object);

  return ConnectedComponent;
};

var widget = function widget(component) {
  var controllerCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return null;
  };
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var ConnectedWidgetComponent = function (_Component2) {
    _inherits(ConnectedWidgetComponent, _Component2);

    function ConnectedWidgetComponent(props, context) {
      _classCallCheck(this, ConnectedWidgetComponent);

      var _this2 = _possibleConstructorReturn(this, (ConnectedWidgetComponent.__proto__ || Object.getPrototypeOf(ConnectedWidgetComponent)).call(this, props, context));

      _this2.store = options.store || Provider.getStoreByContext(context);

      if (!isFunction(controllerCreator)) {
        throw new Error('ControllerCreator must should be function');
      }

      var controller = controllerCreator(_this2.store);
      var propsCreators = {};

      if (isObject(controller)) {
        var names = [].concat(Object.getOwnPropertyNames(controller), Object.getOwnPropertyNames(Object.getPrototypeOf(controller)));

        names.forEach(function (name) {
          propsCreators[name] = function (store) {
            if (isFunction(controller[name])) {
              return controller[name].bind(controller);
            } else {
              return controller[name];
            }
          };
        });
      }

      _this2.component = connect(component, propsCreators, options);
      return _this2;
    }

    _createClass(ConnectedWidgetComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(this.component, this.props);
      }
    }]);

    return ConnectedWidgetComponent;
  }(Component);

  ConnectedWidgetComponent.contextTypes = _defineProperty({}, storeSymbol, PropTypes.object);

  return ConnectedWidgetComponent;
};

var stateless = function stateless(component) {
  var propsCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = Object.assign({
    stateless: true
  }, options);

  return connect(component, propsCreators, options);
};

var Provider = function (_Component3) {
  _inherits(Provider, _Component3);

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    Store(props.store);
    return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props, context));
  }

  _createClass(Provider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _defineProperty({}, storeSymbol, this.props.store);
    }
  }, {
    key: 'render',
    value: function render() {
      return Children.only(this.props.children);
    }
  }]);

  return Provider;
}(Component);

Provider.getStoreByContext = function (context) {
  return context[storeSymbol] || null;
};

Provider.propTypes = {
  store: PropTypes.object
};

Provider.childContextTypes = _defineProperty({}, storeSymbol, PropTypes.object);

var render = function render(state, component) {
  return React.createElement(stateless(component, {}, {
    store: state
  }));
};

module.exports = {
  Provider: Provider,
  Store: Store,
  update: update,
  up: update,
  connect: connect,
  stateless: stateless,
  render: render,
  observer: observer,
  copier: copier,
  propsReader: PropsReader,
  storeSymbol: storeSymbol,
  widget: widget
};

/***/ })
/******/ ]);
});