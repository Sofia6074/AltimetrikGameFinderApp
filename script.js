window.addEventListener("load", start);

function start(){
  document.querySelector(".submitButton").addEventListener("click",login);
  document.querySelector(".imageClassShowPass").addEventListener("click",togglePass);
}

// - - - - - - - - - - Login control
async function login(){
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passInput").value;

  if (validateEmail(email) && validatePassword(password)){
    let loginResponse = await checkIfUserRegistered();
    console.log("login: " + loginResponse);

    if (loginResponse === 200){
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

// - - - - - - - - - - Check if the user is already registered
async function checkIfUserRegistered(){
  let loginResponse = await loginUser();
  console.log("checkIfUserResgistered: " + loginResponse);
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
  let response = await loginResponse.status;
  return response;
}

// - - - - - - - - - - Form validation
// Email validator
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = email.length <= 254 && re.test(email);

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

  // Check length
  if (password.length <= 3){
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

  // Check white spaces
  if (password.indexOf(' ') > 0){
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