let users = [];
/** 
 * This function is used to add a new User to the user-array
 * 
 * @param {JSON} users - This JSON contains the information (name,email,password) which are neccessary to sign up
*/
function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmedPassword = document.getElementById('confirmedPassword');
    if (password.value == confirmedPassword.value) {
        let newUser = {
            "name": name.value,
            "email": email.value,
            "password": password.value,
        }
        users.push(newUser);
        clearInputfields(name, email, password, confirmedPassword);
    } else {
        alert('Die Passwörter stimmen nicht überein');
        clearInputfields(name, email, password, confirmedPassword);
    }
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


