/*

input: username and/or user id
returns an array of objects:
    data = [
        {
            username (string),
            name (string),
            image_id (int),
            level (int)
        },
        etc.
    ]


*/

const Router = require('express-promise-router')
const query = require('../db')
const { ensureAuthenticated } = require('../config/auth');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()



