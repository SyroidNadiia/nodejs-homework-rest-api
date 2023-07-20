const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const resendEmail = require('./resendEmail');
const verify = require('./verify');

module.exports = { register, login, logout, resendEmail, verify };
