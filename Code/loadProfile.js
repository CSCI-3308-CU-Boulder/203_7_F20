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
  userImg: "./assets/profile_pic_placeholder.gif",
  userLevel: 1,
  userAch: exAch,
};

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
  var containerContent = "<h3> My Achievements </h3>  ";
  for (i = 0; i < user.userAch.length; i++) {
    var cardContent = createAchievement(user.userAch[i]);
    containerContent += cardContent;
  }
  var container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = containerContent;

  var here = document.getElementById("achievements");
  here.appendChild(container);
}

function displayPicture(user) {
  var pic_string = `<img
    id="profile-pic"
    width="500"
    src="${user.userImg}"
  />`;
  console.log(pic_string);

  document.getElementById("profile_picture").innerHTML = pic_string;
}

function displayInfo(user) {
  document.getElementById("username").innerHTML = user.username;
  document.getElementById("level").innerHTML = "Level: " + user.userLevel;
}

function loadProfile() {
  //get user data from test server
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

  /*
    //RUN HARDCODED EXAMPLE (NO SERVER CALL)
    //comment out above code and uncomment this section to see example
    displayPicture(exUser);
    displayAchievements(exUser);
    displayInfo(exUser);
    */
}
