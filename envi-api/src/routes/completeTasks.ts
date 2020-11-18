const Router = require('express-promise-router')
const query = require('../db')
const { ensureAuthenticated } = require('../config/auth');

const router = new Router()


router.post('/username/:completeTasks', async (req, res) =>
{
    //var actionsID = req.body.action_id; Handled in database
    var user_id = req.user.id;
    var actionName = req.body.taskName;
    var actionDescript = req.body.taskDescription;
    var taskType = req.body.type;
    var update = `INSERT INTO task_list (user_id, name, description, completed, type) VALUES ('${user_id}', ${actionName}', '${actionDescript}', TRUE, '${taskType}')`;
    query(update, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

module.exports = router
export {}