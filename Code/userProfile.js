$("#profileImage").click(function(e) {
    $("#imageUpload").click();
  });

  document.querySelector('input[type=file]').addEventListener('change', function(){
    this.form.submit()});
