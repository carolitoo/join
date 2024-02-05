const SUBTASK_ID = 0;
let dummyUsers = [
    {
        'name': 'tim test',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'tim test',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'tim test',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },
    {
        'name': 'tim test',
        'email': 'test@testmail.de',
        'password': 'test123',
        'confirmedPassword': 'test123'
    },

];  //dummy array for users in the remote storage 

let tasks = []; // stores exsisting Tasks from the remote 
let taskPrio = "PRIO_MEDIUM"; //MEDIUM ist the default Prio
let assignedUsers = []; //collects the checked users from the "Assginded to" menu
let category = []; //holds the chosen category from the form before submit
let statusTask = TO_DO; //TO_DO ist the default status

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

        console.log("Dropdown menu style after toggle:", dropDownMenu.style.display);
    
    renderContacts();
}

/**
 * Loads the user contacts the the "Assigned to" dropdown menu
 * It adds the initials, the username and a chekbox for every user
 * Adds event listeners for background color change and checkbox toggle.
 */
function renderContacts() {
    const assignedContacts = document.getElementById("assignedContactsCtn");
    for (let i = 0; i < dummyUsers.length; i++) {
      const names = dummyUsers[i].name.split(" "); //Splits the value of the "name" into an array of substrings by separating the string where a space occurs.
      let nameInitials = names[0].charAt(0).toUpperCase(); //Takes the first character and changes them to Upper Case
      nameInitials += names[names.length - 1].charAt(0).toUpperCase(); //combines the two first characters of the name

      assignedContacts.innerHTML += `
          <div>
            <div>
              <span>${nameInitials}</span>
              <span>${dummyUsers[i].name}</span>
            </div>
            <input type="checkbox">
          </div>`;
    };
}

//  <input type="checkbox" class="checkbox" data-name-initials="${nameInitials}">
//  const userColor = getUserColor(i); -----> <span class="name_initials" style="background-color: ${userColor}">${nameInitials}</span>
//            <div class="option" data-index="${i}" onclick="addBackgroundColour(${i}); toggleCheckbox(${i})">

