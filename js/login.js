/**
 * This function is part of the forwarding from signUp to login.
 * If the forwarding was successful, a message appears which is generated by a query parameter.
 * 
 */
function callStatusofSignUp() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    const msgBox = document.getElementById('msgBox');
    if (msg) {
        const msgSpan = document.createElement('span');
        msgSpan.innerHTML = msg;
        msgSpan.classList.add('successfullyBtn');
        msgBox.appendChild(msgSpan);
    } else {
        msgBox.style.display = 'none';
    }
}


 function login(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let currentUser = users.find(u => u.email == email.value && u.password == password.value);
    console.log(currentUser);
    if(currentUser){
        console.log('User gefunden');
    }
}

function disableLogInButton(){
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    const LogInButton = document.getElementById('LogInButton');

    const allFieldsFilled = emailInput.value && passwordInput.value;
  
    if (allFieldsFilled) {
        LogInButton.removeAttribute('disabled');
        LogInButton.classList.remove('if-button-disabled');
        LogInButton.classList.add('btn-db');

    } else {
        LogInButton.setAttribute('disabled', true);
        LogInButton.classList.add('if-button-disabled');
    }
}
