"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express-promise-router');
var query = require('../db');
var passport = require('passport');
var bcrypt = require('bcrypt');
var validatePassword = function (password) {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var minLength = 8;
    // Validate lowercase letters
    if (!password.match(lowerCaseLetters))
        return false;
    // Validate capital letters        
    if (!password.match(upperCaseLetters))
        return false;
    // Validate numbers        
    if (!password.match(numbers))
        return false;
    // Validate length
    if (password.length <= minLength)
        return false;
    return true;
};
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
var router = new Router();
// Route for creating new users: req.body = { username, password, name, email, image_id }
// POST '/api/signup/'
router.post('/', function (req, res, next) {
    console.log('signup');
    var _a = req.body, username = _a.username, password = _a.password, name = _a.name, email = _a.email, image_id = _a.image_id;
    if (!username || !password || !name || !email) {
        res.status(401).send("Invalid user input");
        return null;
    }
    var saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err)
            console.log(err);
        bcrypt.hash(password, salt, function (err, hash) {
            query("INSERT INTO users(\n                username,\n                password,\n                email,\n                name,\n                image_id\n            ) VALUES ($1, $2, $3, $4, $5)", [
                username.toLowerCase(),
                hash,
                email.toLowerCase(),
                name,
                parseInt(image_id)
            ])
                .then(function (result) {
                var rows = result.rows;
                res.json({ success: true, user: rows[0] });
            }).catch(function (err) {
                console.error(err);
                res.json(err);
            });
        });
    });
});
// Returns success if req.query.username is valid (I.E not yet taken in database)
// GET '/api/signup/validateUsername?username='
router.get('/validateUsername', function (req, res) {
    var username = req.query.username;
    if (!username || username == "")
        return res.json({ err: "No username specified" });
    username = username.toLowerCase();
    var userCountQuery = "SELECT COUNT(*) FROM users WHERE username = '" + username + "';";
    query(userCountQuery)
        .then(function (results) {
        var count = results.rows[0].count;
        if (count > 0)
            res.json({ valid: false });
        else
            res.json({ valid: true });
    })
        .catch(function (err) { return res.json({ err: err }); });
});
// Returns success if req.query.email is valid (I.E not yet taken in database)
// GET '/api/signup/validateEmail?email='
router.get('/validateEmail', function (req, res) {
    var email = req.query.email;
    if (!email || email == "")
        return res.json({ err: "No email specified" });
    email = email.toLowerCase();
    var userCountQuery = "SELECT COUNT(*) FROM users WHERE email = '" + email + "';";
    query(userCountQuery)
        .then(function (results) {
        var count = results.rows[0].count;
        if (count > 0)
            res.json({ valid: false });
        else
            res.json({ valid: true });
    })
        .catch(function (err) { return res.json({ err: err }); });
});
module.exports = router;
