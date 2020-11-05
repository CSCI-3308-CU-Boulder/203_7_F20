const Router = require('express-promise-router')
const query = require('../db')
var pgp = require('pg-promise')();

const router = new Router()
const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'envi_db',
	user: 'postgres',
	password: 'pwd'
};

router.get('/username/:completeTasks', async (req, res) =>
{
    var actionsID = req.query.action_id; //example name
    var actionName = req.query.taskName;
    var actionDescript = req.query.taskDescription;
    var update = `INSERT INTO action_list (action_id, action_name, action_description) VALUES ('${actionsID}', '${actionName}' '${actionDescript}')`;
    db.query(update, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})
var db = pgp(dbConfig);
module.exports = router
export {}