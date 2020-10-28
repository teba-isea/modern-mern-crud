"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProject = exports.updateProject = exports.obtainProjects = exports.createProject = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _Project = _interopRequireDefault(require("../models/Project"));

var _project = require("../helpers/project");

var createProject = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, _req$body, name, user, project;

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
            _req$body = req.body, name = _req$body.name, user = _req$body.user;
            project = new _Project["default"]({
              name: name
            });
            project.owner = req.user.id;
            _context.next = 9;
            return project.save();

          case 9:
            res.json(project);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            res.status(500).json({
              msg: 'houston, We have a problem'
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function createProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProject = createProject;

var obtainProjects = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, projects;
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
            return _Project["default"].find({
              owner: req.user.id
            }).sort({
              created: -1
            });

          case 6:
            projects = _context2.sent;
            res.status(200).json(projects);
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            res.status(500).json({
              msg: 'houston, We have a problem'
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 10]]);
  }));

  return function obtainProjects(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.obtainProjects = obtainProjects;

var updateProject = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var name, errors, newProject, project;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = req.body.name;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 4:
            newProject = {};
            if (name) newProject.name = name;
            _context3.prev = 6;
            _context3.next = 9;
            return _Project["default"].findById(req.params.id);

          case 9:
            project = _context3.sent;

            if (!(project.owner.toString() !== req.user.id)) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              msg: "Don't have enough permissions"
            }));

          case 12:
            _context3.next = 14;
            return _Project["default"].findOneAndUpdate({
              _id: req.params.id
            }, {
              $set: {
                name: newProject.name
              }
            }, {
              "new": true
            });

          case 14:
            project = _context3.sent;
            res.status(200).json(project);
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](6);
            console.log(_context3.t0);
            res.status(500).json({
              msg: 'houston, We have a problem'
            });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 18]]);
  }));

  return function updateProject(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateProject = updateProject;

var deleteProject = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var errors, project;
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
            _context4.next = 6;
            return _Project["default"].findById({
              _id: req.params.id
            });

          case 6:
            project = _context4.sent;

            if (project) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: "Project isn't exist"
            }));

          case 9:
            if (!(project.owner.toString() !== req.user.id)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              msg: "Don't have enough permissions"
            }));

          case 11:
            _context4.next = 13;
            return _Project["default"].findOneAndDelete({
              _id: req.params.id
            });

          case 13:
            res.status(200).json({
              msg: "project deleted"
            });
            _context4.next = 20;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            res.status.json({
              msg: "houston, we have a problem"
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 16]]);
  }));

  return function deleteProject(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteProject = deleteProject;