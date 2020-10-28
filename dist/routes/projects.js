"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _projectController = require("../controllers/projectController");

var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));

var route = (0, _express.Router)();
route.post('/', [(0, _expressValidator.header)('x-auth-token', 'you need sign in first').not().isEmpty(), (0, _expressValidator.check)('name', 'Project name is required').not().isEmpty()], _authenticate["default"], _projectController.createProject);
route.get('/', [(0, _expressValidator.header)('x-auth-token', 'you need sign in first').not().isEmpty()], _authenticate["default"], _projectController.obtainProjects);
route.put('/:id', [(0, _expressValidator.header)('x-auth-token', 'you need sign in first').not().isEmpty(), (0, _expressValidator.check)('name', 'Project name is required').not().isEmpty()], _authenticate["default"], _projectController.updateProject);
route["delete"]('/:id', [(0, _expressValidator.header)('x-auth-token', 'you need sign in first').not().isEmpty()], _authenticate["default"], _projectController.deleteProject);
var _default = route;
exports["default"] = _default;