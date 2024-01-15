let currentDraggedElement;
let statusTask = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
let tasks = [];


async function initBoard() {
    await includeHTML();
    await loadTasks();
    renderBoard();
}


/** 
 * This function loads all the tasks currently existing into a JSON-Array
 */
async function loadTasks() {
    let resp = await fetch('../tasks.json');
    tasks = await resp.json();
}


/**
 * This function iterates through the given status, deletes the HTML-content of each column/ status and calls the functions to update the HTML-content
 */
function renderBoard() {
    for (i=0; i< statusTask.length; i++) {
        document.getElementById(`tasks-${statusTask[i]}`).innerHTML = ``;
        updateStatus(statusTask[i]);
    }
}


/**
 * This function empties the array for each status then iterates through all available tasks to update the arrays
 * This function filters the available tasks for each status and calls the function to create the HTML-content for each column
 * If there is no task available for a certain status a container shows that currenty there are no tasks in this status
 * 
 * @param {string} status - indicates the column/ status that is updated
 */
async function updateStatus(status) {
     let selectedTasks = tasks.filter(t => t['statusTask'] == status);

     if (selectedTasks.length == 0) {
         document.getElementById(`empty-tasks-${status}`).classList.remove('d-none');
     } else {
         document.getElementById(`empty-tasks-${status}`).classList.add('d-none');
         for (j = 0; j < selectedTasks.length; j++) {
            let currentId = selectedTasks[j]['idTask'];
            let positionOfTask = tasks.findIndex(id => id['idTask'] == currentId);

            document.getElementById(`tasks-${status}`).innerHTML += await generateCardSmallHTML(`${positionOfTask}`);
            getSelectedCategory(currentId, positionOfTask)
            calculateProgressSubtasks(currentId, positionOfTask);
            // getAssignedUsers();
            getSelectedPriority(currentId, positionOfTask);
         }
     } 
}


/**
 * This function gets the category of the given task and sets the corresponding background-color 
 * 
 * @param {number} idTask - id of the task for which the category should be determinated
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the category should be determinated
 */

function getSelectedCategory(idTask, positionOfTask) {
    let categoryOfTask = tasks[positionOfTask]['category'];

    if (categoryOfTask == 'User Story') {
        document.getElementById(`category-task-${idTask}`).style.backgroundColor = '#0038FF';
        ;
    } else if (categoryOfTask == 'Technical Task') {
        document.getElementById(`category-task-${idTask}`).style.backgroundColor = '#1FD7C1';
    } 
}


/**
 * This functions calculates the completion rate of the subtasks of a given task so that the progress bar can be displayed correctly
 * 
 * @param {number} idTask - id of the task for which the completion rate of the subtasks is calculated 
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the completion rate is calculated
 */
function calculateProgressSubtasks(idTask, positionOfTask) {
    let numberOfSubtasks = tasks[positionOfTask]['subtasks'].length;
    let numberOfSubtasksClosed = 0;

    for (k=0; k < numberOfSubtasks; k++) {
        if (tasks[positionOfTask]['subtasks'][k]['statusSubtask'] == 'closed')
        numberOfSubtasksClosed++;
    }

    let completionOfSubtasks = numberOfSubtasksClosed / numberOfSubtasks *100;

    document.getElementById(`progress-task-${idTask}`).style.width = completionOfSubtasks + '%';
    document.getElementById(`span-subtasks-${idTask}`).innerHTML = `${numberOfSubtasksClosed}/${numberOfSubtasks}`;
}


// function getAssignedUsers(idTask, positionOfTask) {

//     document.getElementById(`users-task-${idTask}`).innerHTML =
// }


/**
 * This function gets the priority currently selected of the given task and sets the corresponding image 
 * 
 * @param {number} currentId  - id of the task for which the priority should be determinated
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the priority should be determinated
 */
function getSelectedPriority(idTask, positionOfTask) {
    let priorityOfTask = tasks[positionOfTask]['priority'];

    if (priorityOfTask == 'Urgent') {
        document.getElementById(`img-prio-task-${idTask}`).src = "./assets/img/prio_high_color.svg";
    } else if (priorityOfTask == 'Medium') {
        document.getElementById(`img-prio-task-${idTask}`).src = "./assets/img/prio_medium_color.svg";
    } else if (priorityOfTask == 'Low') {
        document.getElementById(`img-prio-task-${idTask}`).src = "./assets/img/prio_low_color.svg";
    }
}


function moveElement(idTask) {
    currentDraggedElement = idTask;
}


function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function assignes the new status to a task that was shifted to another status per drag-and-drop then renders the board 
 * 
 * @param {string} newStatus - status of the task after moving it 
 */


function moveElementTo(newStatus) {
    let currentId = currentDraggedElement;
    let positionOfTask = tasks.findIndex(id => id['idTask'] == currentId);

    tasks[positionOfTask]['statusTask'] = newStatus;
    renderBoard();
}


// open layover/ detailed view
function openElement(idTask) {

}



// **** GENERATE HTML-CODE ****

/**
 * This function generates the HTML-Code for the small cards on the kanban board
 * 
 * USER ARE STILL STATIC // NEEDS TO BE REPLACED BY FUNCTION "GETASSIGNEDUSERS" AFTER DEFINING "ARCHITECTURE" FOR USERS
 * 
 * @param {number} positionTask -  position of the task for which the card on the kanban board should be created in the array "tasks" 
 * @returns - HTML-Code for one single small card/ task
 */
async function generateCardSmallHTML(positionOfTask) {
    return /*html*/ `
    <div class="card-task-small" draggable="true" ondragstart="moveElement(${tasks[positionOfTask]['idTask']})" onclick="openElement(${tasks[positionOfTask]['idTask']})">
        <div class="card-category-small" id="category-task-${tasks[positionOfTask]['idTask']}">${tasks[positionOfTask]['category']}</div>
        <div class="ctn-card-text-small">
            <div class="card-title-small">${tasks[positionOfTask]['titleTask']}</div>
            <div class="card-description-small">${tasks[positionOfTask]['descriptionTask']}</div>
        </div>

        <div class="ctn-card-subtasks-small">
            <div class="ctn-card-progress-bar-small">
                <div class="card-progress-bar-small" id="progress-task-${tasks[positionOfTask]['idTask']}"></div>
            </div>
            <span class="card-span-subtasks-small" id="span-subtasks-${tasks[positionOfTask]['idTask']}"></span>
        </div>
        
        <div class="ctn-card-user-prio-small">
            <div class="ctn-card-assigned-users-small" id="users-task-${tasks[positionOfTask]['idTask']}">
                <div class="card-assigned-user-small">AM</div>
                <div class="card-assigned-user-small">EM</div>
                <div class="card-assigned-user-small">MB</div>
            </div>
        <img class="img-card-priority-small" id="img-prio-task-${tasks[positionOfTask]['idTask']}" src="./assets/img/prio_medium_color.svg"/>
        </div>
    </div>
    `
}
