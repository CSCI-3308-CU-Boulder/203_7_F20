


async function loadLogoutModal() {//function to be applied ON LOAD
    loggedIn()
    .then(logged_in => {//if logged in, build modal to allow user to log out
        console.log(logged_in);
        if (user) {
            document.getElementById("logout_modal").innerHTML = `
            <div role="document">
            <div class="modal-content">
            <div class="modal-header" id="modal_header"
            style="max-height: 40px; display: flex; align-items: center; border: none;">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body" id="modal_body"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <a href="../profile/index.html" style="color: #297562; font-size: large" id="logout_name">${user.name}</a>
            </div>
            <div class="modal-footer" id="lgout_buttons"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <button type="button" class="button">Log Out</button>
            </div>
            </div>
            <div class="modal-body" id="modal_body"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <a href="../profile/index.html" style="color: #297562; font-size: large" id="logout_name">${user.name}</a>
            </div>
            <div class="modal-footer" id="logout_buttons"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <button type="button" class="button">Log Out</button>
            </div>
            </div>
            </div>`
        } else {//if not logged in, build modal to allow user to log in/sign up
            console.log("user not logged in")
            document.getElementById("logout_modal").innerHTML = `
            <div role="document">
            <div class="modal-content">
            <div class="modal-header" id="modal_header"
            style="max-height: 40px; display: flex; align-items: center; border: none;">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body" id="modal_body"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <a style="color: #297562; font-size: large" id="logout_name">You are not logged in.</a>
            </div>
            <div class="modal-footer" id="logout_buttons"
            style="max-height: 70px; display: flex; align-items: center; border: none;">
            <a href = "../login/index.html">
            <button type="button" class="button">Log In</button>
            </a>
            <a href = "../signup/index.html">
            <button type="button" class="button">Sign Up</button>
            </a>
            </div>
            </div>
            </div>`
        }
    })
    .catch (err => { console.log(err) })
    
}


function clickNavPic() {
    loadLogoutModal()
}

