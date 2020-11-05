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
// Get friends
// Add friend

module.exports = router
export {}