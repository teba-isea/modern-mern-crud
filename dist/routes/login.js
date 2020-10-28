"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _loginController = require("../controllers/loginController");

var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));

var route = (0, _express.Router)();
route.post('/', [(0, _expressValidator.check)('email', 'email is invalid').isEmail(), (0, _expressValidator.check)('password', 'password length must be greater than 8 ').not().isEmpty()], _loginController.authenticateUser);
route.get('/', [(0, _expressValidator.header)('x-auth-token', 'You need sign in first').not().isEmpty()], _authenticate["default"], _loginController.sendUser);
var _default = route;
exports["default"] = _default;