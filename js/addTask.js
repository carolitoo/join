const SUBTASK_ID = 0;
let taskPrio = "Medium"; //MEDIUM ist the default Prio
let assignedUsers = []; //collects the checked users from the "Assginded to" menu
let category = []; //holds the chosen category from the form before submit
// let statusTask = "toDo"; //TO_DO ist the default status
let contactsRendered = false;

async function initAddTask() {
    await includeHTML();
    await loadUserData();
    await getLoggedInEmail();
    await proofAuthentification(loggedInEmail);
    await renderAcronym(loggedInEmail);
    await loadUserData();
    await loadContacts();
    await loadTasks();
    clearAssignedUsersArray();
    changeSelectedTab('tab-add-task');
    addEventListenerToAddForm();
    setMinDueDate('task-input-dueDate');
}

function clearAssignedUsersArray () {
    assignedUsers = [];
}


function addEventListenerToAddForm() {
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


/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent() {
    taskPrio = "Urgent";
    document.getElementById('urgentButton').classList.add("urgent-btn-red");
    document.getElementById('urgentButton').classList.remove("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow");
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsMedium() {
    taskPrio = "Medium";
    document.getElementById('mediumButton').classList.add("medium-btn-yellow");
    document.getElementById('mediumButton').classList.remove("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/capa 2.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsLow() {
    taskPrio = "Low";
    document.getElementById('lowButton').classList.add("low-btn-green");
    document.getElementById('lowButton').classList.remove("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow");
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';
}

/**
 * activates the rotation of the arrow icon of the dropdown menu 
 * by checkin the id's style (blocked or none) the dropdown menu will be de-/activated
 */
function activateDropdown() {
    const dropDownMenu = document.getElementById("assignedContactsCtn");
    const dropDownIcon = document.querySelector(".dropDownIcon");

    // Umkehren der Klasse für das Dropdown-Symbol
    dropDownIcon.classList.toggle("active");

    // Öffnen oder Schließen des Dropdown-Menüs
    dropDownMenu.style.display = dropDownMenu.style.display === "block" ? "none" : "block";

    // Rendern der Kontakte
    renderContacts();

    // Wenn das Dropdown-Menü geöffnet ist, fügen Sie einen Event-Listener hinzu, um Klicks außerhalb des Menüs zu überwachen
    if (dropDownMenu.style.display === "block") {
        document.body.addEventListener("click", clickOutsideHandler);
    } else {
        // Wenn das Dropdown-Menü geschlossen ist, entfernen Sie den Event-Listener
        document.body.removeEventListener("click", clickOutsideHandler);
    }
}

// Funktion zur Verarbeitung von Klicks außerhalb des Dropdown-Menüs
function clickOutsideHandler(event) {
    const dropDownMenu = document.getElementById("assignedContactsCtn");

    // Überprüfen, ob das geklickte Element nicht Teil des Dropdown-Menüs und nicht das Eingabefeld ist
    if (!dropDownMenu.contains(event.target) && event.target.className !== "input-add-task") {
        // Wenn ja, schließen Sie das Dropdown-Menü
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

    // Generiere HTML für den aktuellen Benutzer (der erste Kontakt in der Liste ist der aktuelle Benutzer)
    const currentUser = contacts[0];
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
                <input class="dropdwon-checkbox" type="checkbox" onclick="saveContactsToArray(this)">
            </div>`;
        assignedContacts.innerHTML += currentUserHTML;
    }
}

async function renderOtherContacts() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    const existingContactNames = Array.from(document.querySelectorAll('#assignedContactsCtn .contact span:nth-child(2)')).map(span => span.innerText.trim());

    // Generiere HTML für die anderen Kontakte
    for (let i = 1; i < contacts.length; i++) {
        const contact = contacts[i];
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
                    <input class="dropdwon-checkbox" type="checkbox" onclick="saveContactsToArray(this)">
                </div>`;
            assignedContacts.innerHTML += contactHTML;
        }
    }
}

function saveContactsToArray(checkbox) {
    let parentContact = checkbox.closest('.contact');

    if (parentContact) {
        let userNameElement = parentContact.querySelector('.contact span:nth-child(2)');
        let userName = userNameElement.innerText.trim(); // Benutzernamen bereinigen

        // Entferne "(YOU)" aus dem Benutzernamen, falls vorhanden
        userName = userName.replace(" (YOU)", "");

        let foundContact = contacts.find(contact => contact.name === userName);

        if (foundContact) {
            let userID = foundContact.ID;

            if (checkbox.checked) {
                assignedUsers.push({ name: userName, ID: userID }); // Den Namen und die ID in assignedUsers pushen
            } else {
                // Den Kontakt aus assignedUsers basierend auf der ID entfernen
                assignedUsers = assignedUsers.filter(contact => contact.ID !== userID);
            }
            
            renderCheckedContacts(); // Aktualisierte Liste der ausgewählten Kontakte anzeigen
        } else {
            console.error("Kontakt mit dem Namen " + userName + " wurde nicht gefunden.");
        }
    } else {
        console.error("Fehler: Das übergeordnete Kontakt-Element wurde nicht gefunden.");
    }
}

function renderCheckedContacts() {
    let checkedContactsCtn = document.getElementById('checkedContactsCtn');
    checkedContactsCtn.innerHTML = ''; // Clearing the container content to ensure no old content remains before rendering the updated contacts
    
    assignedUsers.forEach(contact => { // Iterating over each element in the assignedUsers array
        const foundContact = contacts.find(c => c.name === contact.name);
        if (foundContact) {
            const nameInitials = foundContact.acronymContact;
            const contactName = foundContact.name;
            const contactBgColor = foundContact.colorContact; // Farbe des Kreises von den vorhandenen Kontakten übernehmen

            // Adding a new DOM element for each checked contact to the container
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

/**
 * Gets the selcted value fron the Category dropdown and pushes it into the category array
 * delets the previouse categroy befor push
 */
function setCategory(i) {
    taskCategories = document.querySelector('#selectCategory');
    selectedCategory = taskCategories.value;
    category.splice(i, 1);
    category.push(selectedCategory);

    console.log("The selcted Category is " + selectedCategory);
}

function clearForm() {
    addedSubtasks = 0;
    
    clearAssignedUsersArray();
    resetFormElements();
    renderCheckedContacts();
    changeButtonColorsMedium();
    loadNewSubtasks()
}

function resetFormElements() {
    document.getElementById("Add-Task-Form").reset();
  }

