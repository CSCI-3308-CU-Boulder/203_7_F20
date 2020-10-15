const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
    userLevel: 1,
    userAch: achievements,
    image_id: 9,
  };

  res.json(exUser);
});

app.get("/sarahTest", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
