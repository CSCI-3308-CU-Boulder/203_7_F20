"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express-promise-router');
var query = require('../db');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
var router = new Router();
// Searches users for ?term
// '/search?term='
router.get('/', function (req, res) {
    var term = req.query.term;
    if (!term || term == "")
        return res.json({ err: "No search term provided" });
    // SELECT from db using search term and regex
    query("SELECT *, regexp_matches(username, '(" + term + ")', 'gi') FROM users LIMIT 25;")
        .then(function (result) {
        var rows = result.rows;
        res.json({ success: true, results: rows });
    }).catch(function (err) {
        console.error(err);
        res.json(err);
    });
});
module.exports = router;
