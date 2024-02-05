let addedSubtasks = []; //collects up all subtasks before sumbitting the form

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