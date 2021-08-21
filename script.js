window.addEventListener("load", start);

function start(){
  document.querySelector(".inputMail").addEventListener("click",activeEmailInput);
  document.getElementById("emailInput").addEventListener("blur",blurEmailInput);
  document.querySelector(".userPass").addEventListener("click",activePassInput);
  document.getElementById("passInput").addEventListener("blur",blurPassInput);
  document.querySelector(".submitButton").addEventListener("click",login);
  document.querySelector(".showPasswordIcon__svg").addEventListener("click",togglePass);
}

// - - - - - - - - - - Login control
async function login(){
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passInput").value;

  if (validateEmail(email) && validatePassword(password)){
    let loginResponse = await checkIfUserRegistered();

    if (loginResponse === 200){
        document.querySelector(".succesSnackbar").setAttribute("style", "display: flex;");
        document.querySelector(".errorSnackbar").setAttribute("style", "display: none;");
      document.querySelector(".succesSnackbar").classList.add("show");
      document.querySelector(".errorSnackbar").classList.remove("show");
      setTimeout(function(){window.location = "mainMenu.html"}, 1000);
    } else {
        document.querySelector(".succesSnackbar").setAttribute("style", "display: none;");
      document.querySelector(".errorSnackbar").setAttribute("style", "display: flex;");
      let errorMessage = document.querySelector(".passwordErrorMessage");
      let elements = document.querySelectorAll(".userMail, .inputMail, .userPass, .inputPass, .icon__svg");
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

// - - - - - - - - - - Check if the user is already registered
async function checkIfUserRegistered(){
  let loginResponse = await loginUser();
  return loginResponse;
}

// - - - - - - - - - - Get status
async function loginUser() {
  let userData = document.querySelectorAll(".input");
  let userEmail = userData[0].value;
  let userPass = userData[1].value;

  const loginResponse = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: `${userEmail}`, password: `${userPass}`})
  });
  let response = loginResponse.status;
  return response;
}

// - - - - - - - - - - Form validation
// Email validator
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = email.length <= 254 && re.test(email);

  let errorMessage = document.querySelector(".mailErrorMessage");
  let icon = document.querySelectorAll(".icon__svg")[0];
  let elements = document.querySelectorAll(".userMail, .inputMail");
  errorMessage.innerHTML = "";  

  if (!result){
    let node = document.createTextNode("Enter a valid mail");
    errorMessage.appendChild(node);
    errorMessage.classList.add("errorText");
    icon.classList.add("error");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
  }
  else{
    errorMessage.classList.remove("errorText");
    icon.classList.remove("error");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("error");
    }
  }
  return result;
}

// Password validator
function validatePassword(password) { 
  let errorMessage = document.querySelector(".passwordErrorMessage");
  let icon = document.querySelectorAll(".icon__svg")[1];
  let elements = document.querySelectorAll(".userPass, .inputPass");
  errorMessage.innerHTML = "";
  errorMessage.classList.add("errorText");

  // Check length
  if (password.length <= 3){
    let node = document.createTextNode("The password is too short");
    errorMessage.appendChild(node);
    icon.classList.add("error");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
    return false;
  }
  // Check white spaces
  if (password.indexOf(' ') > 0){
    let node = document.createTextNode("The password can't have white spaces");
    errorMessage.appendChild(node);
    icon.classList.add("error");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("error");
    }
    return false;
  }
  icon.classList.remove("error");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("error");
  }
  return true;
}

// - - - - - - - - - - Change icons color depending on the event
// Email
function activeEmailInput(){
  blurPassInput();
  document.querySelectorAll(".input")[0].setAttribute("style", "color:white;");
  document.querySelectorAll(".icon__svg")[0].setAttribute("style", "fill:white;");
  let elements = document.querySelectorAll(".userMail, .inputMail");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("focus");
  }
}

function blurEmailInput(){
  document.querySelectorAll(".input")[0].removeAttribute("style", "color:white;");
  document.querySelectorAll(".icon__svg")[0].removeAttribute("style", "fill:white;");
  let elements = document.querySelectorAll(".userMail, .inputMail");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("focus");
  }
}

// Password
function activePassInput(){
  document.querySelectorAll(".input")[1].setAttribute("style", "color:white;");
  document.querySelectorAll(".icon__svg")[1].setAttribute("style", "fill:white;");
  let elements = document.querySelectorAll(".userPass, .inputPass, .icon__svg");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("focus");
  }
}

function blurPassInput(){
  document.querySelectorAll(".input")[1].removeAttribute("style", "color:white;");
  document.querySelectorAll(".icon__svg")[1].removeAttribute("style", "fill:white;");
  let elements = document.querySelectorAll(".userPass, .inputPass, .icon__svg");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("focus");
  }
}

// - - - - - - - - - - Show or hide password
function togglePass(){
  let pass = document.getElementById("passInput");
  let passImage = document.querySelector(".showPasswordIcon__svg");

  if (pass.type === "password") {
    pass.type = "text";
    passImage.setAttribute('src', "./media/login/hidePass.svg");
  } else {
    pass.type = "password";
    passImage.setAttribute('src', "./media/login/showPass.svg");
  }
}

// - - - - - - - - - - Snackbar
function closeSnackBar(){
    document.querySelector(".succesSnackbar").classList.remove("show");
    document.querySelector(".errorSnackbar").classList.remove("show");
}