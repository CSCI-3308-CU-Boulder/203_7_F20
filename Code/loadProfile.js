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
  name: "Example User",
  num_bottles: 1,
  achievements: exAch,
  image_id: 3,
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
  var achContent = "</br> <h3> My Achievements </h3> ";
  for (i = 0; i < user.achievements.length; i++) {
    var cardContent = createAchievement(user.achievements[i]);
    achContent += "</br>";
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
  document.getElementById("level").innerHTML = "Level: " + (Math.floor(user.num_bottles / 5) + 1);
  document.getElementById("bottles_filled").innerHTML = "Bottles Filled: " + user.num_bottles;
  document.getElementById("name").innerHTML = user.name;
  // document.getElementById("modal_name").innerHTML;

}

function displayProfilePic(id)
{
  if (id == document.getElementById("1").id) {
    document.getElementById("profile-pic").src = "./assets/colorEarth.jpg";
  }
  if (id == document.getElementById("2").id) {
    document.getElementById("profile-pic").src = "./assets/envi.png";
  }
  if (id == document.getElementById("3").id) {
    document.getElementById("profile-pic").src = "./assets/environmentalist.jpg";
  }
  if (id == document.getElementById("4").id) {
    document.getElementById("profile-pic").src = "./assets/flatirons.png";
  }
  if (id == document.getElementById("5").id) {
    document.getElementById("profile-pic").src = "./assets/flowers.jpg";
  }
  if (id == document.getElementById("6").id) {
    document.getElementById("profile-pic").src = "./assets/hydroflask.jpg";
  }
  if (id == document.getElementById("7").id) {
    document.getElementById("profile-pic").src = "./assets/ice.jpg";
  }
  if (id == document.getElementById("8").id) {
    document.getElementById("profile-pic").src = "./assets/mountains.png";
  }
  if (id == document.getElementById("9").id) {
    document.getElementById("profile-pic").src = "./assets/plant.jpg";
  }
  if (id == document.getElementById("10").id) {
    document.getElementById("profile-pic").src = "./assets/recycling.jpeg";
  }
}

function updateInfo() {
  if (document.getElementById("modal_name").innerHTML != document.getElementById("name")) {
    document.getElementById("name").innerHTML = document.getElementById("modal_name").value;
  }

  if (document.getElementById("modal_username").innerHTML != document.getElementById("username")) {
    document.getElementById("username").innerHTML = document.getElementById("modal_username").value;
  }
}

function onClick() {
  updateProfile();
  displayInfo(user);
}

function loadProfile() {

  // get user data from test server
  if (document.cookie.length > 0) {
    // Get username from cookie
    let username = document.cookie.split(';')[0].split('=')[1]
    axios
    .get("http://localhost:5000/users/" + username)
    .then(function (response) {
      // handle success
      console.log(response);
      var user = response.data;
      displayPicture(user);
      displayAchievements(user);
      displayInfo(user);
    })
    .catch(function (error) {
      loadExampleUser()
      // handle error
      console.log(error);
    })
  } else {
    loadExampleUser()
  }
}

function loadExampleUser() {
  //RUN HARDCODED EXAMPLE (NO SERVER CALL)
  //comment out above code and uncomment this section to see example
  displayPicture(exUser);
  displayAchievements(exUser);
  displayInfo(exUser);
}

