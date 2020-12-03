"use strict";
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
module.exports = function (passport, query) {
    passport.use(new LocalStrategy(function (username, password, done) {
        // Allow users to log in with email or username
        var usernameType = username.match(emailRegex) ? 'email' : 'username';
        var results = query("SELECT * FROM users WHERE " + usernameType + "=$1", [username]).then(function (results) {
            if (!results || results.rows.length == 0) {
                var err = "User not found";
                console.error(err);
                return done(err, false, { err: 'That username is not registered' });
            }
            var user = results.rows[0];
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    throw err;
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { err: 'Password incorrect' });
                }
            });
        }).catch(function (err) { return done(null, false, { err: err }); });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        query('SELECT * FROM users WHERE id = $1', [parseInt(id, 10)])
            .then(function (results) {
            delete results.rows[0].password;
            done(null, results.rows[0]);
        })
            .catch(function (err) { return done(err, null); });
    });
};
// module.exports = (passport, query) => {
//     // Begin by setting up local login with postgres db
//     passport.use(new LocalStrategy(
//         async (username, password, done) => {
//             const results = await query('SELECT * FROM users WHERE username=$1', [username])
//             if (!results || results.rows.length == 0) {
//                 let err = "User not found"
//                 console.error(err)
//                 return done(err)
//             }
//             const user = results.rows[0];
//             bcrypt.compare(password, user.password, function(err, res) {
//                 if(err) {
//                     console.error(err)
//                     done(err)
//                 } else if (res) {
//                     done(null, { id: user.id, username: user.username })
//                 }
//             })
//         }
//         ));
//         passport.serializeUser((user, done) => {
//             done(null, user.id)
//         })
//         passport.deserializeUser((id, done) => {
//             query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
//                 if(err) {
//                     console.error('Error when selecting user on session deserialize', err)
//                     return done(err)
//                 }
//                 console.log("yo")
//                 done(null, results.rows[0])
//             })
//         })
//     }
