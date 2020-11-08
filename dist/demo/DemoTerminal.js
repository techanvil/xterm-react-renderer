"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("../renderer");

require("../renderer/styles/index.css");

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

var DemoTerminal = /*#__PURE__*/function (_Component) {
  _inherits(DemoTerminal, _Component);

  var _super = _createSuper(DemoTerminal);

  function DemoTerminal() {
    var _this;

    _classCallCheck(this, DemoTerminal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: 'start typing something!',
      isActive: false,
      shouldClear: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (key) {
      _this.setState(function (prevState) {
        return {
          text: prevState.text + key
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnter", function () {
      _this.setState(function (prevState) {
        return {
          text: prevState.text + '\n'
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackspace", function () {
      _this.setState(function (prevState) {
        return {
          text: prevState.text.substring(0, prevState.text.length - 1)
        };
      });
    });

    return _this;
  }

  _createClass(DemoTerminal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          isActive: true
        });
      }, 1000);
      setTimeout(function () {
        _this2.setState({
          shouldClear: true
        });
      }, 2000);
    }
  }, {
    key: "render",
    value: function render() {
      var lines = this.state.text.split('\n');
      console.log(lines);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "terminal-container"
      }, /*#__PURE__*/_react["default"].createElement(_renderer.Terminal, {
        onEnter: this.handleEnter,
        onKeyDown: this.handleKeyDown,
        onBackspace: this.handleBackspace
      }, !this.state.shouldClear && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("line", null, "hi"), this.state.isActive ? /*#__PURE__*/_react["default"].createElement("text", null, "ACTIVE") : null, /*#__PURE__*/_react["default"].createElement("text", null, "hi again")), lines.map(function (line, index) {
        return index + 1 >= lines.length ? /*#__PURE__*/_react["default"].createElement("text", {
          key: "".concat(line, "-").concat(index)
        }, line) : /*#__PURE__*/_react["default"].createElement("line", {
          key: "".concat(line, "-").concat(index)
        }, line);
      }), /*#__PURE__*/_react["default"].createElement("cursor", null), !this.state.shouldClear && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("text", null, "i'm at the end!")));
    }
  }]);

  return DemoTerminal;
}(_react.Component);

var _default = DemoTerminal;
exports["default"] = _default;