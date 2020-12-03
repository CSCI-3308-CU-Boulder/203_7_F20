require('dotenv').config()
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
console.log(isProduction ? process.env.DATABASE_URL : connectionString)

let sslMode = isProduction ? { sslmode: "require", rejectUnauthorized: false } : false

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: sslMode
})

// // the pool will emit an error on behalf of any idle clients
// // it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// })

const query = (text: String, params: any) => pool.query(text, params)

module.exports = query;
export {}