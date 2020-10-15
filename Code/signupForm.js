var baseUrl = "http://localhost:5000"

var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
var minLength = 8;

function validateEmail(email) {
  if (!email) {
    return false
  }
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  if (email.value.match(emailRegex)) {
    return true
  } else {
    return false
  }
}

function validatePassword(password) {
  if (!password) {
    return false
  }
  //eventually should become offkey function (checks as user types)
  var lower = false;
  var upper = false;
  var number = false;
  var min_length = false;
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

  if (upper && lower && number && min_length) {
    return true;
  } else {
    return false;
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

  var valid = validateEmail(email) && username && name && validatePassword(password) && password.value === confirm.value && checkbox.checked;

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
        image_id: 0
      }
      axios.post(baseUrl + "/signup", payload).then((response) => {
        console.log(response)
        window.location.pathname = "/203_7_F20/Code/userProfile.html";
      }).catch((err) => console.error(err))
    }
  }
}
