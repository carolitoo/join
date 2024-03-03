let addedSubtasks = []; //collects up all subtasks before sumbitting the form

function checkInputSubtask(event) {
    if (event.key == "Enter") {
      saveSubtaskToArray();
    }
  }

function changeInputSubtaskButtons() {
    let plusButton = document.getElementById("input-subtask-btn-ctn")
    plusButton.innerHTML = `
        <button class="x-btn" type="button" onclick="defaultInputSubtask()"></button>
        <div class="small-divider"></div>
        <button class="check-sub-btn" type="button" onclick="saveSubtaskToArray()"></button>
    `
}

function defaultInputSubtask() {

    let buttonsContainer = document.getElementById("input-subtask-btn-ctn")
    buttonsContainer.innerHTML = `    
        <button type="button" id="plus-btn" class="subtask-plus-btn" onclick="changeInputSubtaskButtons()"></button>
    `
    document.getElementById('subtaskInput').value = '';
}

/**
* Saves the subtasks fomt the subtaskInput to the array addedSubtasks
*/
function saveSubtaskToArray() {
    let inputText = document.getElementById('subtaskInput').value.trim(); // Den Wert des Eingabefeldes abrufen und führende/trailing Leerzeichen entfernen
    if (inputText) { // Überprüfen, ob das Eingabefeld nicht leer ist
        let timeStampSubtask = new Date().getTime();

        let newSubtask = {
            'idSubtask':  `task-${timeStampSubtask}`,
            'titleSubtask': inputText,
            'statusSubtask': "open",
        }

        addedSubtasks.push(newSubtask);
        document.getElementById('subtaskInput').value = '';
        console.log("New Subtask is " + JSON.stringify(addedSubtasks));

        loadNewSubtasks(); // Hier wird die loadNewSubtasks-Funktion aufgerufen
        defaultInputSubtask()
    }
}

/**
 * Iterrates through the array subtasks and renders the subtasks 
 * only adds a subtask if the array isn't empty
 */
function loadNewSubtasks() {
    let subtaskList = document.getElementById('added-subtask-ctn');
    subtaskList.innerHTML = '';

    for (let i = 0; i < addedSubtasks.length; i++) {
        
        if (addedSubtasks[i].titleSubtask && typeof addedSubtasks[i].titleSubtask === 'string') {
            const currentSubtaskTitle = addedSubtasks[i].titleSubtask.trim();
            
            if (currentSubtaskTitle !== '') {
                subtaskList.innerHTML += `
                    <div id="subtaskListElement${i}" class="subtask-list" onmouseover="showElement('subtask-icons${i}')" onmouseout="hideElement('subtask-icons${i}')"> 
                        <span>&#x2022; ${currentSubtaskTitle}</span>
                        <div class="subtask-icons d-none" id="subtask-icons${i}"> 
                            <button class="delete-btn" type="button" onclick="deleteSubtask(${i})"></button>
                            <button class="confirm-btn" type="button" onclick="editSubtask(${i})"></button>
                        </div>
                    </div>`;
            }
        }
    }
};

function editSubtask(i) {
    let subtaskElement = document.getElementById(`subtaskListElement${i}`);
    let subtaskText = subtaskElement.querySelector('span').innerText.trim();
    
    // Extrahiere den Text ohne den Bullet Point
    let subtaskTitle = subtaskText.slice(2).trim();
    
    // Eingabefeld für die Bearbeitung der Subtask erstellen
    subtaskElement.innerHTML = `
        <input type="text" id="editedSubtask${i}" class="input-add-task" value="${subtaskTitle}">
        <div class="subtask-icons"> 
            <button class="delete-btn" type="button" onclick="deleteSubtask(${i})"></button>
            <button class="confirm-btn" type="button" onclick="updateSubtask(${i})"></button>
        </div>
    `;
}

function updateSubtask(i) {
    let editedSubtaskTitle = document.getElementById(`editedSubtask${i}`).value.trim();
    if (editedSubtaskTitle) {
        addedSubtasks[i].titleSubtask = editedSubtaskTitle;
        loadNewSubtasks();
    } else {
        // Handle empty title case
        alert("Subtask title cannot be empty!");
    }

    console.log(addedSubtasks)
}



/**
 * This function deletes a subtask by clicking on the trashcan icon from the array
 */
function deleteSubtask(i) {
    addedSubtasks.splice(i, 1)
    loadNewSubtasks();
}