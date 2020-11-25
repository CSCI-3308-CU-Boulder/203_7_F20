const Router = require('express-promise-router')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
// router.post('/', (req, res) => {
//     res.send('test')
// })

// "/loggedIn/"
router.get('/', function(req, res){
    if (req.isAuthenticated()) {
        res.json({
            loggedIn: true,
            user: req.user
        })
    } else {
        res.json({
            loggedIn: false,
            user: null
        })
    }
});

module.exports = router
export {}
