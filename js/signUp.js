let users = [
    { 'name': 'tim', 'email': 'test@testmail.de', 'password': 'test123', 'confirmedPassword': 'test123' }
];



function createSignUpdata() {
     const nameInput = document.getElementById('name');
     const emailInput = document.getElementById('email');
     const passwordInput = document.getElementById('password');
     const confirmedPasswordInput = document.getElementById('confirmedPassword');


    const newUser = {
        name: nameInput.value,
        email: emailInput.value.toLowerCase(),
        password: passwordInput.value,
        confirmedPassword: confirmedPasswordInput.value
    };
    validateSignUpData(newUser);
}

function validateSignUpData(newUser) {
    if (newUser.name.length >= 2) {
        if (newUser.password === newUser.confirmedPassword) {
            addUser(newUser);
        } else {
            displayErrorMessage("Passwords don't match", document.getElementById('confirmedPassword'));
        }
    } else {
        displayErrorMessage('Name must contain at least two letters',document.getElementById('name'));
    }
}


/** 
 * This function is used to add a new User to the user-array, if the conditions about personal name, email and password are fulfilled.
 * 
 * @param {JSON} users - This JSON contains the information (name,email,password) which are neccessary to sign up
*/
//
async function addUser(newUser) {
    users.push(newUser);
    await storeUserItems(newUser);
    clearInputfields(newUser);
    window.location.href = 'index.html?msg=You%20Signed%20Up%20successfully';
}


async function storeUserItems(newUser) {
    const storePromises = [
        setItem('name', newUser.name),
        setItem('email', newUser.email),
        setItem('password', newUser.password)
    ];
    await Promise.all(storePromises);
    console.log('All Promises Loaded', storePromises);
}


/**
 * This function clear all input-fields from the form-elememt
 * 
 * @param {valueOf} name - contains the value oft the name from the depending input
 * @param {valueOf} email - contains value of the email from dp. input
 * @param {valueOf} password - contains value of the password from dp. input
 * @param {valueOf} confirmedPassword - contains value of the assigned password from dp. input
 */
function clearInputfields(newUser) {
    newUser.name = '';
    newUser.email = '';
    newUser.password = '';
    newUser.confirmedPassword = '';
}


/**
 * A function that outputs an error message if the fields with the id 'name' or 'password/confirmedpassword' have not been filled in correctly.
 * 
 * @param {string} message - it's the message which is shown, if the condition is not fulfilled.
 * @param {valueOf} element - value of the input-box (personal name or confirmed password) 
 */
function displayErrorMessage(message, element) {
    let errorMessage = document.createElement('div');
    errorMessage.innerHTML = message;
    errorMessage.style.cssText = 'color: red; margin: -27px 0 9px 6px; font-size: small;';
    element.parentNode.appendChild(errorMessage);
}


/**
 * A function that changes the icon if you have typed something into the input field with the id 'password/confirmedPassword'.
 * 
 * @param {string} inputId - the id from the first or second password-field (e.g first: password, second: confirmedPassword)
 * @param {string} iconId - the id from the first or second icon in the password-field (e.g first: password, second: confirmedPassword)
 */
function togglePasswordIcon(inputId, iconId) {
    let passwordInput = document.getElementById(inputId);
    let passwordIcon = document.getElementById(iconId);

    if (passwordInput.value.length > 0) {
        passwordIcon.setAttribute('src', './assets/img/visibility_off.svg');
    } else {
        passwordIcon.setAttribute('src', './assets/img/lock.svg');
    }
}


/**
 * A function that makes it possible to display the password/confirmedPassword via onclick.
 * 
 * @param {string} inputId - the id from the first or second password-field (e.g first: password, second: confirmedPassword)
 */
function showPassword(inputId) {
    let passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

