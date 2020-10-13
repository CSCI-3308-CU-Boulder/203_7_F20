const Router = require('express-promise-router')
const query = require('../db')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

// Begin by setting up local login with postgres db
passport.use(new LocalStrategy(
    (username, password, done) => {
        query('SELECT * FROM users WHERE username=$1', [username], (err, results) => {
            console.log("err");
            if (err) {
                console.error(err)
                return done(err)
            }
            if (results.rows.length == 0) {
                err = "User not found"
                console.error(err)
                return done(err)
            }
            const user = results.rows[0];
            bcrypt.compare(password, user.password, function(err, res) {
                
                if(err) {
                    console.error(err)
                    done(err)
                } else if (res) {
                    done(null, { id: user.id, username: user.username })
                }
            })
        })
    }
    ));
    
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    query('SELECT id, username FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
        if(err) {
            console.error('Error when selecting user on session deserialize', err)
            return done(err)
        }
        
        done(null, results.rows[0])
    })
})

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
    next()
}, function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        res.send("update plz")
      }

      res.status(401).send(info);
    })(req, res);
});

module.exports = router
export {}