var baseUrl = 'http://localhost:5000'

var exAch = [
  //hardcoded user achievements
  {
    name: "Demo Achievement 1",
    description: "demo description text 1",
    image: "../assets/flatirons.png",
    image_id: 9
  },
  {
    name: "Demo Achievement 2",
    description: "demo description text 2",
    image: "../assets/mountains.png",
    image_id: 8
  },
  {
    name: "Demo Achievement 3",
    description: "demo description text 3",
    image: "../assets/ice.jpg",
    image_id: 7
  },
];

var exUser = {
  username: "username",
  name: "Example User",
  // num_bottles: 1,
  impact_points: 0,
  achievements: exAch,
  image_id: 2,
};

var images = [
  "../assets/colorEarth.jpg",
  "../assets/recycling.jpeg",
  "../assets/environmentalist.jpg",
  "../assets/flatirons.png",
  "../assets/flowers.jpg",
  "../assets/hydroflask.jpg",
  "../assets/ice.jpg",
  "../assets/mountains.png",
  "../assets/plant.jpg",
  "../assets/flatirons.png",
];

var achievementImages = [
  "../assets/colorEarth.jpg",
  "../assets/recycling.jpeg",
  "../assets/environmentalist.jpg",
  "../assets/flatirons.png",
  "../assets/flowers.jpg",
  "../assets/hydroflask.jpg",
  "../assets/ice.jpg",
  "../assets/mountains.png",
  "../assets/plant.jpg",
  "../assets/flatirons.png",
];

function createAchievement(ach) {
  //builds string to insert card into html
  console.log("CreateAchievement Name: ");
  console.log(ach.name);
  var cardStr =
    '<div class = "card flex-row flex-wrap theme-light" style="border: hidden; margin-bottom: 10px; border-radius: calc(0.75rem - 1px)">\
    <div class="card-header" style="background-color: transparent; padding-top: 0.5rem;\
    padding-right: 0.25rem;\
    padding-bottom: 0rem;\
    padding-left: 0.75rem;">\
      <img style="width: 75px; border-radius:50%" src="' +
    achievementImages[ach.image_id] +
    '" alt="" />\
    </div>\
    <div class="card-block px-2 bac">\
      <p class="card-title" style="padding-top: 12px"> <b>' +
    ach.name +
    "</b> </br>" +
    ach.description +
    '</p>\
    </div>\
    <div class="w-100"></div>\
    </div>';
  return cardStr;
}

function displayAchievements(achievements) {
  //builds container with dynamic amount of cards depending on user data
  console.log(achievements);
  var achContent = '</br> <div class="custom-header"> My Achievements </div> ';
  for (i = 0; i < achievements.length; i++) {
    var cardContent = createAchievement(achievements[i]);
    achContent += cardContent;
  }

  document.getElementById("achievements").innerHTML = achContent;
}

function displayPicture(user) {
  var pic_string = `<img
    id="profile-pic"
    width="500"
    src="${images[user.image_id]}"
    class="userimg"
  />`;
  console.log(pic_string);

  document.getElementById("profile_picture").innerHTML = pic_string;
}

function displayInfo(user) {
  document.getElementById("username").innerHTML = user.username;
  // document.getElementById("level").innerHTML =
  //   "Level: " + (Math.floor(user.num_bottles / 5) + 1);
  // document.getElementById("bottles_filled").innerHTML =
  //   "Bottles Filled: " + user.num_bottles;
  document.getElementById("impact_points").innerHTML =
    "Impact Points: " + user.impact_points;
  document.getElementById("name").innerHTML = user.name;
  // document.getElementById("modal_name").innerHTML;
}


function loadProfile() {
  loggedIn()
    .then(user => {
      console.log(user)
      loadLogoutModal(user)
      if (user) {
        let username = user.username;
        //LOAD PAGE HERE
        axios
          .get(baseUrl + "/api/users/" + username)
          .then(function (response) {
            // handle success
            let user = response.data;
            console.log(user);
            //display info from user doc
            displayPicture(user);
            displayInfo(user);
            axios
              .get(baseUrl + "/api/users/" + username + "/getAchievements")
              .then(function (results) {
                // get user achievements array
                console.log("achievements");
                console.log(results.data.achievements);
                displayAchievements(results.data.achievements);
              })
              .catch(function (error) {
                displayAchievements(exAch);
                console.log(error);
              })
          })
          .catch(function (error) {
            loadExampleUser();
            // handle error
            console.log(error);
          });
      }
      else {
        alert("you are not logged in !")
      }

    })
    .catch(error => {
      console.log(error)
    })
}


function loadExampleUser() {
  //RUN HARDCODED EXAMPLE (NO SERVER CALL)
  //comment out above code and uncomment this section to see example
  displayPicture(exUser);
  displayAchievements(exAch);
  displayInfo(exUser);
}


// $(document).ready(function () {
//   loadProfile()
// })
