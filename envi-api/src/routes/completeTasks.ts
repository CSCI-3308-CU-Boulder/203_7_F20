const Router = require('express-promise-router')
const query = require('../db')
const { ensureAuthenticated } = require('../config/auth');

const router = new Router()


router.post('/username/:completeTasks', async (req, res) =>
{
    //var actionsID = req.body.action_id; Handled in database
    var actionName = req.body.taskName;
    var actionDescript = req.body.taskDescription;
    var update = `INSERT INTO task_list (task_name, task_description) VALUES ('${actionName}' '${actionDescript}')`;
    query(update, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

module.exports = router
export {}