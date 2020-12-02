var img_id = null;
var this_user = null;

function choosePicture() {
    //clear current selection
    for (var i = 0; i < 10; i++) {
        var elem = document.getElementById(i);
        elem.classList.remove("border");
        elem.classList.remove("border-primary");
    }

    //highlight new selection
    var chosen = event.target;
    console.log(chosen.id);
    if (chosen.nodeName == "IMG") {
        chosen.classList.add("border");
        chosen.classList.add("border-primary");
        img_id = chosen.id;
    }
}

function populateModal() {
    loggedIn()
        .then(user => {
            console.log(user)
            if (user) {
                //select current profile image
                this_user = user;
                img_id = user.image_id;
                document.getElementById(user.image_id).classList.add("border");
                document.getElementById(user.image_id).classList.add("border-primary");
                //fill fields with current user info
                document.getElementById("modal_name").value = user.name;
                document.getElementById("modal_username").value = user.username;
            }
            else {
                console.log("not logged in")
            }

        })
        .catch(error => {
            console.log(error)
        })
}

function usernameValid() {//checks if entered username is already in use
    //TODO:
    //check if username in modal field is already in user
    //disable submit button accordingly
    return true;
}

function updateProfileInfo() {
    //post new info to db
    if (this_user) {
        let username = this_user.username;
        var newInfo = {
            username: document.getElementById("modal_username").value,
            name: document.getElementById("modal_name").value,
            image_id: img_id,
            impact_points: this_user.impact_points
        }
        console.log(newInfo);
        //display new user info
        displayPicture(newInfo);
        displayInfo(newInfo);
        document.getElementById("logout_name").innerHTML = newInfo.name;
        axios.post(`/api/users/${username}/updateInfo`, newInfo)
            .then(function (response) {
                console.log(response)
            });
    }
    else {
        console.log("user not logged in")
    }
    $('#myModal').modal('hide')
}