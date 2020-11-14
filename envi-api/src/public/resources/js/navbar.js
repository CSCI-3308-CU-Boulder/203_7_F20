
function loggedIn() {
    //function to check if user is logged in
    return true; //TEMPORARY
}

function clickNavPic() {
    //if logged in, display logout button
    if (loggedIn()) {
        console.log("logged in");
        var buttons = `button type="button" class="button">Log Out</button>`
    }
    //else display login button
    else {
        console.log("not logged in");
        var buttons = `<button type="button" class="button">Log In</button>
        <button type="button" class="button">Sign Up</button>`
    }
    document.getElementById("modal-footer").innerHTML = buttons;
}