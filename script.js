window.addEventListener("load", start);

function start(){
  document.getElementsByClassName("submitButton").addEventListener("click",login);
}


// - - - - - Login control
function login(){
  let email = document.getElementById("emailInput");
  let password = document.getElementById("passInput");

  if (validateEmail(email)){

  }
}

// - - - - - Show or hide password
function togglePass(){
  let pass = document.getElementById("passInput");
  let passImage = document.querySelector(".imageClassShowPass");

  if (pass.type === "password") {
    pass.type = "text";
    passImage.setAttribute('src', "./media/login/hidePass.svg");
  } else {
    pass.type = "password";
    passImage.setAttribute('src', "./media/login/showPass.svg");
  }
}

// - - - - - Data validate
// Email validator
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = re.test(email);

  if (!result){
      //show message and change style to red
  }
  return result;
}

// Password validator
function validatePassword(password) {
  // Check length
  if (pass.value.length <= 3){
    //show message and change style to red
    return false;
  }

  // Check white spaces
  if (pass.indexOf(' ') > 0){
    //show message and change style to red
    return false;
  }

  return true;
}
