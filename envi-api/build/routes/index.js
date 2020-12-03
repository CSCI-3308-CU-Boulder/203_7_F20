"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ./routes/index.js
var login = require('./login');
var logout = require('./logout');
var loggedIn = require('./loggedIn');
var signup = require('./signup');
var users = require('./users');
var donate = require('./donate');
var search = require('./search');
module.exports = function (app) {
    app.get('/api/', function (req, res) {
        res.send('Envi-api');
    });
    app.use('/api/login', login);
    app.use('/api/logout', logout);
    app.use('/api/loggedIn', loggedIn);
    app.use('/api/signup', signup);
    app.use('/api/users', users);
    app.use('/api/donate', donate);
    app.use('/api/search', search);
    // etc..
};
