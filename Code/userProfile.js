// $("#profileImage").click(function(e) {
//     $("#imageUpload").click();
//   });

//   document.querySelector('input[type=file]').addEventListener('change', function(){
//     this.form.submit()});

var userImg = "./assets/profile_pic_placeholder.gif"; //hardcoded user data

function uploadImage() {
  var imageString = '<img src="' + userImg + '">';
  var container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = imageString;

  var here = document.getElementById("profile_picture");
  here.appendChild(container);
}
