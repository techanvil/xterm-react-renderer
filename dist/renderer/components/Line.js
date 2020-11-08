"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/**
 * Line uses the `writeln` method available through XTerm to
 * write text, followed by a carriage return
 */
var Line = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Line, _BaseComponent);

  var _super = _createSuper(Line);

  function Line(root, props) {
    var _this;

    _classCallCheck(this, Line);

    _this = _super.call(this, root, props);
    _this.text = props.children;
    return _this;
  }

  _createClass(Line, [{
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

      this.position = [this.root.position[0], this.root.position[1]]; // go to this.position

      this.goToPosition(); // write the text to the terminal

      this.terminal.write("".concat(text));
      this.updateSiblingPositions(1); // update root's position to account for the new txt

      this.root.position = [this.position[0] + 1, 1];
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(deltaRow, deltaCol) {
      this.goToPosition(this.position[0], this.position[1] + this.text.length + 1);
      this.terminal.write('\b \b'.repeat(this.text.length + 1));
      this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];
      this.goToPosition(this.position[0], this.position[1]);
      this.terminal.write("".concat(this.text));
    }
  }, {
    key: "updateSiblingPositions",
    value: function updateSiblingPositions(deltaRow) {
      var _this2 = this;

      // find all children 'below' this line
      var childrenToUpdate = this.root.children.filter(function (child) {
        return child !== _this2 && child.position[0] >= _this2.position[0];
      }); // move them by deltaRow rows

      childrenToUpdate.forEach(function (child) {
        return child.updatePosition(deltaRow, 0);
      });
    }
  }, {
    key: "removeSelf",
    value: function removeSelf() {
      // remove characters
      this.goToPosition(this.position[0], this.text.length + 1);
      this.terminal.write('\b \b'.repeat(this.text.length + 1));
      this.updateSiblingPositions(-1); // update the `root`'s internal position

      this.root.position = [this.root.position[0] - 1, this.root.position[1]];
    }
  }]);

  return Line;
}(_BaseComponent2["default"]);

var _default = Line;
exports["default"] = _default;