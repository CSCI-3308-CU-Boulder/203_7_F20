var exFriendAch = [
    //hardcoded user achievements
    {
        username: "samuelmast",
        name: "Demo Achievement 1",
        description: "demo description text 1",
        image: "../assets/flatirons.png",
    },
    {
        username: "brianmayers",
        name: "Demo Achievement 2",
        description: "demo description text 2",
        image: "../assets/mountains.png",
    },
    {
        username: "rebeccacoryell",
        name: "Demo Achievement 3",
        description: "demo description text 3",
        image: "../assets/ice.jpg",
    },
];

var exFriends = [
    {
        username: "matthewteta",
        name: "Matthew Teta",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "sarahzendle",
        name: "Sarah Zendle",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "charliekoepke",
        name: "Charlie Koepke",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "lakshyajaishankar",
        name: "Lakshya Jaishankar",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "rebeccacoryell",
        name: "Rebecca Coryell",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "brianmayers",
        name: "Brian Mayers",
        image: "../assets/profile_pic_placeholder.gif"
    },
    {
        username: "samuelmast",
        name: "Samuel Mast",
        image: "../assets/profile_pic_placeholder.gif"
    }
]

function createAchievement(friendAch) {
    //builds string to insert card into html
    var cardStr =
        `<div class="card mb-3 theme-light rounded-all" style = "max-width: 540px; border: none" >
    <div class="row no-gutters">
            <div class="col-md-2 d-flex align-items-center">
                <img src="${friendAch.image}" style="width: 75px; border-radius: 50%; margin-left: 10px"
                class="card-img" alt="">
            </div>
            <div class="col-md-10 d-flex align-items-center">
                <div class="card-body">
                <p class="card-text"> <b> ${friendAch.username} </b> completed the ${friendAch.name} achievement!</p>
                </div> </div> </div> </div >`;
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
    //$('#friend_achievements').html(achContent)
}

function createFriend(friend) {

    var cardStr =
        `<div class="card mb-3 theme-dark" style = "max-width: 540px; max-height: 50px; border: none; border-radius: calc(3rem - 1px)" >
    <div class="row no-gutters">
            <div class="col-md-1 d-flex align-items-center">
                <img src="${friend.image}" style="width: 40px; border-radius: 50%; margin-left: 5px"
                class="card-img" alt="">
            </div>
            <div class="col-md-11">
                <div class="card-body">
                <p class="card-text"> <b> ${friend.name} </b> ${friend.username}</p>
                </div> </div> </div> </div >`;

    return cardStr;
}

function friendsList(friendArr) {
    var friends = "";
    for (i = 0; i < friendArr.length; i++) {
        var cardContent = createFriend(friendArr[i]);
        friends += cardContent;
    }
    document.getElementById("friends").innerHTML = friends;
}

function loadExampleFriends() {
    buildFeed(exFriendAch);
    friendsList(exFriends);
}
