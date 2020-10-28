const Router = require('express-promise-router')
const query = require('../db')

const router = Router

//fetches a username from user id
router.get('/username', async (req, res) =>
{
    var user_id = req.query.id;
    var username_query = `select username from users where id='{user_id}'`;
})

module.exports = router
export {} 