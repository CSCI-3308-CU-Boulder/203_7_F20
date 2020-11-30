function loadDonate() {
    loggedIn()
        .then(user => {
            console.log(user)
            loadLogoutModal(user)
            if (user) {
                let username = user.username;
                //LOAD PAGE HERE
            }
            else {
                alert("you are not logged in !")
            }

        })
        .catch(error => {
            console.log(error)
        })
}