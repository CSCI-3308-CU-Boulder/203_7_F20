const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mountRoutes = require('./routes')
const passport = require('passport')
const query = require('./db')
const session = require('express-session')
// pool = connection_pool



require('./config/passport')(passport, query)

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize())
app.use(passport.session())

mountRoutes(app)
app.use('/', express.static(path.join(__dirname, 'public')))

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export { }
