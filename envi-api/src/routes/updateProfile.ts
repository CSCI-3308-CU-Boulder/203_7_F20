import { createConnection } from "net";

const Router = require('express-promise-router');
const query = require('../db');
var pgp = require('pg-promise')();

const router = new Router();
var app = express();

// connecting to local database for now
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'envi_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// change user details for the given user id
router.post('/users/:username/updateInfo', function(req, res) {
    var newUsername = req.body.modal_username;
    var newName = req.body.modal_name;
    var newImage = req.body.modal_image_id;
    var newEmail = req.body.defaultForm_email;
    var updateQuery = "UPDATE users SET username =?, name = ?, image_id =?, email =? WHERE username =?";
    db.query(updateQuery, [newUsername, newName, newImage, newEmail, req.params], function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})