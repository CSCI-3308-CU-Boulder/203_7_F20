// $("#profileImage").click(function(e) {
//     $("#imageUpload").click();
//   });

//   document.querySelector('input[type=file]').addEventListener('change', function(){
//     this.form.submit()});

var user = "./assets/profile_pic_placeholder.gif";
function uploadImage(){
    var imageString = '<image\
    id="profileImage"\
    src="' + user + '/>\
    style="margin-left: 0px"\>';

    var container = document.createElement("div");
    container.classList.add("container");
    container.innerHTML = imageString;

    var here = document.getElementById("profile_picture");
    here.appendChild(container);
}


