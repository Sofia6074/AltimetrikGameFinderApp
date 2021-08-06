window.addEventListener("load", start);

function start(){
  console.log("start function");
  document.querySelector(".submitButton").addEventListener("click",login);
  document.querySelector(".imageClassShowPass").addEventListener("click",togglePass);
}

// - - - - - Login control
function login(){
  console.log("login function");
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passInput").value;

  if (validateEmail(email) && validatePassword(password)){
    if (checkValidUser()){
      window.location = "mainMenu.html";
    } else{
    let errorMessage = document.querySelector(".passwordErrorMessage");
    let elements = document.querySelectorAll(".userMail, .inputLogin, .userPass, .inputPass, .imageClass");
    let node = document.createTextNode("Your email or password is incorrect");
    
    errorMessage.innerHTML = "";
    errorMessage.appendChild(node);
    errorMessage.classList.add("errorText");

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
    }
  }
}

// - - - - - - - - - - Form validation
// Email validator
function validateEmail(email) {
  console.log("validateEmail function - email: " + email);
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = email.length <= 254 && re.test(email);
  console.log("validateEmail function: " + result);

  if (!result){
    let errorMessage = document.querySelector(".mailErrorMessage");
    let elements = document.querySelectorAll(".userMail, .inputLogin, .userPass, .inputPass, .imageClass");
    let node = document.createTextNode("Enter a valid mail");
    
    errorMessage.innerHTML = "";
    errorMessage.appendChild(node);
    errorMessage.classList.add("errorText");

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
      //classList: Allows for manipulation of element's class content attribute
      //           as a set of whitespace-separated tokens through a DOMTokenList object.
    }
  }
  return result;
}

// Password validator
function validatePassword(password) {
  console.log("validatePassword function");

  // Check length
  if (password.length <= 3){
    console.log("validatePassword function: length not valid");
    let errorMessage = document.querySelector(".passwordErrorMessage");
    let elements = document.querySelectorAll(".userMail, .inputLogin, .userPass, .inputPass, .imageClass");
    let node = document.createTextNode("The password is too short");

    errorMessage.innerHTML = "";
    errorMessage.appendChild(node);
    errorMessage.classList.add("errorText");

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
    return false;
  }
  console.log("validatePassword function: length valid");

  // Check white spaces
  if (password.indexOf(' ') > 0){
    console.log("validatePassword function: space not valid");
    let errorMessage = document.querySelector(".passwordErrorMessage");
    let elements = document.querySelectorAll(".userMail, .inputLogin, .userPass, .inputPass, .imageClass");
    let node = document.createTextNode("The password can't have white spaces");

    errorMessage.innerHTML = "";
    errorMessage.appendChild(node);
    errorMessage.classList.add("errorText");

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
    return false;
  }
  console.log("validatePassword function: space valid");
  return true;
}

// - - - - - - - - - - Show or hide password
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