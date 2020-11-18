const Router = require('express-promise-router')
const query = require('../db')
const passport = require('passport')
const bcrypt = require('bcrypt')

const validatePassword = (password) => {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var minLength = 8;
    
    // Validate lowercase letters
    if(!password.match(lowerCaseLetters)) return false
    
    // Validate capital letters        
    if(!password.match(upperCaseLetters)) return false
    
    // Validate numbers        
    if(!password.match(numbers)) return false
    
    // Validate length
    if(password.length <= minLength) return false
    
    return true
}

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// Route for creating new users: req.body = { username, password, name, email, image_id }
// POST '/api/signup/'
router.post('/', (req, res, next) => {
    console.log('signup')
    const { username, password, name, email, image_id } = req.body
    if (!username || !password || !name || !email) {
        res.status(401).send("Invalid user input")
        return null
    }

    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(password, salt, function(err, hash) {
            query(`INSERT INTO users(
                username,
                password,
                email,
                name,
                image_id
            ) VALUES ($1, $2, $3, $4, $5)`, [
                username.toLowerCase(),
                hash,
                email.toLowerCase(),
                name,
                parseInt(image_id)
            ])
            .then(result => {
                const { rows } = result;
                res.json({ success: true, user: rows[0] });
            }).catch(err => {
                console.error(err)
                res.json(err)
            })
        })
    })
})

// Returns success if req.query.username is valid (I.E not yet taken in database)
// GET '/api/signup/validateUsername?username='
router.get('/validateUsername', (req, res) => {
    let { username } = req.query;
    if (!username || username == "") return res.json({ err: "No username specified" })
    username = username.toLowerCase()
    let userCountQuery = `SELECT COUNT(*) FROM users WHERE username = '${username}';`
    query(userCountQuery)
    .then(results => {
        let { count } = results.rows[0]
        if (count > 0) res.json({ valid: false })
        else res.json({ valid: true })
    })
    .catch(err => res.json({ err: err }))
})

// Returns success if req.query.email is valid (I.E not yet taken in database)
// GET '/api/signup/validateEmail?email='
router.get('/validateEmail', (req, res) => {
    let { email } = req.query;
    if (!email || email == "") return res.json({ err: "No email specified" })
    email = email.toLowerCase()
    let userCountQuery = `SELECT COUNT(*) FROM users WHERE email = '${email}';`
    query(userCountQuery)
    .then(results => {
        let { count } = results.rows[0]
        if (count > 0) res.json({ valid: false })
        else res.json({ valid: true })
    })
    .catch(err => res.json({ err: err }))
})

module.exports = router
export {}