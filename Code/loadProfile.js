//some hardcoded achievements to demonstrate functionality:
/*
axios
  .get("/user?ID=12345")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  */

var achievements = [
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

var exAch = [0, 2, 1]; //hardcoded user data - an array of achievement keys

var exUser = {
  username: "username",
  userImg: "./assets/profile_pic_placeholder.gif",
  userLevel: 1,
  userAch: exAch,
};

class achievement {
  constructor(achId) {
    this.name = achievements[achId].name;
    this.description = achievements[achId].description;
    this.image = achievements[achId].image;
  }
}

function createAchievement(achId) {
  //builds string to insert card into html
  var ach = new achievement(achId);
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

function displayAchievements() {
  //builds container with dynamic amount of cards depending on user data
  var containerContent = "<h3> My Achievements </h3>  ";
  for (i = 0; i < exUser.userAch.length; i++) {
    var cardContent = createAchievement(exUser.userAch[i]);
    containerContent += cardContent;
  }
  var container = document.createElement("div");
  container.classList.add("container");
  // container.classList.add("");
  container.innerHTML = containerContent;

  var here = document.getElementById("ach");
  here.appendChild(container);
}

function displayPicture() {
  var pic_string = `<img
    id="profile-pic"
    width="500"
    src="${exUser.userImg}"
  />`;
  console.log(pic_string);

  //$("#profile_picture.card-body").appendTo(pic_string);

  document.getElementById("profile_picture").innerHTML = pic_string;
}

function displayInfo() {
  document.getElementById("username").innerHTML = exUser.username;
  document.getElementById("level").innerHTML = "Level: " + exUser.userLevel;
}

function loadProfile() {
  displayPicture();
  displayAchievements();
  displayInfo();
}
