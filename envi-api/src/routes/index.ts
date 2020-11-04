// ./routes/index.js
const login = require('./login')
const signup = require('./signup')
const users = require('./users')


module.exports = app => {
    // app.get('/', (req, res) => {
    //     res.send('Envi-api');
    // })
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/users', users)
    // etc..
}
