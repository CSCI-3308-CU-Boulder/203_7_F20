function enableButton() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var button = document.getElementById("submit_button");
    button.disabled = true;
  
    if (username.value && password.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }