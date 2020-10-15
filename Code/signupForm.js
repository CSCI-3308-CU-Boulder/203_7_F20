var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
var minLength = 8;

var images = [
  "./assets/colorEarth.jpg",
  "./assets/envi.png",
  "./assets/environmentalist.jpg",
  "./assets/flatirons.png",
  "./assets/flowers.jpg",
  "./assets/hydroflask.jpg",
  "./assets/ice.jpg",
  "./assets/mountains.png",
  "./assets/plant.jpg",
  "./assets/recycling.jpeg",
];

function validatePassword() {
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
  var name = document.getElementById("name");
  var password = document.getElementById("password");
  var confirm = document.getElementById("conf_password");
  var checkbox = document.getElementById("checkbox");
  var validpsw = document.getElementById("passwordHelp");
  var match = document.getElementById("matchHelp");

  // TODO: Clear this function for students to implement
  var button = document.getElementById("submit_button");
  var valid = false;
  var match = false;
  if (password.value && confirm.value) {
    valid = validatePassword();
    match = password.value === confirm.value;
  }
  // if (email.value != "") {
  //   isEmail = true;
  // }
  // if (name.value != "") {
  //   isName = true;
  // }

  var condition =
    match && valid && email.value && name.value && checkbox.checked; // TODO: Replace false with the correct condition
  if (condition) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}
