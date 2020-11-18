let loggedInUrl = "/api/loggedIn/"
let loginUrl = "/api/login/"
let logoutUrl = "/api/logout/"

function loggedIn() {
    //function to check if user is logged in
    axios.get(loggedInUrl)
        .then(response => {
            if (response.data) {
                console.log(response.data)
                let { loggedIn } = response.data
                if (loggedIn) {
                    console.log("User already logged in!")
                    return true;
                } else {
                    console.log("No login")
                    return false;
                }
            }
        }).catch(err => {
            console.error(err)
        })
}

export { loggedIn }