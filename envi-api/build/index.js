"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mountRoutes = require('./routes');
var passport = require('passport');
var query = require('./db');
var session = require('express-session');
// pool = connection_pool
require('./config/passport')(passport, query);
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
mountRoutes(app);
app.use('/', express.static(path.join(__dirname, 'public')));
// Start server
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server listening on port " + port);
});
