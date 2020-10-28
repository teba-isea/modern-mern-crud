"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _user = require("../helpers/user");

var _expressValidator = require("express-validator");

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, _req$body, name, email, password, user, newUser, payload, userToken;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context.prev = 3;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.next = 7;
            return _User["default"].findOne({
              email: email
            });

          case 7:
            user = _context.sent;

            if (!user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'user is already register'
            }));

          case 10:
            newUser = new _User["default"]({
              name: name,
              email: email
            });
            _context.next = 13;
            return (0, _user.hashPassword)(password);

          case 13:
            newUser.password = _context.sent;
            _context.next = 16;
            return newUser.save();

          case 16:
            payload = {
              user: {
                id: newUser.id
              }
            };
            userToken = (0, _user.generateToken)(payload);
            res.status(200).json(userToken);
            _context.next = 21;
            return newUser.save();

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(500).json({
              msg: "houston, we have a problem"
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 23]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;