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
router.post('/:id/updateInfo', function(req, res) {
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
    // successfully updated the database, but didn't do much after that?
})


// Get friends -- NOT DONE
router.get('/users/:id/getFriends', async (req, res) => {
    var friendQuery = "SELECT username, name, image_id, level FROM users WHERE id =$1";
    let { id } = req.params;
    console.log(friendQuery);
    console.log(req.params);
    console.log(id);
    query(friendQuery, [id], function (error, results, fields) {
        if(results) {
            res.send('/friends.html', {
                username: results[0],
                name: results[1],
                image_id: results[2],
                level: results[3],
            })
        }
        else {
            throw error;
        }
    });
})

// Add friend -- NOT DONE
router.post('/:id1/addFriend/:id2', function(req,res) {
    var updateQuery = "UPDATE friend_link SET ___ WHERE user_id=$1"; // add friend id to the array
    let { id } = req.params;
    console.log(id)
    query(updateQuery, [], function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

module.exports = router
export {}