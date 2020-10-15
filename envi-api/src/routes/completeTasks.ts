const Router = require('express-promise-router')
const query = require('../db')

const router = new Router

router.get('/username/:completeTasks', async (req, res) =>
{
    const {achievment} = req.params
    console.log(query)
    const {rows} = await query('SELECT achievments_id FROM achievments_list')
    res.send(rows)
})

module.exports = router
export {}