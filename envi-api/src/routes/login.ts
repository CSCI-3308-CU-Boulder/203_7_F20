const Router = require('express-promise-router')
const passport = require('passport')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
// router.post('/', (req, res) => {
//     res.send('test')
// })

// "/login/"
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
        let { id, username, name, email, image_id, birthday, num_bottles, signupdate } = user;
        res.json({
          id,
          username,
          name,
          email,
          image_id,
          birthday,
          num_bottles,
          signupdate
        })
      }

      res.status(401).send(info);
    })(req, res);
});

module.exports = router
export {}