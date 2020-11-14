const Router = require('express-promise-router')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
// router.post('/', (req, res) => {
//     res.send('test')
// })

// "/logout/"
router.get('/', function(req, res){
    req.logout();
    res.json({ success: true })
});

module.exports = router
export {}
