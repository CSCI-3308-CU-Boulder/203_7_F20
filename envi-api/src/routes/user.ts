const Router = require('express-promise-router')
const query = require('../db')

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
router.use('/:id', async (req, res, next) => {
    let { id } = req.params
    let mode = isNaN(parseInt(id)) ? "username" : "id"
    let { rows } = await query(`SELECT * FROM users WHERE ${mode} = $1`, [id])
    if (rows && rows.length > 0) {
        const userDoc = rows[0];
        const { id, username, name, image_id, email, num_bottles } = userDoc;
        req.userObj = {
            id: id,
            username: username,
            name: name,
            image_id: image_id,
            email: email,
            num_bottles: num_bottles,
            achievements: exAch
        }
        next()
    } else {
        res.json({
            error: "User not found"
        })
    }
})

router.post('/:id/completeTask', async (req, res) => {
    req.userObj.num_bottles++
    const response = await query("UPDATE users SET num_bottles = $1 WHERE id = $2", [req.userObj.num_bottles, req.userObj.id])
    if (response) {
        res.json(req.userObj)
    } else {
        res.json({
            error: response
        })
    }
})

router.get('/:id/', (req, res) => {
    res.json(req.userObj)
})

// Update profile info
// Get friends
// Add friend

module.exports = router
export {}