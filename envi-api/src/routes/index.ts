// ./routes/index.js
const login = require('./login')
const signup = require('./signup')
const users = require('./user')


module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Envi-api');
    })
    app.use('/login', login)
    app.use('/signup', signup)
    app.use('/users', users)
    // etc..
}
