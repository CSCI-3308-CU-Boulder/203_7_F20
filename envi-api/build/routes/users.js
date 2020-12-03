"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var Router = require('express-promise-router');
var query = require('../db');
var ensureAuthenticated = require('../config/auth').ensureAuthenticated;
var userUtility = require('../db/user');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
var router = new Router();
var exAch = [
    //hardcoded user achievements
    {
        name: "Demo Achievement 1",
        description: "demo description text 1",
        image: "./assets/envi.png",
    },
    {
        name: "Demo Achievement 2",
        description: "demo description text 2",
        image: "./assets/envi.png",
    },
    {
        name: "Demo Achievement 3",
        description: "demo description text 3",
        image: "./assets/envi.png",
    },
];
// GET '/users/' returns a list of all users in DB Limit 100
router.get('/', function (req, res) {
    query("SELECT id, username, image_id, impact_points FROM users ORDER BY impact_points DESC LIMIT 100;")
        .then(function (results) { return res.json({ users: results.rows }); })
        .catch(function (err) { return res.json({ err: err }); });
});
// Get user from either user id or username
// TODO: only match exact when user is not authenticated
router.use('/:id', function (req, res, next) {
    var id = req.params.id;
    id = id.toLowerCase();
    req.mode = isNaN(parseInt(id)) ? "username" : "id";
    if (req.isAuthenticated()) {
        if (id == req.user.username || id == req.user.id) {
            // accessing logged in user data
            return next();
        }
    }
    // If not getting user data for logged in user, return public fields for requested user
    query("SELECT * FROM users WHERE " + req.mode + " = $1", [id])
        .then(function (results) {
        var rows = results.rows;
        if (rows && rows.length > 0) {
            var userDoc = rows[0];
            var id_1 = userDoc.id, username = userDoc.username, image_id = userDoc.image_id, impact_points = userDoc.impact_points;
            res.json({
                id: id_1,
                username: username,
                // name: name,
                image_id: image_id,
                impact_points: impact_points,
                achievements: exAch
            });
        }
        else {
            res.json({
                error: "User not found"
            });
        }
    }).catch(function (err) { return res.json({ error: err }); });
});
router.get('/:id/', function (req, res) {
    res.json(req.user);
});
// Update profile info
router.post('/:username/updateInfo', function (req, res) {
    var newUsername = (req.body.username).toLowerCase();
    var newName = req.body.name;
    var newImage = req.body.image_id;
    var updateQuery = "UPDATE users SET username ='" + newUsername + "', name ='" + newName + "', image_id =" + newImage + " WHERE username=$1";
    console.log(updateQuery);
    console.log(req.params);
    var username = req.params.username;
    // console.log(username);
    // query(updateQuery, [username], function (error, results, fields) {
    //     if (error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    // successfully updated the database
    query(updateQuery, [username])
        .then(function (results) {
        res.json({ success: true });
    })
        .catch(function (err) { return res.json({ err: err }); });
});
// change password
router.post('/:username/changePassword', function (req, res) {
    var _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
    bcrypt.compare(oldPassword, req.user.password, function (err, isMatch) {
        if (err)
            throw err;
        if (isMatch) {
            // Update password
            var saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err)
                    console.log(err);
                bcrypt.hash(newPassword, salt, function (err, hash) {
                    query("UPDATE users SET password = $1 WHERE id = $2;", [hash, req.user.id])
                        .then(res.json({ success: true }))
                        .catch(function (err) {
                        console.error(err);
                        res.json(err);
                    });
                });
            });
        }
        else {
            res.json({ err: "Incorrect Old Password" });
        }
    });
});
// get public user info for a user
router.get('/:id/getUser', function (req, res) {
    var user_id = req.body.user_id;
    var userQuery = "SELECT username, name, bio, birthday, image_id, impact_points FROM users WHERE id = $1";
    query(userQuery, [user_id])
        .then(function (results) { return res.json({ friend: results.rows }); })
        .catch(function (err) { return res.json({ err: err }); });
});
// Get friends 
router.get('/:id/getFriends', function (req, res) {
    // Get all friends for user
    query("SELECT users.name, users.id, users.username, users.image_id, users.impact_points FROM friends_link RIGHT JOIN users ON friends_link.friend_id = users.id WHERE friends_link.user_id = " + req.user.id + ";")
        .then(function (results) { return res.json({ friends: results.rows }); })
        .catch(function (err) { return res.json({ err: err }); });
    // var infoQuery = "SELECT username, name, image_id, level FROM users WHERE id =$1"; // to get info about the friend
    // var friendQuery = "SELECT friends_id_array FROM friends_link WHERE id =$1"; // get user's friends array
    // var numFriendQuery = "SELECT COUNT(*) FROM friends_link WHERE id =$1"; // get the number of friends
    // // console.log(friendQuery);
    // query(friendQuery, [req.userid], function (error, results, fields) { // query to get the friends list
    //     query(numFriendQuery, function(error, numFriends) {  // query the number of friends
    //         if(results) {
    //             var i = 0;
    //             for(i=0; i<numFriends; i++) { // loop through to get all friends
    //                 query(infoQuery, [results[i]], function(error2, results2, fields) { // query to get the friend info
    //                     if (error2) throw error2;
    //                     // what is the best format to send this data? (a list of friend information)
    //                     res.send('/friends.html', {
    //                         username: results2[0],
    //                         name: results2[1],
    //                         image_id: results2[2],
    //                         level: results2[3],
    //                     })
    //                 });
    //             }
    //         }
    //         else {
    //             throw error;
    //         }
    //     })
    // });
});
// Add friend
router.post('/:id/addFriend/:friendUsername', function (req, res) {
    var friendUsername = req.params.friendUsername;
    if (!friendUsername || friendUsername == "")
        return res.json({ err: "Invalid friend username" });
    // Find friend_id by username
    query("SELECT id FROM users WHERE username = '" + friendUsername + "'")
        .then(function (friendIdResults) {
        // Check that user exists with username = friendUsername
        if (friendIdResults.rows.length < 1)
            return res.json({ err: "Invalid friend username" });
        var friendId = friendIdResults.rows[0].id;
        // Check if user already has friend with username_id
        query("SELECT COUNT(*) FROM friends_link LEFT JOIN users ON friends_link.friend_id = users.id WHERE friends_link.user_id = " + req.user.id + " AND friends_link.friend_id = " + friendId + ";")
            .then(function (results1) {
            var count = results1.rows[0].count;
            if (count > 0)
                return res.json({ err: "You are already friends with this user" });
            // Insert friend_link document
            query("INSERT INTO friends_link (user_id, friend_id) VALUES (" + req.user.id + ", " + friendId + ");")
                .then(function (results2) { return res.json({ success: true }); })
                .catch(function (err) {
                console.log(err);
                res.json({ err: err });
            });
        })
            .catch(function (err) {
            console.log(err);
            res.json({ err: err });
        });
    })
        .catch(function (err) {
        console.log(err);
        res.json({ err: err });
    });
    // var updateQuery = "UPDATE friend_link SET friends_id_array = [$1," +id+ "] WHERE user_id=$2"; // add friend id to the array
    // var friendListQuery = "SELECT friends_id_array FROM friend_link WHERE user_id=" + req.user.id; // to get the friends array from the user
    // query(friendListQuery, function(error, results, fields) {
    //     if (error) throw error;
    //     else query(updateQuery, [results[0], req.user.id], function(error, results, fields) {
    //         if (error) throw error;
    //         res.send(JSON.stringify(results));
    //     });
    // });
});
// // ------------completeTasks (made a few changes but the old ones are there, just commented)----------------------------------------------
// increments impact points by 1 each time a task is completed 
// and increments times_completed by 1 but for all tasks, not specific ones
// needs to be fixed so that it updates by task_id
router.post('/:username/completeTask', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, task_id, impact, update, points, added;
    return __generator(this, function (_b) {
        _a = req.body, task_id = _a.task_id, impact = _a.impact;
        update = "UPDATE tasks SET times_completed = times_completed + 1 WHERE id = $1;";
        points = "UPDATE users SET impact_points = impact_points + 1 WHERE id = $1;";
        added = 1;
        if (impact == 'reuse') {
            points = "UPDATE users SET impact_points = impact_points + 3 WHERE id = $1;"; // adding 3 impact points for reuse
            added = 3;
        }
        else if (impact == 'reduce') {
            points = "UPDATE users SET impact_points = impact_points + 2 WHERE id = $1;"; // adding 2 impact points for reduce
            added = 2;
        }
        // query(update, [req.user.id, task_id])
        query(update, [task_id])
            .then(function (results) {
            console.log('Task updated');
            query(points, [req.user.id])
                .then(function (results1) {
                console.log('User points updated');
                userUtility.calculateNewAchievements(req.user, added)
                    .then(function (newAchievement) {
                    res.json({ success: true, newAchievement: newAchievement });
                })
                    .catch(function (err) {
                    console.log(err);
                    res.json({ err: err });
                });
                // res.json({success: true});
            })
                .catch(function (err) { return res.json({ err: err }); });
        })
            .catch(function (err) { return res.json({ err: err }); });
        return [2 /*return*/];
    });
}); });
// addTask -- used for non static requests
router.post('/:id/addTask', function (req, res) {
    console.log('Adding task');
    var _a = req.body, name = _a.name, description = _a.description, impact = _a.impact;
    console.log(name, description, impact);
    if (!name || !impact) {
        res.status(401).send("Invalid task input");
        return null;
    }
    var taskQuery = "INSERT INTO tasks (user_id, name, description, impact, times_completed) VALUES ($1, $2, $3, $4, 0);"; // adding task to list
    var outputQuery = "SELECT * FROM tasks WHERE user_id=$1 AND name=$2 AND times_completed=0;";
    query(taskQuery, [req.user.id, name, description, impact])
        .then(function (response) {
        query(outputQuery, [req.user.id, name])
            .then(function (results) { return res.json({ success: true, task: results.rows }); })
            .catch(function (err) { return res.json({ err: err }); });
    })
        .catch(function (err) { return res.json({ err: err }); });
});
// for getting tasks added by a given user
router.get('/:id/getTasks', function (req, res) {
    console.log('Getting tasks');
    // let { id } = req.user;
    // console.log(id);
    var taskQuery = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY create_date, name DESC;';
    query(taskQuery, [req.user.id])
        .then(function (results) { return res.json({ tasks: results.rows }); })
        .catch(function (err) { return res.json({ err: err }); });
});
// addAchievement
router.post('/:id/addAchievement', function (req, res) {
    console.log('Adding achievement');
    var _a = req.body, user_id = _a.user_id, name = _a.name, description = _a.description, image_id = _a.image_id;
    if (!user_id || !name || !image_id) {
        res.status(401).send("Invalid Achievement");
        return null;
    }
    var achQuery = "INSERT INTO achievements (user_id, name, description, image_id) VALUES ($1, $2, $3, $4)";
    query(achQuery, [user_id, name, description, image_id], function (error, results) {
        if (error)
            throw error;
        res.json({ success: true });
    });
});
// get user achievements
// '/api/users/:username/getAchievements'
router.get('/:id/getAchievements', function (req, res) {
    // query for ach's
    query("SELECT * FROM achievements WHERE user_id = " + req.user.id + " ORDER BY create_date DESC;")
        .then(function (results) { return res.json({ achievements: results.rows }); })
        .catch(function (err) {
        console.log(err);
        res.json({ err: err });
    });
});
// getFriendAchievements 
router.get('/:id/getFriendAchievements', function (req, res) {
    var id = req.user.id;
    var achquery = "SELECT achievements.user_id, users.username, achievements.name, achievements.description, achievements.image_id FROM friends_link RIGHT JOIN achievements ON friends_link.friend_id = achievements.user_id LEFT JOIN users ON friends_link.friend_id = users.id WHERE friends_link.user_id = $1 ORDER BY achievements.create_date desc;";
    query(achquery, [id])
        .then(function (results) { return res.json({ friends: results.rows }); })
        .catch(function (err) { return res.json({ err: err }); });
});
// numTasks -- used for statistics
router.get('/:id/numTasks', function (req, res) {
    var id = req.params.id;
    console.log(id);
    var reuseQuery = "SELECT SUM(times_completed) FROM tasks WHERE user_id = $1 AND impact='reuse'";
    var reduceQuery = "SELECT SUM(times_completed) FROM tasks WHERE user_id = $1 AND impact='reduce'";
    var recycleQuery = "SELECT SUM(times_completed) FROM tasks WHERE user_id = $1 AND impact='recycle'";
    query(reuseQuery, [id])
        .then(function (reuseResults) {
        console.log('reuse query done');
        query(reduceQuery, [id])
            .then(function (reduceResults) {
            console.log('reduce query done');
            query(recycleQuery, [id])
                .then(function (recycleResults) {
                console.log('recycle query done');
                res.json({ reuse: reuseResults.rows, reduce: reduceResults.rows, recycle: recycleResults.rows });
            })
                .catch(function (err) { return res.json({ err: err }); });
        })
            .catch(function (err) { return res.json({ err: err }); });
    })
        .catch(function (err) { return res.json({ err: err }); });
});
module.exports = router;
