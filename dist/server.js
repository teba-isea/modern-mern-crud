"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _projects = _interopRequireDefault(require("./routes/projects"));

var _tasks = _interopRequireDefault(require("./routes/tasks"));

var _login = _interopRequireDefault(require("./routes/login"));

var _cors = _interopRequireDefault(require("cors"));

//Settings
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.set('port', process.env.PORT || 4000);
app.use(_express["default"].json({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use("/api/users", _users["default"]);
app.use("/api/login", _login["default"]);
app.use("/api/projects", _projects["default"]);
app.use("/api/tasks", _tasks["default"]);

var server = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return app.listen(app.get("port"));

          case 3:
            console.log("server running on port ".concat(app.get("port")));
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            process.exit(1);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function server() {
    return _ref.apply(this, arguments);
  };
}();

var _default = server;
exports["default"] = _default;