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
var taskQuery = "INSERT INTO tasks (user_id, name, description, impact) VALUES \n                    ($1, 'Recycle Bottle', 'Although simple, recycling everyday items can create a large impact over time.', 'recycle'),\n                    ($1, 'Recycle Electronics', 'Recycling electronics is an important step in creating a sustainable future!', 'recycle'),\n                    ($1, 'Reuse Waterbottle', 'Help reduce waste and stay hydrated :)', 'reuse'),\n                    ($1, 'Ride the bus', 'Public transportation is a great way to reduce carbon emissions.', 'reduce'),\n                    ($1, 'Ride a bike to work', 'Help reduce emissions and get fit!', 'reduce'),\n                    ($1, 'Donate clothing', 'Help someone in need, get rid of the uneccesary, and create a positive impact!', 'reuse'),\n                    ($1, 'Consign Clothing', 'Get rid of uneccesary clothing, get paid, and create a positive impact!', 'reuse'),\n                    ($1, 'Use a reusable bag', 'Don''t forget your reusable bags in your trunk!', 'reuse'),\n                    ($1, 'Donate clothing', 'Help someone in need, get rid of the uneccesary, and create a positive impact!', 'reuse');";
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
            query("INSERT INTO users(\n                username,\n                password,\n                email,\n                name,\n                image_id\n                ) VALUES ($1, $2, $3, $4, $5)", [
                username.toLowerCase(),
                hash,
                email.toLowerCase(),
                name,
                parseInt(image_id)
            ])
                .then(function () {
                query("SELECT * FROM users WHERE username = $1;", [username.toLowerCase()])
                    .then(function (results) {
                    // console.log(results)
                    var user = results.rows[0];
                    delete user.password;
                    query(taskQuery, [user.id])
                        .then(res.json({ success: true, user: user }))
                        .catch(function (err) { return res.json({ err: err }); });
                })
                    .catch(function (err) { return res.json({ err: err }); });
            })
                .catch(function (err) { return res.json({ err: err }); });
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
