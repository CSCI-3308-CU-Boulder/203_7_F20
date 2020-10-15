var exAch = [
  //hardcoded user achievements
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

var exUser = {
  username: "username",
  firstname: "Example",
  lastname: "User",
  level: 1,
  achievements: exAch,
  image_id: 3,
  bottles_filled: 30,
};

var images = [
  "./assets/colorEarth.jpg",
  "./assets/envi.png",
  "./assets/environmentalist.jpg",
  "./assets/flatirons.png",
  "./assets/flowers.jpg",
  "./assets/hydroflask.jpg",
  "./assets/ice.jpg",
  "./assets/mountains.png",
  "./assets/plant.jpg",
  "./assets/recycling.jpeg",
];

function createAchievement(ach) {
  //builds string to insert card into html
  var cardStr =
    '<div class = "card flex-row flex-wrap">\
    <div class="card-header border-0">\
      <img src="' +
    ach.image +
    '" width="50" alt="" />\
    </div>\
    <div class="card-block px-2">\
      <h5 class="card-title">' +
    ach.name +
    '</h5>\
      <p class="card-text">' +
    ach.description +
    '</p>\
    </div>\
    <div class="w-100"></div>\
    </div>';
  return cardStr;
}

function displayAchievements(user) {
  //builds container with dynamic amount of cards depending on user data
  var achContent = "<h3> My Achievements </h3>  ";
  for (i = 0; i < user.achievements.length; i++) {
    var cardContent = createAchievement(user.achievements[i]);
    achContent += cardContent;
  }

  document.getElementById("achievements").innerHTML = achContent;
}

function displayPicture(user) {
  var pic_string = `<img
    id="profile-pic"
    width="500"
    src="${images[user.image_id]}"
  />`;
  console.log(pic_string);

  document.getElementById("profile_picture").innerHTML = pic_string;
}

function displayInfo(user) {
  document.getElementById("username").innerHTML = user.username;
  document.getElementById("level").innerHTML = "Level: " + user.level;
  document.getElementById("name").innerHTML =
    user.firstname + " " + user.lastname;
}

function loadProfile() {
  //get user data from test server
  /*
  axios
    .get("http://localhost:5000/achievementsTest")
    .then(function (response) {
      // handle success
      console.log(response);
      var user = response.data;
      displayPicture(user);
      displayAchievements(user);
      displayInfo(user);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    */

  //RUN HARDCODED EXAMPLE (NO SERVER CALL)
  //comment out above code and uncomment this section to see example
  displayPicture(exUser);
  displayAchievements(exUser);
  displayInfo(exUser);
}
