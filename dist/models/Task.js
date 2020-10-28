"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var TaskSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    "default": false
  },
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  created: {
    type: Date,
    "default": Date.now()
  }
});

var _default = _mongoose["default"].model('Task', TaskSchema);

exports["default"] = _default;