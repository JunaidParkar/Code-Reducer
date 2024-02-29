"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _script = _interopRequireDefault(require("../data/script"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var captcha = /*#__PURE__*/function () {
  function captcha() {
    var canvasElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, captcha);
    this.secret = key;
    this.canvas = canvasElement;
    this.scripts = new _script["default"]();
    this.ctx = this.canvas.getContext("2d");
    this.color = color;
  }
  _createClass(captcha, [{
    key: "createCaptha",
    value: function createCaptha(captchaToken) {
      var puzzle = this.scripts.generateToken(6);
      this.ctx.font = "30px Arial";
      var padding = 20;
      this.canvas.width = this.ctx.measureText(puzzle).width + padding * 2;
      this.canvas.height = parseInt(this.ctx.font, 10) + padding * 2;
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = this.color;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.canvas.style.margin = 0;
      this.ctx.fillText(puzzle, this.canvas.width / 2, this.canvas.height / 2);
      this.scripts.createToken({
        captcha: puzzle
      }, this.secret).then(function (tk) {
        captchaToken(tk, true);
      })["catch"](function (er) {
        captchaToken(er, false);
      });
    }
  }, {
    key: "verifyCaptcha",
    value: function verifyCaptcha(input, token, result) {
      this.scripts.verifyToken(token, this.secret).then(function (t) {
        var _t = _slicedToArray(t, 2),
          status = _t[0],
          message = _t[1];
        if (status) {
          var data = message.captcha;
          if (data == input) {
            result(true, "Success");
          } else {
            result(false, "Wrong captcha");
          }
        } else {
          result(false, message);
        }
      })["catch"](function (error) {
        console.error("Error verifying captcha:", error);
        result(false, "Error verifying captcha");
      });
    }
  }, {
    key: "revert",
    value: function revert() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }]);
  return captcha;
}();
var _default = exports["default"] = captcha;
