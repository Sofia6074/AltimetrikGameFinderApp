function togglePass(){
    var pass = document.getElementById("passInput");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
    /*change the image with style.backgroundimage(url)*/
  }
}