const Router = require('express-promise-router')
const query = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(query);
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id])
    res.send(rows[0])
})
module.exports = router
export {}