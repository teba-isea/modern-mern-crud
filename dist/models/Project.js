"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var ProjectSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    "default": Date.now()
  }
});

var _default = _mongoose["default"].model('Project', ProjectSchema);

exports["default"] = _default;