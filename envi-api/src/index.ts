const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
let pool = require('./config')
// pool = connection_pool

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

pool.connect((err, client, done) => {
  if (err) throw err
  const getBooks = (req, res) => {
    client.query('SELECT * FROM books', (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).json(results.rows)
    })
  }
  
  const addBook = (req, res) => {
    const {author, title} = req.body
    
    pool.query(
      'INSERT INTO books (author, title) VALUES ($1, $2)',
      [author, title],
      (err) => {
        if (err) {
          throw err
        }
        res.status(201).json({status: 'success', message: 'Book added.'})
      },
      )
    }
    
    app.route('/books')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook)
    
    // Start server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
})

