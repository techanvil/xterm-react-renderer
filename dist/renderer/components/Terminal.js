"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _xterm = require("xterm");

var fit = _interopRequireWildcard(require("xterm/lib/addons/fit/fit"));

var _reconciler = _interopRequireDefault(require("../reconciler"));

var _setupTerminal3 = require("../utils/setupTerminal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_xterm.Terminal.applyAddon(fit);

/**
 * The `<Terminal>` React component is used when mixing
 * the XTermRenderer with a React-DOM project - mounting the `<Terminal>`
 * component initialises an instance of XTermRenderer which then controls
 * its children using this renderer
 */
var Terminal = /*#__PURE__*/function (_Component) {
  _inherits(Terminal, _Component);

  var _super = _createSuper(Terminal);

  function Terminal(props) {
    var _this;

    _classCallCheck(this, Terminal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "wrapper", void 0);

    _defineProperty(_assertThisInitialized(_this), "term", void 0);

    _defineProperty(_assertThisInitialized(_this), "root", void 0);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "initialised", false);

    _defineProperty(_assertThisInitialized(_this), "fitTerm", function () {
      if (_this.props.active) {
        _this.term.fit();
      }
    });

    _this.state = {
      data: props.value
    };
    return _this;
  }

  _createClass(Terminal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.wrapper) return;

      if (this.props.active) {
        this.setupTerminal();
        this.setupEvents();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.fitTerm, {
        passive: true
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.active) return;

      if (this.props.active && !this.initialised) {
        this.setupTerminal();
        this.setupEvents();
      }

      _reconciler["default"].updateContainer(this.props.children, this.container, null);
    }
  }, {
    key: "setupTerminal",
    value: function setupTerminal() {
      if (!this.wrapper) return;

      var _setupTerminal2 = (0, _setupTerminal3.setupTerminal)(this.wrapper, {
        theme: this.props.theme,
        fontFamily: this.props.fontFamily
      }),
          container = _setupTerminal2.container,
          terminal = _setupTerminal2.terminal;

      this.container = container;
      this.term = terminal;

      _reconciler["default"].updateContainer(this.props.children, this.container, null);
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this2 = this;

      var term = this.term; // we use term.on('key) to detect backspace and enter presses
      // as we can't do this with React's events (they get overriden by xtermjs)

      term.on('key', function (key) {
        /*const keyCode = key.charCodeAt(0);
         if (keyCode === 127) {
          // delete character
          return this.props.onBackspace();
        }
        if (keyCode === 13) {
          // handle enter
          return this.props.onEnter();
        }
         if (keyCode === 27 || keyCode === 9) {
          // prevent arrow keys or tab character
          return;
        }*/
        _this2.props.onKeyDown(key);
      }); // ensure terminal always fits container

      window.addEventListener('resize', this.fitTerm, {
        passive: true
      });
      setTimeout(this.fitTerm, 0);
      this.initialised = true;

      if (this.props.onInit) {
        this.props.onInit();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "terminal renderer",
        tabIndex: "0",
        style: {
          width: '100%',
          height: '100%'
        },
        ref: function ref(div) {
          return _this3.wrapper = div;
        }
      });
    }
  }]);

  return Terminal;
}(_react.Component);

_defineProperty(Terminal, "defaultProps", {
  active: true,
  value: '',
  fontFamily: 'monospace',
  onKeyDown: function onKeyDown() {},
  onEnter: function onEnter() {}
});

var _default = Terminal;
exports["default"] = _default;