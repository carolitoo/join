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
    await loadUserData();//
    await loadContacts();
    await loadTasks();
    clearAssignedUsersArray();
    changeSelectedTab('tab-add-task');
}

function clearAssignedUsersArray () {
    assignedUsers = [];
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
    dropDownIcon.classList.toggle("active");
    dropDownMenu.style.display =
        dropDownMenu.style.display === "block" ? "none" : "block";

    renderContacts();
}

/**
 * Loads the user contacts to the "Assigned to" dropdown menu
 * It adds the initials, the username and a chekbox for every user
 * check if already rendered so it doesn't multiply
 */
function renderContacts() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    const existingContacts = assignedContacts.querySelectorAll('.contact span:last-child'); // Sammle bereits vorhandene Kontakte

    contacts.forEach(contact => {
        // Überprüfe, ob der aktuelle Benutzer bereits im Container vorhanden ist
        const contactExists = Array.from(existingContacts).some(existingContact => existingContact.innerText === contact.name);
        if (!contactExists) {
            const nameInitials = contact.acronymContact; // Verwende das Akronym des Kontakts
            const contactName = contact.name; // Korrekte Zuweisung des Kontakt-Namens

            assignedContacts.innerHTML += `
                <div class="contact">
                    <div>
                        <span>${nameInitials}</span> <!-- Initialen des Kontakts -->
                        <span>${contactName}</span> <!-- Name des Kontakts -->
                    </div>
                    <input type="checkbox" onclick="saveContactsToArray(this)">
                </div>`;
        }
    });
}

function saveContactsToArray(checkbox) {
    let parentContact = checkbox.closest('.contact');

    if (parentContact) {
        let userName = parentContact.querySelector('span:last-child').innerText;
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

            // Adding a new DOM element for each checked contact to the container
            checkedContactsCtn.innerHTML += ` 
            <div class="checked-contact-box">
                <div class="circle-wth-initials">
                    <span>${nameInitials}</span> <!-- Displaying the initials of the contact -->
                </div>
                <span>${contactName}</span> <!-- Displaying the full name of the contact -->
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
