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

// Get user from either user id or username
router.use('/:id', (req, res, next) => {
    let { id } = req.params
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
                const { username, image_id, num_bottles } = userDoc;
                res.json({
                    username: username,
                    image_id: image_id,
                    num_bottles: num_bottles,
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
router.post('/:id/updateInfo', ensureAuthenticated, function(req, res) {
    var newUsername = req.body.modal_username;
    var newName = req.body.modal_name;
    var newImage = req.body.modal_image_id;
    var newEmail = req.body.defaultForm_email;
    var updateQuery = "UPDATE users SET username ='" +newUsername+ "', name ='" +newName+"', image_id =" +newImage+ ", email ='" +newEmail+ "' WHERE id =$1";
    console.log(updateQuery);
    console.log(req.params);
    let { id } = req.params;
    console.log(id);
    query(updateQuery, [id], function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
    // successfully updated the database
})


// Get friends -- NOT TESTED
router.get('/users/:id/getFriends', async (req, res) => {
    var infoQuery = "SELECT username, name, image_id, level FROM users WHERE id =$1"; // to get info about the friend
    var friendQuery = "SELECT friends_id_array FROM friends_link WHERE id =$1"; // get user's friends array
    var numFriendQuery = "SELECT COUNT(*) FROM friends_link WHERE id =$1"; // get the number of friends
    // console.log(friendQuery);
    query(friendQuery, [req.userid], function (error, results, fields) { // query to get the friends list
        query(numFriendQuery, function(error, numFriends) {  // query the number of friends
            if(results) {
                var i = 0;
                for(i=0; i<numFriends; i++) { // loop through to get all friends
                    query(infoQuery, [results[i]], function(error2, results2, fields) { // query to get the friend info
                        if (error2) throw error2;
                        // what is the best format to send this data? (a list of friend information)
                        res.send('/friends.html', {
                            username: results2[0],
                            name: results2[1],
                            image_id: results2[2],
                            level: results2[3],
                        })
                    });
                }
            }
            else {
                throw error;
            }
        })
    });
})

// Add friend -- NOT TESTED
router.post('/:id1/addFriend/:id2', function(req,res) {
    let { id } = req.params;
    console.log(id)
    var updateQuery = "UPDATE friend_link SET friends_id_array = [$1," +id+ "] WHERE user_id=$2"; // add friend id to the array
    var friendListQuery = "SELECT friends_id_array FROM friend_link WHERE user_id=" + req.user.id; // to get the friends array from the user
    query(friendListQuery, function(error, results, fields) {
        if (error) throw error;
        else query(updateQuery, [results[0], req.user.id], function(error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    });
})

module.exports = router
export {}