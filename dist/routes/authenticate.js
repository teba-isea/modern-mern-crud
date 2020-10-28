"use strict";

require("jsonwebtoken");

var authenticator = function authenticator(req, res, next) {
  var token = req.header('x-auth-token');
  console.log(token);
};