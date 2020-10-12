const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let pool = require("./config");
// pool = connection_pool

const app = express();
/*
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

pool.connect((err, client, done) => {
  if (err) throw err;
  const getBooks = (req, res) => {
    client.query("SELECT * FROM books", (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
  };

  const addBook = (req, res) => {
    const { author, title } = req.body;

    pool.query(
      "INSERT INTO books (author, title) VALUES ($1, $2)",
      [author, title],
      (err) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ status: "success", message: "Book added." });
      }
    );
  };

  app.get("/user/:username", (req, res) => {
    res.send(`Username is ${req.params.username}`);
  });

  app.get("/achievementsTest", (req, res) => {
    const achievements = [
      {
        name: "Demo Achievement 1",
        description: "demo description text 1",
        image: "./assets/envi.png",
      },
      {
        name: "Demo Achievement 2",
        description: "demo description text 2",
        image: "./assets/envi.png",
      },
      {
        name: "Demo Achievement 3",
        description: "demo description text 3",
        image: "./assets/envi.png",
      },
    ];

    const exUser = {
      username: "username",
      userImg: "./assets/profile_pic_placeholder.gif",
      userLevel: 1,
      userAch: achievements,
    };

    res.json(exUser);
  });

  app
    .route("/books")
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook);

  // Start server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
