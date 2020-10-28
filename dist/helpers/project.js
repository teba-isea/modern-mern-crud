"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOwner = void 0;

var isOwner = function isOwner(user, project) {
  var result = project.owner.toString() === user.id ? true : false;
  return result;
};

exports.isOwner = isOwner;