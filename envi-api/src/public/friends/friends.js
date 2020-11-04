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

var exFriends = [
    {
        username: "myfriend1",
        name: "Friend 1",
        image: "../assets/"
    }
]

function createAchievement(friendAch) {
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
        <p class="card-title" style="padding-top: 12px"> <b>' + friendAch.username + "</b> has completed the " +
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
        var cardContent = createAchievement(achArr[i]);
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