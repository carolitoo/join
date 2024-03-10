const SUBTASK_ID = 0;
let taskPrio = "Medium";
let assignedUsers = [];
let category = [];
let contactsRendered = false;

async function initAddTask() {
<<<<<<< Updated upstream
  await includeHTML();
  await loadUserData();
  await getLoggedInEmail();
  await proofAuthentification(loggedInEmail);
  await checkPersonalheader(loggedInEmail);
  await loadUserData();
  await loadContacts();
  await checkIfGuestOrCurrentUser();
  await sortArrayContacts();
  await loadTasks();
  clearAssignedUsersArray();
  changeSelectedTab("tab-add-task");
  addEventListenerToAddForm();
  setMinDueDate("task-input-dueDate");
  checkReferringFromBoard();
}


/**
 * This function clears the array with the currently assigned users
 */
function clearAssignedUsersArray() {
  assignedUsers = [];
=======
    await includeHTML();
    await loadUserData();
    await getLoggedInEmail();
    await proofAuthentification(loggedInEmail);
    await checkPersonalheader(loggedInEmail)
    await loadContacts();
    await checkIfGuestOrCurrentUser()
    await sortArrayContacts();
    await loadTasks();
    clearAssignedUsersArray();
    changeSelectedTab('tab-add-task');
    addEventListenerToAddForm();
    addEventListenerToInputAssignedto()
    setMinDueDate('task-input-dueDate');
    checkReferringFromBoard();
}


function addEventListenerToInputAssignedto() {
    const taskInput = document.getElementById('input-assignedTo');
    taskInput.addEventListener("input", filterContacts);

    document.body.addEventListener("click", clickOutsideHandler);
    document.addEventListener("DOMContentLoaded", initAddTask); // Korrekte Funktion aufrufen*/
}


function filterContacts() {
    let searchedContact = document.getElementById('input-assignedTo').value.toLowerCase();


    let filteredContacts = contactsSorted.filter(contact =>
        contact.name.toLowerCase().startsWith(searchedContact)
    );
    renderFilteredContacts(filteredContacts);
}


function renderFilteredContacts(filteredContacts) {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    
    assignedContacts.innerHTML = ""; // Löscht die vorhandenen Kontakte

    for (const contact of filteredContacts) {
        const contactInitials = contact.acronymContact;
        const contactHTML = `
            <div class="contact">
                <div class="contact-circle-and-name-box">
                    <div style="background-color:${contact.colorContact}" class="task-detail-assigned-user-acronym">
                        <span>${contactInitials}</span> 
                    </div>
                    <span>${contact.name}</span> 
                </div>
                <input class="dropdwon-checkbox" type="checkbox" onclick="handleCheckboxClick(this)">
            </div>`;
        assignedContacts.innerHTML += contactHTML;
    }
}


function clearAssignedUsersArray() {
    assignedUsers = [];
>>>>>>> Stashed changes
}


/**
 * This function adds an event listener to the add task form element to prevent the default behaviour of the enter key
 */
function addEventListenerToAddForm() {
<<<<<<< Updated upstream
  document.getElementById("Add-Task-Form").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
}


/**
 * This function can be assigned to single elements so that clicking on enter within this elements submits the form
 *
 * @param {object} event
 */
function checkSubmission(event) {
  if (event.key == "Enter") {
    document.getElementById("submit-btn").click();
  }
}


/**
 * This function ensures that dates in the past can not be selected as due date
 *
 * @param {string} idOfElement - id of the input field for which the min date is set
 */
function setMinDueDate(idOfElement) {
  let startDate = new Date();
=======
    document.getElementById("Add-Task-Form").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
}

function checkSubmission(event) {
    if (event.key == "Enter") {
        document.getElementById("submit-btn").click();
    }
}

/**
* This function ensures that dates in the past can not be selected as due date
*
* @param {string} idOfElement - id of the input field for which the min date is set
*/
function setMinDueDate(idOfElement) {
    let startDate = new Date();

    let minYear = startDate.getFullYear();
    let minMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    let minDay = String(startDate.getDate()).padStart(2, "0");

    let today = `${minYear}-${minMonth}-${minDay}`;
    document.getElementById(idOfElement).setAttribute("min", today);
}
>>>>>>> Stashed changes

  let minYear = startDate.getFullYear();
  let minMonth = String(startDate.getMonth() + 1).padStart(2, "0");
  let minDay = String(startDate.getDate()).padStart(2, "0");

<<<<<<< Updated upstream
  let today = `${minYear}-${minMonth}-${minDay}`;
  document.getElementById(idOfElement).setAttribute("min", today);
=======
/**
* This function checks if the user is forwarded from the board - if this is the case the status for the submission of the form is taken from the local storage
* 
* @returns - true in case that user is forwarded from the board
*/
function checkReferringFromBoard() {
    if (document.referrer.slice(-10) == "board.html") {
        let statusFromBoard = localStorage.getItem('statusTransfer');
        if (statusFromBoard) {
            document.getElementById('Add-Task-Form').setAttribute("onsubmit", `submitTask('${statusFromBoard}'); return false;`);
        }
    }
>>>>>>> Stashed changes
}


/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent() {
  taskPrio = "Urgent";
  document.getElementById("urgentButton").classList.add("urgent-btn-red");
  document.getElementById("urgentButton").classList.remove("prio-btn-neutral");
  document.getElementById("urgent-icon").src = "./assets/img/Prio alta w.svg";

  document.getElementById("mediumButton").classList.remove("medium-btn-yellow");
  document.getElementById("mediumButton").classList.add("prio-btn-neutral");
  document.getElementById("medium-icon").src = "./assets/img/prio media y.svg";

  document.getElementById("lowButton").classList.remove("low-btn-green");
  document.getElementById("lowButton").classList.add("prio-btn-neutral");
  document.getElementById("low-icon").src = "./assets/img/Prio baja.svg";
}


/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsMedium() {
  taskPrio = "Medium";
  document.getElementById("mediumButton").classList.add("medium-btn-yellow");
  document.getElementById("mediumButton").classList.remove("prio-btn-neutral");
  document.getElementById("medium-icon").src = "./assets/img/capa 2.svg";

  document.getElementById("urgentButton").classList.remove("urgent-btn-red");
  document.getElementById("urgentButton").classList.add("prio-btn-neutral");
  document.getElementById("urgent-icon").src = "./assets/img/Prio alta2.svg";

  document.getElementById("lowButton").classList.remove("low-btn-green");
  document.getElementById("lowButton").classList.add("prio-btn-neutral");
  document.getElementById("low-icon").src = "./assets/img/Prio baja.svg";
}


/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsLow() {
  taskPrio = "Low";
  document.getElementById("lowButton").classList.add("low-btn-green");
  document.getElementById("lowButton").classList.remove("prio-btn-neutral");
  document.getElementById("low-icon").src = "./assets/img/Prio baja w.svg";

  document.getElementById("mediumButton").classList.remove("medium-btn-yellow");
  document.getElementById("mediumButton").classList.add("prio-btn-neutral");
  document.getElementById("medium-icon").src = "./assets/img/prio media y.svg";

  document.getElementById("urgentButton").classList.remove("urgent-btn-red");
  document.getElementById("urgentButton").classList.add("prio-btn-neutral");
  document.getElementById("urgent-icon").src = "./assets/img/Prio alta2.svg";
}


/**
 * activates the rotation of the arrow icon of the dropdown menu
 * by checkin the id's style (blocked or none) the dropdown menu will be de-/activated
 */
function activateDropdown() {
  const dropDownMenu = document.getElementById("assignedContactsCtn");
  const dropDownIcon = document.querySelector(".dropDownIcon");

  toggleIconRotation(); 
  dropDownMenu.style.display = dropDownMenu.style.display === "block" ? "none" : "block";
  renderContacts();

<<<<<<< Updated upstream
  if (dropDownMenu.style.display === "block") {
    document.body.addEventListener("click", clickOutsideHandler);
  } else {
    document.body.removeEventListener("click", clickOutsideHandler);
  }
}

=======
    if (dropDownMenu.style.display === "block") {
        document.body.addEventListener("click", clickOutsideHandler);
    } else {
        document.body.removeEventListener("click", clickOutsideHandler);
    }
}


function clickOutsideHandler(event) {
    const dropDownMenu = document.getElementById("assignedContactsCtn");

    if (!dropDownMenu.contains(event.target) && event.target.className !== "input-add-task") {
        dropDownMenu.style.display = "none";
    }
}

async function renderContacts() {
    if (!contactsRendered) {
        await renderCurrentUser();
        await renderOtherContacts();
        contactsRendered = true;
    }
}

async function renderCurrentUser() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    const existingContactNames = Array.from(document.querySelectorAll('#assignedContactsCtn .contact span:nth-child(2)')).map(span => span.innerText.trim());

    const currentUser = contactsSorted[0];
    const currentUserExists = existingContactNames.includes(currentUser.name);
    if (!currentUserExists) {
        const currentUserInitials = currentUser.acronymContact;
        const currentUserHTML = `
            <div class="contact">
                <div class="contact-circle-and-name-box">
                    <div style="background-color:${currentUser.colorContact}" class="task-detail-assigned-user-acronym">
                        <span>${currentUserInitials}</span> 
                    </div>
                    <span>${currentUser.name} (YOU)</span> 
                </div>
                <input class="dropdwon-checkbox" type="checkbox" onclick="handleCheckboxClick(this)">
            </div>`;
        assignedContacts.innerHTML += currentUserHTML;
    }
}

async function renderOtherContacts() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    const existingContactNames = Array.from(document.querySelectorAll('#assignedContactsCtn .contact span:nth-child(2)')).map(span => span.innerText.trim());

    for (let i = 1; i < contactsSorted.length; i++) {
        const contact = contactsSorted[i];
        const contactExists = existingContactNames.includes(contact.name);
        if (!contactExists) {
            const contactInitials = contact.acronymContact;
            const contactHTML = `
                <div class="contact">
                    <div class="contact-circle-and-name-box">
                        <div style="background-color:${contact.colorContact}" class="task-detail-assigned-user-acronym">
                            <span>${contactInitials}</span> 
                        </div>
                        <span>${contact.name}</span> 
                    </div>
                    <input class="dropdwon-checkbox" type="checkbox" onclick="handleCheckboxClick(this)">
                </div>`;
            assignedContacts.innerHTML += contactHTML;
        }
    }
}

function handleCheckboxClick(checkbox) {
    saveContactsToArray(checkbox);
    toggleActive(checkbox);
}

function toggleActive(checkbox) {
    const contact = checkbox.parentElement;
    if (checkbox.checked) {
        contact.classList.add('active');
    } else {
        contact.classList.remove('active');
    }
}


function saveContactsToArray(checkbox) {
    let parentContact = checkbox.closest('.contact');

    if (parentContact) {
        let userNameElement = parentContact.querySelector('.contact span:nth-child(2)');
        let userName = userNameElement.innerText.trim();

        userName = userName.replace(" (YOU)", "");

        let userNameParts = userName.split(' ');
        let firstName = userNameParts[0];
        let lastName = userNameParts.length > 1 ? userNameParts.slice(1).join(' ') : "";

        let foundContact = contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);

        if (foundContact) {
            let userID = foundContact.ID;

            if (checkbox.checked) {
                assignedUsers.push({ name: userName, ID: userID });
            } else {
                assignedUsers = assignedUsers.filter(contact => contact.ID !== userID);
            }

            renderCheckedContacts();
        } else {
            console.error("Kontakt mit dem Namen " + userName + " wurde nicht gefunden.");
        }
    } else {
        console.error("Fehler: Das übergeordnete Kontakt-Element wurde nicht gefunden.");
    }
}

function renderCheckedContacts() {
    let checkedContactsCtn = document.getElementById('checkedContactsCtn');
    checkedContactsCtn.innerHTML = '';

    assignedUsers.forEach(user => {
        const foundContact = contacts.find(contact => contact.ID === user.ID);
        if (foundContact) {
            let nameInitials;
            if (foundContact.lastName) {
                nameInitials = foundContact.acronymContact;
            } else {
                nameInitials = foundContact.name.charAt(0);
            }
            const contactBgColor = foundContact.colorContact;

            checkedContactsCtn.innerHTML += ` 
                <div class="checked-contact-box">
                    <div class="task-detail-assigned-user-acronym" style="background-color:${contactBgColor}">
                        <span>${nameInitials}</span> 
                    </div>
                </div>
            `;
        }
    });
}



>>>>>>> Stashed changes

/**
 * Toggles the rotation of the dropdown icon by 180 degrees
 */
function toggleIconRotation() {
  const dropDownIcon = document.querySelector(".dropDownIcon");
  dropDownIcon.classList.toggle("rotate180");
}


/**
 * This function ensures that the drop down with the contacts is closed when the user clicks outside of it in the add task forn
 *
 * @param {object} event
 */
function clickOutsideHandler(event) {
  const dropDownMenu = document.getElementById("assignedContactsCtn");
  if (!dropDownMenu.contains(event.target) && event.target.className !== "input-add-task") {
    dropDownMenu.style.display = "none";
  }
}


/**
 * This function renders the contacts in the drop down (if not available yet)
 */
async function renderContacts() {
  if (!contactsRendered) {
    await renderCurrentUser();
    await renderOtherContacts();
    contactsRendered = true;
  }
}


/**
 * This function renders the content for the current user in the drop down with the assigned users in the add task form
 */
async function renderCurrentUser() {
  const assignedContacts = document.getElementById("assignedContactsCtn");
  const existingContactNames = Array.from(
    document.querySelectorAll("#assignedContactsCtn .contact span:nth-child(2)")).map((span) => span.innerText.trim());

  const currentUser = contactsSorted[0];
  const currentUserExists = existingContactNames.includes(currentUser.name);
  if (!currentUserExists) {
    assignedContacts.innerHTML += await generateCurrentUserDropDownHTML(currentUser);
  }
}


/**
 * This function renders the content for the contacts in the drop down with the assigned users in the add task form
 */
async function renderOtherContacts() {
  const assignedContacts = document.getElementById("assignedContactsCtn");
  const existingContactNames = Array.from(
    document.querySelectorAll("#assignedContactsCtn .contact span:nth-child(2)")).map((span) => span.innerText.trim());

  for (let i = 1; i < contactsSorted.length; i++) {
    const contact = contactsSorted[i];
    const contactExists = existingContactNames.includes(contact.name);
    if (!contactExists) {
        assignedContacts.innerHTML += await generateContactDropDownHTML(contact);
    }
  }
}


/**
 * Handles clicking on a checkbox since it has to activate two functions.
 *
 * @param {HTMLInputElement} checkbox - The checkbox element that was clicked.
 */
function handleCheckboxClick(checkbox) {
  saveContactsToArray(checkbox);
  toggleActive(checkbox);
}


/**
 * Toggles the css active state/colorchange of a contact.
 *
 * @param {HTMLInputElement} checkbox - The checkbox element representing the contact.
 */
function toggleActive(checkbox) {
  const contact = checkbox.parentElement;
  if (checkbox.checked) {
    contact.classList.add("active");
  } else {
    contact.classList.remove("active");
  }
}


/**
 * This function searches the id of a contact based on the ID and depending on the status of the chechbox adds or removes it from the array with the assigned users
 *
 * @param {object} checkbox - checkbox of the element that is added or removed to the assigned contacts
 */
async function saveContactsToArray(checkbox) {
  let partsIdCheckbox = checkbox.id.split("-");
  let extractedIdOfUser = partsIdCheckbox.slice(2).join("-");

  if (extractedIdOfUser) {
    let userID = Number(extractedIdOfUser);
    let positionContact = contactsSorted.findIndex((id) => id["ID"] == userID);
    let userName = contactsSorted[positionContact]["name"];

    if (checkbox.checked) {
      assignedUsers.push({ name: userName, ID: userID });
    } else {
      assignedUsers = assignedUsers.filter(contact => contact.ID !== userID);
    }
    await renderCheckedContacts();
  }
}


/**
 * This function renders the icons for the currently selected contacts in the add task form
 */
async function renderCheckedContacts() {
    let checkedContactsCtn = document.getElementById('checkedContactsCtn');
    checkedContactsCtn.innerHTML = ''; 
    
    for (let i = 0; i < assignedUsers.length; i++){
        let foundContact = contactsSorted.find(contact => contact.ID === assignedUsers[i].ID);
        if (foundContact) {
            checkedContactsCtn.innerHTML += await generateIconCheckedContactHTML(foundContact);
        }
    }
}


/**
 * Gets the selected value from the category dropdown and pushes it into the category array
 * deletes the previous category before push
 */
function setCategory(i) {
  taskCategories = document.querySelector("#selectCategory");
  selectedCategory = taskCategories.value;
  category.splice(i, 1);
  category.push(selectedCategory);
}

<<<<<<< Updated upstream

/**
 * This function clears all inputs and arrays in the add task form
 */
async function clearForm() {
  addedSubtasks = [];
  clearAssignedUsersArray();
  resetFormElements();
  await renderCheckedContacts();
  changeButtonColorsMedium();
  loadNewSubtasks();
=======
function clearForm() {
    addedSubtasks = 0;

    clearAssignedUsersArray();
    resetFormElements();
    renderCheckedContacts();
    changeButtonColorsMedium();
    loadNewSubtasks()
>>>>>>> Stashed changes
}


/**
 * This function resets all the input fields in the add task form
 */
function resetFormElements() {
<<<<<<< Updated upstream
  document.getElementById("Add-Task-Form").reset();
}
=======
    document.getElementById("Add-Task-Form").reset();
}

>>>>>>> Stashed changes
