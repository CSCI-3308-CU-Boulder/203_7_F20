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

// export our router to be mounted by the parent application
// router.post('/', (req, res) => {
//     res.send('test')
// })
router.post('/', (req, res, next) => {
    console.log(req.body)
    const { username, password, name, email, image_id, birthday } = req.body
    if (!username || !password || !name || !email) {
        res.status(401).send("Invalid user input")
        return null
    }

    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
            query(`INSERT INTO users(
                username,
                password,
                email,
                name,
                image_id
            ) VALUES ($1, $2, $3, $4, $5)`, [
                username,
                hash,
                email,
                name,
                parseInt(image_id)
            ])
            .then(result => {
                const { rows } = result;
            }).catch(err => {
                console.error(err)
                res.json(err)
            })
        })
    })
});

module.exports = router
export {}