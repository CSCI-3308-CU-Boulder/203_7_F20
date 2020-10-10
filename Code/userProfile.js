// $("#profileImage").click(function(e) {
//     $("#imageUpload").click();
//   });

//   document.querySelector('input[type=file]').addEventListener('change', function(){
//     this.form.submit()});

function onFileSelect(e){
    var f = e.target.files[0];
    if(f.type.match(/image.*/)){
        var reader = new FileReader;
        place = document.getElementById("profileImage");
        reader.readAsDataURL(f);
        reader.onload = function(e){ 
            place.src = e.target.result;
        }
    }
    else {
            alert('You can chose only pictures');
        };
};
if(window.File && window.FileReader && window.FileList && window.Blob){
    document.querySelector("input[type=file]").addEventListener("change", onFileSelect, false);
}else{
    console.warn( "Your browser does not support FileAPI");
};
