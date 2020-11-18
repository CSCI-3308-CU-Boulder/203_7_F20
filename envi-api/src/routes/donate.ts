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
// const dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'envi_db',
// 	user: 'postgres',
// 	password: 'pwd'
// };

router.post('/', function(req, res) {
    var donationID = req.body.donate_id;
    var companyID = req.body.company_id;
    var userID = req.body.user_id;
    var amount = req.body.donate_amount;
    var message = req.body.donate_message;
    var updateQuery = `INSERT INTO donations (donation_id, id, company_id, amount, message) VALUES ('${donationID}', '${userID}', '${companyID}', '${amount}', '${message}') )`;
    query(updateQuery, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

module.exports = router
export {}