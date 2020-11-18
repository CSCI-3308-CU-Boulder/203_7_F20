// ./routes/index.js
const login = require('./login')
const logout = require('./logout')
const loggedIn = require('./loggedIn')
const signup = require('./signup')
const users = require('./users')
const donate = require('./donate')
const search = require('./search')


module.exports = app => {
    app.get('/api/', (req, res) => {
        res.send('Envi-api');
    })
    app.use('/api/login', login)
    app.use('/api/logout', logout)
    app.use('/api/loggedIn', loggedIn)
    app.use('/api/signup', signup)
    app.use('/api/users', users)
    app.use('/api/donate', donate)
    app.use('/api/search', search)
    // etc..
}
export {}
