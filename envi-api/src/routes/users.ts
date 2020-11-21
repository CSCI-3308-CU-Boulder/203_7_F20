import { parse } from "path";

const Router = require('express-promise-router')
const query = require('../db')
const { ensureAuthenticated } = require('../config/auth');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

const exAch = [
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
router.get('/', (req, res) => {
    query(`SELECT id, username, image_id, impact_points FROM users ORDER BY impact_points DESC LIMIT 100;`)
    .then(results => res.json({ users: results.rows }))
    .catch(err => res.json({ err: err }))
})

// Get user from either user id or username
// TODO: only match exact when user is not authenticated
router.use('/:id', (req, res, next) => {
    let { id } = req.params
    id = id.toLowerCase()
    req.mode = isNaN(parseInt(id)) ? "username" : "id"
    if (req.isAuthenticated()) {
        if (id == req.user.username || id == req.user.id) {
            // accessing logged in user data
            return next()
        }
    }

    // If not getting user data for logged in user, return public fields for requested user
    query(`SELECT * FROM users WHERE ${req.mode} = $1`, [id])
        .then(results => {
            let { rows } = results
            if (rows && rows.length > 0) {
                const userDoc = rows[0]
                const { id, username, image_id, impact_points } = userDoc;
                res.json({
                    id: id,
                    username: username,
                    image_id: image_id,
                    impact_points: impact_points,
                    achievements: exAch
                })
            } else {
                res.json({
                    error: "User not found"
                })
            }
        }).catch(err => res.json({ error: err }))
})

// router.post('/:id/completeTask', ensureAuthenticated, async (req, res) => {
//     req.userObj.num_bottles++
//     const response = await query("UPDATE users SET num_bottles = $1 WHERE id = $2", [req.userObj.num_bottles, req.userObj.id])
//     if (response) {
//         res.json(req.userObj)
//     } else {
//         res.json({
//             error: response
//         })
//     }
// })

router.get('/:id/', (req, res) => {
    res.json(req.user)
})

// Update profile info
router.post('/:username/updateInfo', ensureAuthenticated, function(req, res) {
    var newUsername = (req.body.modal_username).toLowerCase();
    var newName = req.body.modal_name;
    var newImage = req.body.modal_image_id;
    var newEmail = (req.body.defaultForm_email).toLowerCase();
    var updateQuery = "UPDATE users SET username ='" +newUsername+ "', name ='" +newName+"', image_id =" +newImage+ ", email ='" +newEmail+ "' WHERE username=$1";
    console.log(updateQuery);
    console.log(req.params);
    let { username } = req.params;
    // console.log(username);
    query(updateQuery, [username], function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
    // successfully updated the database
})


// Get friends -- NOT TESTED
router.get('/:id/getFriends', async (req, res) => {
    // Get all friends for user
    query(`SELECT users.id, users.username, users.image_id, users.impact_points FROM friends_link RIGHT JOIN users ON friends_link.friend_id = users.id WHERE friends_link.user_id = ${req.user.id};`)
    .then(results => res.json({ friends: results.rows }))
    .catch(err => res.json({ err: err }))

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
})

// Add friend -- NOT TESTED
router.post('/:id/addFriend/:friendUsername', function(req,res) {
    let { friendUsername } = req.params;
    if (!friendUsername || friendUsername == "") return res.json({ err: "Invalid friend username"})

    // Find friend_id by username
    query(`SELECT id FROM users WHERE username = '${friendUsername}'`)
    .then(friendIdResults => {
        // Check that user exists with username = friendUsername
        if (friendIdResults.rows.length < 1) return res.json({ err: "Invalid friend username" })
        let friendId = friendIdResults.rows[0].id
        // Check if user already has friend with username_id
        query(`SELECT COUNT(*) FROM friends_link LEFT JOIN users ON friends_link.friend_id = users.id WHERE friends_link.user_id = ${req.user.id} AND friends_link.friend_id = ${friendId};`)
        .then(results1 => {
            let { count } = results1.rows[0]
            if (count > 0) return res.json({ err: "You are already friends with this user" }) 
            // Insert friend_link document
            query(`INSERT INTO friends_link (user_id, friend_id) VALUES (${req.user.id}, ${friendId});`)
            .then(results2 => res.json({ success: true }))
            .catch(err => {
                console.log(err)
                res.json({ err: err })
            })
        })
        .catch(err => {
            console.log(err)
            res.json({ err: err })
        })
    })
    .catch(err => {
        console.log(err)
        res.json({ err: err })
    })
    

    // var updateQuery = "UPDATE friend_link SET friends_id_array = [$1," +id+ "] WHERE user_id=$2"; // add friend id to the array
    // var friendListQuery = "SELECT friends_id_array FROM friend_link WHERE user_id=" + req.user.id; // to get the friends array from the user
    // query(friendListQuery, function(error, results, fields) {
    //     if (error) throw error;
    //     else query(updateQuery, [results[0], req.user.id], function(error, results, fields) {
    //         if (error) throw error;
    //         res.send(JSON.stringify(results));
    //     });
    // });
})

// completeTasks -- NOT TESTED
router.post('/username/:completeTasks', async (req, res) => { // json with user_id and task_id
    //var actionsID = req.body.action_id; Handled in database
    // var user_id = req.params.id;
    // var actionName = req.body.taskName;
    // var actionDescript = req.body.taskDescription;
    // var taskType = req.body.type;
    const { user_id, task_id } = req.body;
    var update = "UPDATE tasks SET completed = completed + 1 WHERE user_id = $1, id=$2;"; // updating the task as completed in db
    var points = "UPDATE users SET impact_points = impact_points + 1 WHERE user_id = $1"; // adding impact points for the user
    query(update, [user_id, task_id], function(error, results, fields) {
        if (error) throw error;
        console.log('Task updated');
        query(points, [user_id], function(error1, results1, fields) {
            if (error1) throw error1;
            console.log('User points updated');
            res.json({success: true});
        })
    });
})


// addTask -- NOT TESTED -- used for non static requests
router.post('/:id/addTask', function(req, res) { // parameters -- name, description, impact
    console.log('Adding task');
    const { user_id, name, description, impact } = req.body;
    if(!user_id || !name || !impact) {
        res.status(401).send("Invalid task input")
        return null
    }
    var taskQuery = "INSERT INTO tasksList (name, description, impact) VALUES ($1, $2, $3);"; // adding task to list
    query(taskQuery, [name, description, impact], function(error, results) {
        if (error) throw error;
        res.json({success : true});
    });
})


// addAchievement -- NOT TESTED
router.post('/:id/addAchievement', function(req, res) { // parameters -- name, image_id, descriptions, user_id
    console.log('Adding achievement');
    const { user_id, name, description, image_id } = req.body;
    if(!user_id || !name || !image_id) {
        res.status(401).send("Invalid Achievement");
        return null;
    }
    var achQuery = "INSERT INTO achievments (user_id, name, description, image_id) VALUES ($1, $2, $3, $4)";
    query(achQuery, [user_id, name, description, image_id], function(error, results) {
        if (error) throw error;
        res.json({success : true});
    });
})

// numTasks -- NOT TESTED -- used for statistics (if implemented)
router.get('/id:/numTasks', function(req, res) {
    let { user_id } = req.params.id;
    var reuseQuery = "SELECT COUNT(times_completed) FROM tasks WHERE user_id = " +user_id+ ", impact='reuse'";
    var reduceQuery = "SELECT COUNT(times_completed) FROM tasks WHERE user_id = " +user_id+ ", impact='reduce'";
    var recycleQuery = "SELECT COUNT(times_competed) FROM tasks WHERE user_id = " +user_id+ ", impact='recycle'";
    query(reuseQuery, function(error1, results1) {
        if(error1) throw error1;
        query(reduceQuery, function(error2, results2) {
            if (error2) throw error2;
            query(recycleQuery, function (error3, results3) {
                if (error3) throw error3;
                res.json({reuse: results1, reduce: results2, recycle: results3}); // need to check on like actual results -- idk about the format
                // res.send(JSON.stringify({reuse: results1, reduce: results2, recycle: results3})); // maybe this actually oop idk
            })
        });
    });
})

module.exports = router
export {}