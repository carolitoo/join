async function init() {
  await includeHTML();
  //resetSelectedTab();////wo ist diese Funktion//? unter template.ja (sorgt dafür, dass richtiger oder kein Tab in Sidebar bzw. Footer ausgewählt ist)
  loadUserData()
}

function loadUserData(){
  getItem('name');
  getItem('email');
  getItem('password');
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


function stopPropagation (event) {
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