var exFriendAch = [
    //hardcoded user achievements
    {
        username: "myfriend1",
        name: "Demo Achievement 1",
        description: "demo description text 1",
        image: "../assets/flatirons.png",
    },
    {
        username: "myfriend2",
        name: "Demo Achievement 2",
        description: "demo description text 2",
        image: "../assets/mountains.png",
    },
    {
        username: "myfriend3",
        name: "Demo Achievement 3",
        description: "demo description text 3",
        image: "../assets/ice.jpg",
    },
];

// Every 5 levels you get an acheivement

var exFriends = [
    {
        username: "myfriend1",
        name: "Friend 1",
        image: "../assets/flatirons.png",
        level: 5,
        bottle_filled: 25,
        acheivements: 1,
    },
    {
        username: "myfriend2",
        name: "Friend 2",
        image: "../assets/mountains.png",
        level: 10,
        bottle_filled: 50,
        acheivements: 2,
    },
    {
        username: "myfriend3",
        name: "Friend 3",
        image: "../assets/ice.jpg",
        level: 5,
        bottle_filled: 28,
        acheivements: 1,
    },
]

function createAchievement(friendAch, i) {
    //builds string to insert card into html
    // var v = true;
    // var count = 0;
    var cardStr =
        '<div class = "card flex-row flex-wrap theme-light" style="border: hidden; margin-bottom: 10px; border-radius: calc(0.75rem - 1px)">\
      <div class="card-header" style="background-color: transparent; padding-top: 0.5rem;\
      padding-right: 0.25rem;\
      padding-bottom: 0rem;\
      padding-left: 0.75rem;">\
        <img style="width: 75px; border-radius:50%" src="' +
        friendAch.image +
        '" alt="" />\
      </div>\
      <div class="card-block px-2 bac">\
        <p class="card-title" style="padding-top: 12px"> <b onclick="friendProfile(' + i + ')" data-toggle="modal" data-target="#friendProfile">' + friendAch.username + "</b> has completed the " +
        friendAch.name +
        " achievement! " +
        //friendAch.description +
        '</p>\
      </div>\
      <div class="w-100"></div>\
      </div>';
    return cardStr;
}

function buildFeed(achArr) {
    //builds container with dynamic amount of cards depending on user data
    var achContent = '<div class="custom-header"> Recent Activity </div> ';
    for (i = 0; i < achArr.length; i++) {
        var cardContent = createAchievement(achArr[i], i);
        achContent += cardContent;
    }

    document.getElementById("friend_achievements").innerHTML = achContent;
}

function createFriend(friend) {
    var cardStr = "hey"
}

function loadExampleFriends() {
    buildFeed(exFriendAch);
}

function friendProfile(index) {
  document.getElementById("showName").innerHTML = exFriends[index].name;
  document.getElementById("level").innerHTML =exFriends[index].level;
  document.getElementById("bottles").innerHTML = exFriends[index].bottle_filled;
  document.getElementById("acheivements").innerHTML = exFriends[index].acheivements;
}
