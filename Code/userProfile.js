// $(document).ready(function () {
//   var readURL = function (input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         $("#profile-pic").attr("src", e.target.result);
//       };
//       reader.readAsDataURL(input.files[0]);
//     }
//   };
//   $("#file-upload").on("change", function () {
//     readURL(this);
//   });

//   $("#upload-button").on("click", function () {
//     $(".file-upload").click();
//   });
// });



// $(document).ready(function(){
//   $('#btn_upload').click(function(){

//     var fd = new FormData();
//     var files = $('#file')[0].files[0];
//     fd.append('file',files);

//     // AJAX request
//     $.ajax({
//       url: 'ajaxProfile.php',
//       type: 'post',
//       data: fd,
//       contentType: false,
//       processData: false,
//       success: function(response){
//         if(response != 0){
//           // Show image preview
//           $('#preview').append("<img src='"+response+"' width='100' height='100' style='display: inline-block;'>");
//         }else{
//           alert('file not uploaded');
//         }
//       }
//     });
//   });
// });





// function updateProfile() {
//   var button = document.getElementById('my_submit_button');
//   var profileName = document.getElementById("modal_name").value;
//   // var lName = document.getElementById("last_name").value;
//   button.disabled = false;
  
//   if (profileName) {
//     document.getElementById("modal_name").disabled = true;
//     // document.getElementById("last_name").disabled = true;
//   }
//   if (document.getElementById("modal_name").disabled == false) {
//     button.disabled = true;
//   }
//   else {
//     button.disabled = false;
//   }
// }

function resetName() {
  document.getElementById("modal_name").disabled = false;
  // document.getElementById("last_name").disabled = false;
}

function onClickFunction() {
  alert("Hey! I'm all green! Well done.")
}

  