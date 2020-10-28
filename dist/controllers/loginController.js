"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendUser = exports.authenticateUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _user = require("../helpers/user");

var _expressValidator = require("express-validator");

var authenticateUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, errors, user, isCorrectPassword, payload, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _User["default"].findOne({
              email: email
            });

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              msg: "user not found"
            }));

          case 10:
            _context.next = 12;
            return (0, _user.comparePasswords)(password, user.password);

          case 12:
            isCorrectPassword = _context.sent;

            if (isCorrectPassword) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: "incorrect password"
            }));

          case 15:
            payload = {
              user: {
                id: user.id
              }
            };
            token = (0, _user.generateToken)(payload);
            res.status(200).json(token);
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 20]]);
  }));

  return function authenticateUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.authenticateUser = authenticateUser;

var sendUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _User["default"].findOne({
              _id: req.user.id
            }).lean();

          case 6:
            user = _context2.sent;
            _context2.next = 9;
            return res.status(200).json(user);

          case 9:
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            res.status(500).json({
              msg: "houston, we have a problem"
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function sendUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendUser = sendUser;