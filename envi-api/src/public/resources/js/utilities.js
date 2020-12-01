let loggedInUrl = "/api/loggedIn/"
let loginUrl = "/api/login/"
let logoutUrl = "/api/logout/"

var currentUser = null

//function to check if user is logged in
let loggedIn = () => new Promise((resolve, reject) => {
    // Axios call here
    axios.get('/api/loggedIn/')
        .then(response => {
            if (response.data) {
                console.log(response.data)
                let { loggedIn, user } = response.data
                if (loggedIn) {
                    console.log("User already logged in!")
                    currentUser = user
                    resolve(user);
                } else {
                    console.log("No login")
                    currentUser = null
                    resolve(null);
                }
            }
        }).catch(err => {
            console.error(err)
        })
})

/*
//skeleton to load page using loggedIn promise to get user doc
//copy this into any page and add loading functionality where indicated
function LOAD_FUNCTION_SKELETON() {
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
*/

var images = [
    "../assets/colorEarth.jpg",
    "../assets/water_bottleProfile.jpg",
    "../assets/environmentalist.jpg",
    "../assets/flatirons.png",
    "../assets/flowers.jpg",
    "../assets/hydroflask.jpg",
    "../assets/ice.jpg",
    "../assets/mountains.png",
    "../assets/plant.jpg",
    "../assets/recycling.jpeg",
];

var waterBottle = [
    "../assets/water_bottle/lvl0.jpg",
    "../assets/water_bottle/lvl2.jpg",
    "../assets/water_bottle/lvl4.jpg",
    "../assets/water_bottle/lvl6.jpg",
    "../assets/water_bottle/lvl8.jpg"
]