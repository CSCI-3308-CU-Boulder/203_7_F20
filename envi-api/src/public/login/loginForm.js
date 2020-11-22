$(document).ready(function () {
  // Check if user is already logged in
  console.log("Checking login status")
  axios.get(loggedInUrl)
    .then(response => {
      if (response.data) {
        console.log(response.data)
        let { loggedIn } = response.data
        if (loggedIn) {
          console.log("User already logged in!")
          $('#logoutForm').show()
        } else {
          console.log("No login")
          $('#loginForm').show()
        }
      }
    }).catch(err => {
      console.error(err)
    })
})

function enableButton() {
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var button = document.getElementById("submit_login");
  button.disabled = true;

  if (username.value && password.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function submitLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let body = {
    username,
    password
  }

  axios.post(loginUrl, body)
    .then(response => {
      if (response.data) {
        console.log(response.data);
        let { username } = response.data;
        // Set a cookie to remember the login on the frontend
        var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.set('username', username, { expires: inFifteenMinutes })
        // Redirect to profile page
        window.location.replace(`/profile#${username}`)
      } else {
        console.log(response)
      }
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data)
        let { err } = error.response.data
        $('#loginError').show()
        $('#loginError').html(err || "Unknown error while logging in. Try again later")
      } else {
        $('#loginError').show()
        $('#loginError').html("Unknown error while logging in. Try again later")
      }
    })
}

function submitLogout() {
  axios.get(logoutUrl)
    .then(response => {
      if (response.data) {
        let { success } = response.data
        if (success) {
          window.location.replace('/home')
        } else {
          console.log("Logout unsuccessful")
        }
      }
    }).catch(err => console.error(err))
}

$("#submit_login").on("click", function (event) {
  event.preventDefault()
})

$("#submit_logout").on("click", function (event) {
  event.preventDefault()
})
