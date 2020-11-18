const Router = require('express-promise-router')
const query = require('../db')
const { ensureAuthenticated } = require('../config/auth');

const router = new Router()

router.use('/id:')

router.post('/username/:completeTasks', async (req, res) =>
{
    var actionsID = req.body.action_id; //example name
    var actionName = req.body.taskName;
    var actionDescript = req.body.taskDescription;
    var update = `INSERT INTO task_list (task_id, task_name, task_description) VALUES ('${actionsID}', '${actionName}' '${actionDescript}')`;
    query(update, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

module.exports = router
export {}