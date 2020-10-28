"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTask = exports.updateTask = exports.obtainTasks = exports.createTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _Task = _interopRequireDefault(require("../models/Task"));

var _Project = _interopRequireDefault(require("../models/Project"));

var createTask = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, project, task;
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
            _context.next = 6;
            return _Project["default"].findOne({
              _id: req.body.project
            });

          case 6:
            project = _context.sent;

            if (project) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              msg: "Project not found"
            }));

          case 9:
            if (!(project.owner.toString() !== req.user.id)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: "Don't have enough permissions"
            }));

          case 11:
            task = new _Task["default"](req.body);
            _context.next = 14;
            return task.save();

          case 14:
            res.status(200).json({
              msg: "Task created successfully"
            });
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(500).json('houston,we have a problem');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 17]]);
  }));

  return function createTask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var obtainTasks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, projectOwner, tasks;
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
            return _Project["default"].findOne({
              _id: req.params.id
            });

          case 6:
            projectOwner = _context2.sent;

            if (projectOwner) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: "Project not found"
            }));

          case 9:
            _context2.next = 11;
            return _Task["default"].find({
              project: projectOwner._id
            }).sort({
              created: -1
            });

          case 11:
            tasks = _context2.sent;
            res.status(200).json(tasks);
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            res.status(500).json({
              msg: "houston, we have a problem"
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 15]]);
  }));

  return function obtainTasks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.obtainTasks = obtainTasks;

var updateTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var errors, _req$body, project, name, status, ifTask, ifProject, newTask;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context3.prev = 3;
            _req$body = req.body, project = _req$body.project, name = _req$body.name, status = _req$body.status;
            _context3.next = 7;
            return _Task["default"].findOne({
              _id: req.params.id
            });

          case 7:
            ifTask = _context3.sent;

            if (ifTask) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              msg: "Task not exist"
            }));

          case 10:
            _context3.next = 12;
            return _Project["default"].findOne({
              _id: project
            });

          case 12:
            ifProject = _context3.sent;

            if (ifProject) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              msg: "Project not exist"
            }));

          case 15:
            if (!(ifProject.owner.toString() !== req.user.id)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              msg: "Don't have enough permissions"
            }));

          case 17:
            newTask = {};
            name ? newTask.name = name : null;
            if (status !== undefined && status !== ifTask.status) newTask.status = status;
            _context3.next = 22;
            return _Task["default"].findOneAndUpdate({
              _id: req.params.id
            }, newTask, {
              "new": true
            });

          case 22:
            ifTask = _context3.sent;
            res.status(200).json(ifTask);
            _context3.next = 30;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            res.status(500).json({
              msg: 'houston, We have a problem'
            });

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 26]]);
  }));

  return function updateTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateTask = updateTask;

var deleteTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var errors, project, ifTask, ifProject;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context4.prev = 3;
            project = req.query.project;
            _context4.next = 7;
            return _Task["default"].findOne({
              _id: req.params.id
            });

          case 7:
            ifTask = _context4.sent;

            if (ifTask) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: "Task not exist"
            }));

          case 10:
            _context4.next = 12;
            return _Project["default"].findOne({
              _id: project
            });

          case 12:
            ifProject = _context4.sent;

            if (ifProject) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: "Project not exist"
            }));

          case 15:
            if (!(ifProject.owner.toString() !== req.user.id)) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              msg: "Don't have enough permissions"
            }));

          case 17:
            _context4.next = 19;
            return _Task["default"].findOneAndDelete({
              _id: ifTask.id
            });

          case 19:
            res.json({
              msg: "Task deleted successfully"
            });
            _context4.next = 26;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            res.status(500).json({
              msg: 'houston, We have a problem'
            });

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 22]]);
  }));

  return function deleteTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteTask = deleteTask;