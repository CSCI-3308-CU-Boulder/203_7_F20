const Router = require('express-promise-router')
const query = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// get companies
// get donations
// post donate
// donations by user
// donation totals by user

module.exports = router
export {}