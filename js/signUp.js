let users = [
    {
        'name': 'guest', 'email': 'guest@account', 'password': 'joinGuest2024', 'confirmedPassword': 'joinGuest2024'
    },

];

let newUser;

async function createSignUpdata() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmedPasswordInput = document.getElementById('confirmedPassword');

    newUser = {
        name: nameInput.value,
        email: emailInput.value.toLowerCase(),
        password: passwordInput.value,
        confirmedPassword: confirmedPasswordInput.value
    };
    validateSignUpData(newUser);
}


function disableSignUpButton() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmedPasswordInput = document.getElementById('confirmedPassword');
    const checkboxInput = document.getElementById('checkbox');
    const signUpButton = document.getElementById('signUpButton');

    const allFieldsFilled = nameInput.value && emailInput.value && passwordInput.value && confirmedPasswordInput.value && checkboxInput.checked;

    if (allFieldsFilled) {
        signUpButton.removeAttribute('disabled');
        signUpButton.classList.remove('if-button-disabled');
        signUpButton.classList.add('btn-db');
    } else {
        signUpButton.setAttribute('disabled', true);
        signUpButton.classList.add('if-button-disabled');
    }
}


function validateSignUpData(newUser) {
    if (newUser.name.length >= 2) {
        if (newUser.password === newUser.confirmedPassword) {
            addUser(newUser);
        } else {
            displayErrorMessage("Passwords don't match", document.getElementById('confirmedPassword'));
        }
    } else {
        displayErrorMessage('Name must contain at least two letters', document.getElementById('name'));
    }
}


/** 
 * This function is used to add a new User to the user-array, if the conditions about personal name, email and password are fulfilled.
 * 
 * @param {JSON} users - This JSON contains the information (name,email,password) which are neccessary to sign up
*/
//
async function addUser(newUser) {
    if (checkIfUserexist(newUser)) {
        displayErrorMessage('A user with this email already exists', confirmedPassword);
    } else {
        users.push(newUser);
        await storeUserItems();
        clearInputfields(newUser);
        localStorage.setItem('signUpStatus', 'completed');
        window.location.href = 'index.html?msg=You%20Signed%20Up%20successfully';
    }
}

function checkIfUserexist(newUser) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == newUser.email) {
            return true;
        }
    }
    return false;
}


async function storeUserItems() {
    await setItem('users', JSON.stringify(users));
    console.log('DIE aktuellen user sind', users);
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
    const errorMessageId = 'customErrorMessage';
    let existingErrorMessage = document.getElementById(errorMessageId);

    if (existingErrorMessage) {
        existingErrorMessage.innerHTML = message;
    } else {
        let errorMessage = document.createElement('div');
        errorMessage.innerHTML = message;
        errorMessage.id = errorMessageId;
        errorMessage.style.cssText = 'color: red; margin: -27px 0 9px 6px; font-size: small;';
        element.parentNode.appendChild(errorMessage);
    }
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

