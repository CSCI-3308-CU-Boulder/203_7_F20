function homePage() {
    loggedIn()
        .then(user => {
            console.log(user)
            loadLogoutModal(user)
            if (user) {
                let username = user.username;
                //LOAD PAGE HERE
            }
            else {
                console.log("you are not logged in !")
            }

        })
        .catch(error => {
            console.log(error)
        })
}