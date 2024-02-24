async function init() {
  await includeHTML();
  await loadUserData();
  await getLoggedInEmail();
  await renderAcronym(loggedInEmail);
  resetSelectedTab();
}

/**
 * This function loads the user data from the back-end using the getItem function and updates the global variable 'users' with the loaded user data
 */
async function loadUserData() {
  const response = await getItem('users');
  const usersData = response['data']['value'];
  if (usersData) {
    users = JSON.parse(usersData);
  }
}

/**
 * This function loads the contacts data from the back-end using the getItem function and updates the global variable 'contacts' with the loaded contacts data
 */
async function loadContacts(){
  const response = await getItem('contacts');
  const contactsData = response['data']['value'];
  if (contactsData) {
    contacts = JSON.parse(contactsData);
  }
}


async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // Pfad eintragen, z.B. "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * This function converts the first letter of a string into a capital letter.
 * 
 * @param {string} string - takes over strings from firstName/lastName
 * @returns - First name/last name with capitalized first letter.
 */
function capitalizeFirstLetter(string) {
  return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}


function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * This function changes the source of an img-element (needs to be in the same folder)
 * 
 * @param {string} idOfImg - id of the the img-element that is changed
 * @param {string} nameOfImg - name of the new image 
 */
function changeImgTo(idOfImg, nameOfImg) {
  document.getElementById(idOfImg).src = `./assets/img/${nameOfImg}.svg`;
}


/**
 * This function changes the border color of an element
 * 
 * @param {*} idOfElement - id of the element for which the border color should be changed
 * @param {color} color - color of the border that should be displayed
 */
function changeBorderColorSearchTask(idOfElement, color) {
  document.getElementById(idOfElement).style.border = `1px solid ${color}`;
}

