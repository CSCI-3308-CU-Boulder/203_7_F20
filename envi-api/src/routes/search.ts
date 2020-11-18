const Router = require('express-promise-router')
const query = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// Searches users for ?term
// '/search?term='
router.get('/', (req, res) => {
    let { term } = req.query
    if (!term || term == "") return res.json({ err: "No search term provided" })
    // SELECT from db using search term and regex
    query(`SELECT *, regexp_matches(username, '(${term})', 'gi') FROM users LIMIT 25;`)
    .then(result => {
        const { rows } = result;
        res.json({ success: true, results: rows });
    }).catch(err => {
        console.error(err)
        res.json(err)
    })
})

module.exports = router
export {}