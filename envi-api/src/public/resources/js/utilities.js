let loggedInUrl = "/api/loggedIn/"
let loginUrl = "/api/login/"
let logoutUrl = "/api/logout/"


//function to check if user is logged in
let loggedIn = () => new Promise((resolve, reject) => {
    // Axios call here
    axios.get('/api/loggedIn/')
        .then(response => {
            if (response.data) {
                console.log(response.data)
                let { loggedIn } = response.data
                if (loggedIn) {
                    console.log("User already logged in!")
                    resolve(true);
                } else {
                    console.log("No login")
                    resolve(false);
                }
            }
        }).catch(err => {
            console.error(err)
        })
})

// function setCookie(name, value, minutes) {
//     var d = new Date();
//     d.setTime(d.getTime() + (minutes * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// function getCookie(name) {
//     var cook = name + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(cook) == 0) {
//             return c.substring(cook.length, c.length);
//         }
//     }
//     return "";
// }