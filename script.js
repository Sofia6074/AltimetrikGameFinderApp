window.addEventListener("load", start);

function start(){
  console.log("start function");
  document.querySelector(".submitButton").addEventListener("click",login);
}


// - - - - - Login control
function login(){
  console.log("login function");
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passInput").value;

  if (validateEmail(email)){
    console.log(validateEmail(email));
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
  console.log("validateEmail function - email: " + email);
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = email.length <= 254 && re.test(email);
  console.log("validateEmail function: " + result);

  if (!result){
    let errorMessage = document.querySelector(".mailErrorMessage");
    let elements = document.querySelectorAll(".userMail, .inputLogin, .userPass, .inputPass, .imageClass");
    
    errorMessage.innerHTML = "";
    let node = document.createTextNode("Enter a valid mail");
    errorMessage.appendChild(node);
    
    elements.forEach(elements => {
      elements.classList.add("error");
      //classList: Allows for manipulation of element's class content attribute
      //           as a set of whitespace-separated tokens through a DOMTokenList object.
    });
  }
  return result;
}

// Password validator
function validatePassword(password) {
  console.log("validatePassword function");
  // Check length
  if (pass.value.length <= 3){
    console.log("validatePassword function: length not valid");
    //show message and change style to red
    return false;
  }
  console.log("validatePassword function: length valid");

  // Check white spaces
  if (pass.indexOf(' ') > 0){
    console.log("validatePassword function: space not valid");
    //show message and change style to red
    return false;
  }
  console.log("validatePassword function: space valid");
  return true;
}
