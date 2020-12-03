/**
 * TO DO:
 * Add function to display friends from database
 */

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
        image_id: 1
    },
    {
        username: "sarahzendle",
        name: "Sarah Zendle",
        image_id: 3
    },
    {
        username: "charliekoepke",
        name: "Charlie Koepke",
        image_id: 3
    },
    {
        username: "lakshyajaishankar",
        name: "Lakshya Jaishankar",
        image_id: 3
    },
    {
        username: "rebeccacoryell",
        name: "Rebecca Coryell",
        image_id: 3
    },
    {
        username: "brianmayers",
        name: "Brian Mayers",
        image: 3
    },
    {
        username: "samuelmast",
        name: "Samuel Mast",
        image_id: 3
    }
]

var exUser = {
    username: 'username',
    name: 'Example User',
    image_id: 1
}

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

function getUser(friendId) { // friendId is an object containing the id of the user you want, to get the users username
    var friendUsername;
    axios.get('/api/users/' + friendId.id + '/getUser', friendId)
        .then(function (userRes) {
            // console.log(userRes)
            friendUsername = userRes.data.username;
            console.log("Username: " + friendUsername);
            return friendUsername;
        })
        .catch(function (error) {
            friendUsername = "Unknown";
            console.log(error);
            return friendUsername;
        })
}

function createAchievement(friendAch) {
    // var friendName = "Unknown User"
    console.log("createAchievement Ach: ")
    console.log(friendAch)
    var friendId = { "id": friendAch.user_id };

    // getUser route not working
    // var friendUsername = getUser(friendId);
    // console.log("createAchievement FriendUsername: ")
    // console.log(friendUsername);

    // axios.get('/api/users/' +friendId.id+ '/getUser', friendId)
    // .then(function (userRes) {
    //     // console.log(userRes)
    //     friendUsername = userRes.data.username;
    //     console.log("Username: " + friendUsername);
    // })
    // .catch(function (error) {
    //     friendUsername = "Unknown";
    //     console.log(error);
    // })

    //builds string to insert card into html
    var cardStr =
        `<div class="card mb-3 theme-light rounded-all" style = "max-width: 540px; border: none" >
    <div class="row no-gutters">
            <div class="col-md-2 d-flex align-items-center">
                <img src="${achievementImages[friendAch.image_id || 0]}" style="width: 75px; border-radius: 50%; margin-left: 10px"
                class="card-img" alt="">
            </div>
            <div class="col-md-10 d-flex align-items-center">
                <div class="card-body">
                <p class="card-text"> <b> ` + friendAch.username + `</b> completed the ${friendAch.name} achievement!</p>
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
                <img src="${images[friend.image_id || 0]}" style="width: 40px; border-radius: 50%; margin-left: 10px; margin-bottom: 12px"
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
    $(document).ready(function () {
        loadLogoutModal(exUser);
    })
}

var user = null; //global user variable
var friends = null; //global friends variable

function loadFriends() {
    //get cookie
    // var username = Cookies.get('username');
    // console.log("username cookie: " + username);
    loggedIn()
        .then(user => {
            console.log(user)
            loadLogoutModal(user)
            if (user) {
                let username = user.username;
                axios //get friends
                    .get("/api/users/" + username + "/getFriends")
                    .then((friendsRes) => {
                        friends = friendsRes.data.friends;
                        console.log(friends);
                        friendsList(friends);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                axios // load achievements
                    .get("/api/users/" + username + "/getFriendAchievements")
                    .then((friendAchRes) => {
                        let friendsAch = friendAchRes.data.friends;
                        console.log("build feed: ")
                        console.log(friendAchRes.data.friends);
                        buildFeed(friendsAch);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            else {
                alert("you are not logged in !")
            }

        })
        .catch(error => {
            console.log(error)
        })

    // axios //get user doc
    //     .get("/api/users/" + username)
    //     .then((response) => {
    //         // handle success
    //         let user = response.data;
    //         console.log(user);

    // })
    // .catch(function (error) {
    //     loadExampleFriends();
    //     // handle error
    //     console.log(error);
    // });
}

/*
var exAddFriends = [
    {
        username: "suryakanoria",
        name: "Surya Kanoria",
    },
    {
        username: "friend1",
        name: "Example Friend 1",
    },
    {
        username: "friend2",
        name: "Example Friend 2",
    },
]

// Load new friends into the add friends modal

function createAddFriend(friend) {
    var listStr = `<li class='friends' onclick=''> ${friend.username} </li>`;
    return listStr;
}

function addFriendsList(friendArr) {
    var friends = "";
    for (i = 0; i < friendArr.length; i++) {
        var cardContent = createAddFriend(friendArr[i]);
        friends += cardContent;
    }
    document.getElementById("friendsList").innerHTML = friends;
}

function loadAddFriends() {
    addFriendsList(exAddFriends);
}
*/
function addFriend() {
    //get friend username from js event
    var toAdd = event.target.id;
    loggedIn()
        .then(user => {

            console.log("adding " + toAdd);
            console.log(user)
            //get current user from cookie
            //update html
            if (user && toAdd) {
                document.getElementById(toAdd).innerHTML = "";
                //post new friend to db
                axios
                    .post(`/api/users/${user.username}/addFriend/${toAdd}`)
                    .then(function (response) {
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                loadFriends();
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function createSearchCard(user) {
    var cardStr = `
    <div class="card mb-3 theme-dark"
        style="max-width: 540px; max-height: 50px; border: none; border-radius: calc(3rem - 1px); margin-top: 10px">
        <div class="row no-gutters">
            <div class="col-md-1">
            <img src="${images[user.image_id || 0]}"
                style="width: 40px; border-radius: 50%; margin-top: 8px; margin-left: 10px" class="card-img" alt="">
            </div>
            <div class="col-md-10" style="align-items: center;">
            <div class="card-body">
                <h5 class="card-text"> <b> ${user.name} </b> ${user.username} </h5>
            </div>
            </div>

            <div class="col-md-1">
            <h3 id="${user.username}" onClick = "addFriend()" style="margin-top: 8px; margin-right: 5px">+</h3>
            </div>
        </div>
    </div>`

    return cardStr;
}

function isFriend(username, list) {//helper function to check if object is in a list
    //console.log("checking if " + username + " is in friends list")
    for (var i = 0; i < list.length; i++) {
        if (list[i].username == username) {
            //console.log(username + " is in list!");
            return true;
        }
    }
    return false;
}

function listResults(users, friends) {//insert search results into html
    var listStr = "";
    if (users) {
        for (var i = 0; i < users.length; i++) {
            if (!(isFriend(users[i].username, friends))) //filter out user's current friends
                listStr += createSearchCard(users[i]);
        }
    }
    document.getElementById("search_results").innerHTML = listStr;
}

function searchBar() {
    let input = document.getElementById("searchBar").value;
    input = input.toLowerCase();
    axios
        .get(`/api/search?term=${input}`)
        .then(function (response) {
            let searchResults = response.data.results;
            console.log(searchResults)
            listResults(searchResults, friends)
        })
        .catch(function (error) {
            console.log(error);
        })
}


