const SUBTASK_ID = 0;

let tasks = []; // stores exsisting Tasks from the remote 

const taskPrio = PRIO_MEDIUM; //MEDIUM ist the default Prio
let addedSubtasks = []; //collects up all subtasks before sumbitting the form
let assignedUsers = []; //collects the checked users from the "Assginded to" menu
let category = []; //holds the chosen category from the form before submit
let statusTask = TO_DO; //TO_DO ist the default status

let users = [
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


async function initAddTask() {
    await includeHTML();
    //await loadUserData();//
    changeSelectedTab('tab-add-task');
}




/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent() {
    let taskPrio = PRIO_URGENT;
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
    let taskPrio = PRIO_MEDIUM; 
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
    let taskPrio = PRIO_LOW;
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
* Saves the subtasks fomt the subtaskInput to the array addedSubtasks
*/
function saveSubtaskToArray() {
    let newSubtask = document.getElementById('subtaskInput');
    let inputText = document.getElementById('subtaskInput');

    addedSubtasks.push(newSubtask.value);
    document.getElementById('subtaskInput').innerHTML = '';
    console.log("New Subtask is " + addedSubtasks);
    inputText.value = '';

    loadNewSubtasks();
};

/**
 * Iterrates through the array subtasks and renders the subtasks 
 * only adds a subtask if the array isn't empty
 */
function loadNewSubtasks() {
    let subtaskList = document.getElementById('added-subtask-ctn');
    subtaskList.innerHTML = '';

    for (let i = 0; i < addedSubtasks.length; i++) {
        const currentSubtask = addedSubtasks[i].trim();

        if (currentSubtask !== '') { // Checks if the input is empty before rendering to prevend adding an empty div

            subtaskList.innerHTML += `
                <div id="subtaskListElement${i}" class="subtask-list"> 
                    <span>&#x2022; ${currentSubtask}</span>
                    <div class="subtask-icons"> 
                        <button class="delete-btn" onclick="deleteSubtask(${i})"></button>
                        <button class="confirm-btn" onclick="editSubtask(${i})"></button>
                    </div>
                </div>`;
        }
    }
};

/**
 * This function deletes a subtask by clicking on the trashcan icon from the array
 */
function deleteSubtask(i) {
    addedSubtasks.splice(i, 1)
    loadNewSubtasks();
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
    for (let i = 0; i < users.length; i++) {
      const names = users[i].name.split(" "); //Splits the value of the "name" into an array of substrings by separating the string where a space occurs.
      let nameInitials = names[0].charAt(0).toUpperCase(); //Takes the first character and changes them to Upper Case
      nameInitials += names[names.length - 1].charAt(0).toUpperCase(); //combines the two first characters of the name

      assignedContacts.innerHTML += `
          <div>
            <div>
              <span>${nameInitials}</span>
              <span>${users[i].name}</span>
            </div>
            <input type="checkbox">
          </div>`;
    };
}

//  <input type="checkbox" class="checkbox" data-name-initials="${nameInitials}">
//  const userColor = getUserColor(i); -----> <span class="name_initials" style="background-color: ${userColor}">${nameInitials}</span>

//            <div class="option" data-index="${i}" onclick="addBackgroundColour(${i}); toggleCheckbox(${i})">

