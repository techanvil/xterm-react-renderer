"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Cursor = _interopRequireDefault(require("./Cursor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/**
 * Text uses the `write` method available through XTerm to
 * write text to the terminal
 */
var Text = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Text, _BaseComponent);

  var _super = _createSuper(Text);

  function Text(root, props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this, root, props);
    _this.text = props.children;
    return _this;
  }

  _createClass(Text, [{
    key: "goToPosition",
    value: function goToPosition() {
      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position[0];
      var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position[1];
      this.terminal.write("\x1B[".concat(row, ";").concat(col, "H"));
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(text) {
      // erase old text
      this.goToPosition(this.position[0], this.position[1] + this.text.length);
      this.terminal.write('\b \b'.repeat(this.text.length)); // write new text

      this.terminal.write("".concat(text));
      this.text = text;
    }
  }, {
    key: "appendChild",
    value: function appendChild(text) {
      this.text = text; // set this.position based off root's current position

      this.position = [this.root.position[0], this.root.position[1]]; // adjust sibling positions if this text is in the place of current children

      this.updateSiblingPositions(this.text.length); // go to this.position

      this.goToPosition(); // write the text to the terminal

      this.terminal.write("".concat(text)); // update root's position to account for the text length

      this.root.position = [this.position[0], this.position[1] + this.text.length];
    }
  }, {
    key: "updateSiblingPositions",
    value: function updateSiblingPositions(delta) {
      var _this2 = this;

      var children = this.root.children;
      var collidingChildren = children.filter(function (child) {
        return child.position[0] === _this2.position[0] && child.position[1] >= _this2.position[1] && child !== _this2;
      }); // sort the array so that children are not overwritten
      // by the deletion of future iterations
      // that is required when we call updatePosition.

      collidingChildren.sort(function (childA, childB) {
        if (delta > 0) {
          return childB.position[1] - childA.position[1];
        } else {
          return childA.position[1] - childB.position[1];
        }
      });

      var _iterator = _createForOfIteratorHelper(collidingChildren),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          console.log('updating child', child, child.position, this.position, this.text, delta);
          child.updatePosition(0, delta);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(deltaRow, deltaCol) {
      // go to 'old' position
      this.goToPosition(this.position[0], this.position[1] + this.text.length); // remove current text

      this.terminal.write('\b \b'.repeat(this.text.length)); // update position and go to it

      this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];
      this.goToPosition(); // write text back

      this.terminal.write("".concat(this.text));
    }
  }, {
    key: "removeSelf",
    value: function removeSelf() {
      this.goToPosition(this.position[0], this.position[1] + this.text.length);
      this.terminal.write('\b \b'.repeat(this.text.length)); // adjust sibling positions if this text is in the place of current children

      this.updateSiblingPositions(-this.text.length); // update root's position to account for the text length

      this.root.position = [this.position[0], this.position[1]];
    }
  }]);

  return Text;
}(_BaseComponent2["default"]);

var _default = Text;
exports["default"] = _default;