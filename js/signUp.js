let users = [
    { 'name': 'tim', 'email': 'test@testmail.de', 'password': 'test123' }
];
/** 
 * This function is used to add a new User to the user-array, if the conditions about personal name, email and password are fulfilled.
 * 
 * @param {JSON} users - This JSON contains the information (name,email,password) which are neccessary to sign up
*/
//
function addUser() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmedPassword = document.getElementById('confirmedPassword');

    if (name.value.length < 2) {
        displayErrorMessage('The name must contain at least two letters', name);
        return;
    }
    if (password.value !== confirmedPassword.value) {
        displayErrorMessage('Ups! Your passwords don\'t match', confirmedPassword);
        return;
    }

    const currentUser = { name: name.value, email: email.value.toLowerCase(), password: password.value };
    users.push(currentUser);
    clearInputfields(name, email, password, confirmedPassword);

    storeUserItems(currentUser)
        .then(response => {
            console.log('Item successfully stored:', response);
            window.location.href = 'index.html?msg=You%20Signed%20Up%20successfully';
        })
        .catch(() => {
            alert('An unexpected error occurred');
        });
}


    async function storeUserItems(currentUser) {
        const storePromises = [
            setItem(currentUser.name, currentUser.name),
            setItem(currentUser.email, currentUser.email),
            setItem(currentUser.password, currentUser.password)
        ];
        return Promise.all(storePromises);
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

