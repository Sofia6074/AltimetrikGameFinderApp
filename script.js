window.addEventListener("load", start);

function start(){
  document.getElementsByClassName("submitButton").addEventListener("click",login);
}


// - - - - - Login control
function login(){
  let email = document.getElementById("emailInput");
  let password = document.getElementById("passInput");
}

// - - - - - Show or hide password
function togglePass(){
  let pass = document.getElementById("passInput");
  if (pass.type === "password") {
    pass.type = "text";
    pass.src = "media/login/hidePass.svg";
    console.log(pass.src);
    // pass.setAttribute('src', "media/login/hidePass.svg");
  } else {
    pass.type = "password";
    pass.src = "media/login/showPass.svg";
    console.log(pass.src);
    // pass.setAttribute('src', "media/login/showPass.svg");
  }
}

// - - - - - Data validate
// Email validator
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Password validator
function validatePassword(password) {
  // Check length
  if (pass.value.length <= 3){
    return false;
  }

  // Check white spaces
  if (pass.indexOf(' ') > 0){
    return false;
  }

  return true;
}
