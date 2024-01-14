let users = [
    { 'name': 'tim', 'email': 'test@testmail.de', 'password': 'test123' }
];
/** 
 * This function is used to add a new User to the user-array
 * 
 * @param {JSON} users - This JSON contains the information (name,email,password) which are neccessary to sign up
*/
//


function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmedPassword = document.getElementById('confirmedPassword');
    if (name.value.length < 2) {
        displayErrorMessage('The name must contain at least two letters', name);
        return;
    }
    users.push({ name: name.value, email: email.value.toLowerCase(), password: password.value });
    clearInputfields(name, email, password, confirmedPassword);
    window.location.href = 'index.html?msg=You%20Signed%20Up%20successfully';
}

/**
 * This function clear all input-fields from the form-elememt
 * 
 * @param {valueOf} name - contains the value oft the name from the depending input
 * @param {valueOf} email - contains value of the email from dp. input
 * @param {valueOf} password - contains value of the password from dp. input
 * @param {valueOf} confirmedPassword - contains value of the assigned password from dp. input
 */
function clearInputfields(name, email, password, confirmedPassword) {
    name.value = '';
    email.value = '';
    password.value = '';
    confirmedPassword.value = '';
}

function displayErrorMessage(message, element) {
    let errorMessage = document.createElement('div');
    errorMessage.innerHTML = message;
    errorMessage.style.cssText = 'color: red; margin: -27px 0 9px 6px; font-size: small;';
    element.parentNode.appendChild(errorMessage);
}






