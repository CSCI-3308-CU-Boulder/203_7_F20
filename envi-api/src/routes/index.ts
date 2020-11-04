// ./routes/index.js
const login = require('./login')
const signup = require('./signup')
const users = require('./users')
const donate = require('./donate')


module.exports = app => {
    app.get('/api/', (req, res) => {
        res.send('Envi-api');
    })
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/users', users)
    app.use('/api/donate', donate)
    // etc..
}
export {}
