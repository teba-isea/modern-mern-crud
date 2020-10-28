"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = require("../controllers/userController");

var _expressValidator = require("express-validator");

var route = (0, _express.Router)();
route.post('/', [(0, _expressValidator.check)('name', 'name is required').not().isEmpty(), (0, _expressValidator.check)('email', 'email is invalid').isEmail(), (0, _expressValidator.check)('password', 'password length must be greater than 8 ').isLength({
  min: 8
})], _userController.createUser);
var _default = route;
exports["default"] = _default;