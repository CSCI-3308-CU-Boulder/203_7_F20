"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var Pool = require('pg').Pool;
var isProduction = process.env.NODE_ENV === 'production';
var connectionString = "postgresql://" + process.env.PGUSER + ":" + process.env.PGPASSWORD + "@" + process.env.PGHOST + ":" + process.env.PGPORT + "/" + process.env.PGDATABASE;
console.log(isProduction ? process.env.DATABASE_URL : connectionString);
var sslMode = isProduction ? { sslmode: "require", rejectUnauthorized: false } : false;
var pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: sslMode
});
// // the pool will emit an error on behalf of any idle clients
// // it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// })
var query = function (text, params) { return pool.query(text, params); };
module.exports = query;
