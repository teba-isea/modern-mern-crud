"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _taskController = require("../controllers/taskController");

var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));

var route = (0, _express.Router)();
route.post('/', [(0, _expressValidator.header)('x-auth-token', 'You need sign in first').not().isEmpty(), (0, _expressValidator.check)('name', 'Task name is required').not().isEmpty(), (0, _expressValidator.check)('project', 'Project owner is required').not().isEmpty()], _authenticate["default"], _taskController.createTask);
route.get('/:id', [(0, _expressValidator.header)('x-auth-token', 'You need sign in first').not().isEmpty()], _authenticate["default"], _taskController.obtainTasks);
route.put('/:id', [(0, _expressValidator.header)('x-auth-token', 'You need sign in first').not().isEmpty(), (0, _expressValidator.oneOf)([(0, _expressValidator.check)('name'), (0, _expressValidator.check)('status')], 'You need send al least one modification')], _authenticate["default"], _taskController.updateTask);
route["delete"]('/:id', [(0, _expressValidator.header)('x-auth-token', 'You need sign in first').not().isEmpty()], _authenticate["default"], _taskController.deleteTask);
var _default = route;
exports["default"] = _default;