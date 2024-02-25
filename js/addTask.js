const SUBTASK_ID = 0;
let taskPrio = "Medium"; //MEDIUM ist the default Prio
let assignedUsers = []; //collects the checked users from the "Assginded to" menu
let category = []; //holds the chosen category from the form before submit
// let statusTask = "toDo"; //TO_DO ist the default status


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
    keypressEvent()
    changeSelectedTab('tab-add-task');
}

function clearAssignedUsersArray () {
    assignedUsers = [];
}

function keypressEvent() {
    document.getElementById('subtaskInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Unterdrückt die Standardaktion des Formulars für die Eingabetaste
            saveSubtaskToArray(); // Ruft die Funktion zum Hinzufügen der Teilaufgabe auf
        }
    });
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent(e) {
    let taskPrio = "Urgent";
    e.preventDefault();
    document.getElementById('urgentButton').classList.add("urgent-btn-red");
    document.getElementById('urgentButton').classList.remove("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow");
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';

    console.log("Current prio is " + taskPrio);
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsMedium(e) {
    let taskPrio = "Medium";
    e.preventDefault(); 
    document.getElementById('mediumButton').classList.add("medium-btn-yellow");
    document.getElementById('mediumButton').classList.remove("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/capa 2.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';

    console.log("Current prio is " + taskPrio);
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsLow(e) {
    let taskPrio = "Low";
    e.preventDefault();
    document.getElementById('lowButton').classList.add("low-btn-green");
    document.getElementById('lowButton').classList.remove("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow");
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';

    console.log("Current prio is " + taskPrio);
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

/**
 * Loads the user contacts to the "Assigned to" dropdown menu
 * It adds the initials, the username and a chekbox for every user
 * check if already rendered so it doesn't multiply
 */
async function renderContacts() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    const existingContacts = document.querySelectorAll('#assignedContactsCtn .contact span:last-child'); // Sammle bereits vorhandene Kontakte direkt aus dem DOM

    contacts.forEach((contact, index) => {
        // Überprüfe, ob der aktuelle Benutzer bereits im Container vorhanden ist
        const contactExists = Array.from(existingContacts).some(existingContact => existingContact.innerText === contact.name);
        
        // Überprüfen, ob der aktuelle Benutzer der aktuelle Benutzer ist, den wir hinzufügen möchten
        const isCurrentUser = index === 0; // Annahme: Der aktuelle Benutzer ist der erste Benutzer in der Liste

        if (!contactExists) {
            const nameInitials = contact.acronymContact; // Verwende das Akronym des Kontakts
            const contactName = isCurrentUser ? `${contact.name} (YOU)` : contact.name; // Füge "YOU" hinzu, wenn es sich um den aktuellen Benutzer handelt
            const contactBgColor = contact.colorContact;

            // Generiere HTML für den aktuellen Benutzer
            let contactHTML = `
                <div class="contact">
                    <div class="contact-circle-and-name-box">
                        <div style="background-color:${contactBgColor}" class="task-detail-assigned-user-acronym">
                            <span>${nameInitials}</span> 
                        </div>
                        <span>${contactName}</span> 
                    </div>
                    <input class="dropdwon-checkbox" type="checkbox" onclick="saveContactsToArray(this)">
                </div>`;

            // Füge das Kontakt-HTML dem Container hinzu
            assignedContacts.innerHTML += contactHTML;
        }
    });
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
