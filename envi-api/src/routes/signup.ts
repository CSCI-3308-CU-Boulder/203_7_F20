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
    const { username, password, firstname, lastname, email, image_id, birthday } = req.body
    if (!username || !password || !firstname || !lastname || !email) {
        res.status(401).send("Invalid user input")
        return null
    }

    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash)
            query('INSERT INTO users(username, password, firstname, lastname, email, image_id, birthday) VALUES ($1, $2, $3, $4, $5, $6, $7)', [username, hash, firstname, lastname, email, parseInt(image_id), birthday || null])
            .then(result => {
                req.json(result)
            }).catch(err => res.send(err))
        })
    })
});

module.exports = router
export {}