var image_id = 0;

document.getElementById("submit_button").addEventListener("click", function (event) {
  event.preventDefault()
});

$(document).ready(function () {
  //Check if user is already logged in
  console.log("Checking login status")
  axios.get(loggedInUrl)
    .then(response => {
      if (response.data) {
        console.log(response.data)
        loadLogoutModal(response.data.user)
        let { loggedIn } = response.data
        if (loggedIn) {
          console.log("User already logged in!")
          $('#logoutForm').show()
        } else {
          console.log("No login")
          $('#signupForm').show()
        }
      }
    }).catch(err => {
      console.error(err)
    })
})

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
    image_id = chosen.id;
  }
}

function validateEmail(email) {
  if (!email || !email.value) {
    email.classList.remove("valid")
    email.classList.add("invalid")
    return false
  }
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  if (email.value.match(emailRegex)) {
    email.classList.remove("invalid")
    email.classList.add("valid")
    return true
  } else {
    email.classList.remove("valid")
    email.classList.add("invalid")
    return false
  }
}

function validateUsername(username) {
  if (!username || !username.value) {
    username.classList.remove("valid")
    username.classList.add("invalid")
    return false
  } else {
    username.classList.remove("invalid")
    username.classList.add("valid")
    return true
  }
}

function validateName(name) {
  if (!name || !name.value) {
    name.classList.remove("valid")
    name.classList.add("invalid")
    return false
  } else {
    name.classList.remove("invalid")
    name.classList.add("valid")
    return true
  }
}

function validatePassword(password, confirmElem) {
  if (!password) {
    password.classList.remove("valid")
    password.classList.add("invalid")
    return false
  }

  var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
  var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
  var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
  var minLength = 8;

  var lower = false;
  var upper = false;
  var number = false;
  var min_length = false;
  confirmV = false
  if (password.value.match(upperCaseLetters)) {
    upper = true;
  }
  if (password.value.match(lowerCaseLetters)) {
    lower = true;
  }
  if (password.value.match(numbers)) {
    number = true;
  }
  if (password.value.length >= minLength) {
    min_length = true;
  }
  if (password.value == confirmElem.value) {
    confirmElem.classList.remove("invalid")
    confirmElem.classList.add("valid")
    confirmV = true
  } else {
    confirmElem.classList.remove("valid")
    confirmElem.classList.add("invalid")
  }

  if (upper && lower && number && min_length && confirmV) {
    password.classList.remove("invalid")
    password.classList.add("valid")
    return true;
  } else {
    password.classList.remove("valid")
    password.classList.add("invalid")
    return false;
  }
}

function validateCheckbox(checkbox) {
  if (checkbox.checked) {
    checkbox.classList.remove("invalid")
    checkbox.classList.add("valid")
    return true
  } else {
    checkbox.classList.remove("valid")
    checkbox.classList.add("invalid")
    return false
  }
}

function enableButton() {
  var email = document.getElementById("email");
  var username = document.getElementById("username");
  var name = document.getElementById("name");
  var password = document.getElementById("password");
  var confirm = document.getElementById("conf_password");

  var checkbox = document.getElementById("checkbox");
  var validpsw = document.getElementById("passwordHelp");
  var match = document.getElementById("matchHelp");

  var button = document.getElementById("submit_button");

  var valid = validateEmail(email) && validateUsername(username) && validateName(name) && validatePassword(password, confirm) && validateCheckbox(checkbox);

  if (valid) {
    button.disabled = false;
    return true
  } else {
    button.disabled = true;
    return false
  }
}

function signup() {
  if (enableButton()) {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (email && username && name && password) {

      let payload = {
        username: username,
        password: password,
        name: name,
        email: email,
        image_id: image_id
      }
      axios.post("/api/signup", payload).then((response) => {
        console.log(response)
        if (!response.data.err) {
          // Redirect with success
          // document.cookie = "username=" + username;
          window.location.replace("/login/");
        }
      }).catch((err) => {
        alert("Error signing up, please try again later.")
        console.error(err)
      })
    }
  }
}
