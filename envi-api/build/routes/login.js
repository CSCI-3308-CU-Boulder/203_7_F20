"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express-promise-router');
var passport = require('passport');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
var router = new Router();
// export our router to be mounted by the parent application
// router.post('/', (req, res) => {
//     res.send('test')
// })
// "/login/"
router.post('/', function (req, res, next) {
    if (req.body.username)
        req.body.username = req.body.username.toLowerCase();
    if (req.body.email)
        req.body.email = req.body.email.toLowerCase();
    next();
}, function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {
        // this will execute in any case, even if a passport strategy will find an error
        if (error) {
            res.status(401).json({ err: error });
        }
        else if (!user) {
            res.status(401).json({ err: info });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    res.json({ error: err });
                }
                delete req.user.password;
                res.json(req.user);
            });
        }
    })(req, res);
});
module.exports = router;
