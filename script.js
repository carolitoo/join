async function init() {
  await includeHTML();
  resetSelectedTab();
}


async function loadUserData() {
  const response = await getItem('users');
  const usersData = response['data']['value'];
  if (usersData) {
    users = JSON.parse(usersData);
  }
}

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

