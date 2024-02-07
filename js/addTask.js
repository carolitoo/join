const SUBTASK_ID = 0;
let dummyUsers = [
    {
        'name': 'Tim Test',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'Ana Conda',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'Harray Potter',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'Gitta Pull',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },

];  //dummy array for users in the remote storage 

let tasks = []; // stores exsisting Tasks from the remote 
let taskPrio = "PRIO_MEDIUM"; //MEDIUM ist the default Prio
let assignedUsers = []; //collects the checked users from the "Assginded to" menu
let category = []; //holds the chosen category from the form before submit
let statusTask = "TO_DO"; //TO_DO ist the default status
let checkboxStates = {};

async function initAddTask() {
    await includeHTML();
    //await loadUserData();//
    changeSelectedTab('tab-add-task');
}


/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent() {
    let taskPrio = "PRIO_URGENT";
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
function changeButtonColorsMedium() {
    let taskPrio = "PRIO_MEDIUM"; 
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
function changeButtonColorsLow() {
    let taskPrio = "PRIO_LOW";
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

    dummyUsers.forEach(user => {
        // Überprüfe, ob der aktuelle Benutzer bereits im Container vorhanden ist
        const userExists = Array.from(existingContacts).some(contact => contact.innerText === user.name);
        if (!userExists) {
            const names = user.name.split(" ");
            let nameInitials = names[0].charAt(0).toUpperCase();
            nameInitials += names[names.length - 1].charAt(0).toUpperCase();

            assignedContacts.innerHTML += `
                <div class="contact">
                    <div>
                        <span>${nameInitials}</span>
                        <span>${user.name}</span>
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

        let selectedContact = {
            name: userName // Pass the full name as 'name' property
        };

        if (checkbox.checked) {
            assignedUsers.push(selectedContact);
        } else {
            // Remove the contact from assignedUsers based on full name match
            assignedUsers = assignedUsers.filter(contact => contact.name !== selectedContact.name);
        }
        
        renderCheckedContacts(); // Render the updated list of selected contacts
    } else {
        console.error("Fehler: Das übergeordnete Kontakt-Element wurde nicht gefunden.");
    }
}

function renderCheckedContacts() {
    let checkedContactsCtn = document.getElementById('checkedContactsCtn');
    checkedContactsCtn.innerHTML = ''; // Clearing the container content to ensure no old content remains before rendering the updated contacts
    
    assignedUsers.forEach(contact => { // Iterating over each element in the assignedUsers array
        const names = contact.name.split(" "); // Splitting the full name into first and last names
        let nameInitials = names[0].charAt(0).toUpperCase(); // Extracting the initials from the first and last names
        nameInitials += names[names.length - 1].charAt(0).toUpperCase();

        // Adding a new DOM element for each checked contact to the container
        checkedContactsCtn.innerHTML += ` 
        <div>
            <div class="circle-wth-initials">
                <span>${nameInitials}</span> <!-- Displaying the initials of the contact -->
            </div>
            <span>${contact.name}</span> <!-- Displaying the full name of the contact -->
        </div>
        `;
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

