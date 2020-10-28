"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _bcryptjs.genSalt)(5);

          case 2:
            salt = _context.sent;
            return _context.abrupt("return", (0, _bcryptjs.hash)(password, salt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hashPassword = hashPassword;

var comparePasswords = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, hash) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _bcryptjs.compare)(password, hash);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function comparePasswords(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.comparePasswords = comparePasswords;

var generateToken = function generateToken(user) {
  return (0, _jsonwebtoken.sign)(user, process.env.PRIVATE_KEY, {
    expiresIn: "1d"
  });
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(token) {
  try {
    return (0, _jsonwebtoken.verify)(token, process.env.PRIVATE_KEY);
  } catch (e) {
    return false;
  }
};

exports.verifyToken = verifyToken;