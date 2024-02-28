let addedSubtasks = []; //collects up all subtasks before sumbitting the form


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
    }
}


function checkInputSubtask(event) {
    if (event.key == "Enter") {
      saveSubtaskToArray();
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
                    <div id="subtaskListElement${i}" class="subtask-list"> 
                        <span>&#x2022; ${currentSubtaskTitle}</span>
                        <div class="subtask-icons"> 
                            <button class="delete-btn" type="button" onclick="deleteSubtask(${i})"></button>
                            <button class="confirm-btn" type="button" onclick="editSubtask(${i})"></button>
                        </div>
                    </div>`;
            }
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