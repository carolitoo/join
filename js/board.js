let currentDraggedElement;
let statusTask = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
let tasks = [];


async function initBoard() {
    await includeHTML();
    await loadTasks();
    renderBoard();
}


/** 
 * This function loads all the tasks currently existing into an JSON-Array
 */
async function loadTasks() {
    let resp = await fetch('../tasks.json');
    tasks = await resp.json();
}


/**
 * This function iterates through the given status, deletes the HTML-content of each column/ status and calls the functions to update the arrays and the HTML-content
 */
function renderBoard() {
    for (i=0; i< statusTask.length; i++) {
        document.getElementById(`tasks-${statusTask[i]}`).innerHTML = ``;
        updateStatus(statusTask[i]);
        // updateStatusContent(statusTask[i]);
    }
}


/**
 * This function empties the array for each status then iterates through all available tasks to update the arrays
 * 
 * @param {string} status - indicates the column/ status that is updated
 */
// function updateStatusArray(status) {
//     let array = [];
//     for (i = 0; i< tasks.length; i++) {
//         if (tasks[i]['statusTask'] == status) {
//             array.push(tasks[i]);
//         }
//     }
//     console.log(array);
// }

function updateStatus(status) {
     let selectedTasks = tasks.filter(t => t['statusTask'] == status);

     if (selectedTasks.length == 0) {
         document.getElementById(`empty-tasks-${status}`).classList.remove('d-none');
     } else {
         document.getElementById(`empty-tasks-${status}`).classList.add('d-none');
         for (j = 0; j < selectedTasks.length; j++) {
            let currentId = selectedTasks[j]['idTask'];
            let positionOfTask = tasks.findIndex(id => id['idTask'] == currentId);
             document.getElementById(`tasks-${status}`).innerHTML += generateCardSmallHTML(`${positionOfTask}`);
         }
     } 
}


/**
 * This function iterates through the arrays of each status and creates the HTML-content for each column
 * If the array is empty a container shows that currenty there are no tasks in this status
//  * 
//  * @param {string} status - indicates the column/ status that is updated
//  */
// function updateStatusContent(status) {
//     if (status.length == 0) {
//         document.getElementById(`empty-tasks-${status}`).classList.add('d-none');
//     } else {
//         document.getElementById(`empty-tasks-${status}`).classList.remove('d-none');
//         for (i = 0; i< status.length; i++) {
//             document.getElementById(`tasks-${status}`).innerHTML += generateCardSmallHTML(`${status[i]}`);
//         }
//     }
// }



function moveElement(idTask) {
    currentDraggedElement = idTask;
}


function allowDrop(event) {
    event.preventDefault();
}


function moveElementTo(newStatus) {
    let currentId = currentDraggedElement;
    let positionOfTask = tasks.findIndex(id => id['idTask'] == currentId);

    tasks[positionOfTask]['statusTask'] = newStatus;

    renderBoard();
}


function openElement(idTask) {

}




// **** GENERATE HTML-CODE ****

/**
 * This function generates the HTML-Code for the small cards on the kanban board 
 *
 * !! FUNCTION IS NOT READY/ DYNAMIC YET - NEEDS TO BE ADJUSTED SO THAT ASSIGNED USERS, PROGRESS BAR & IMG FOR PRIORITY ARE FLEXIBEL !!
 * 
 * @param {number} positionTask -  position of the task for which the card on the kanban board should be created in the array "tasks" 
 * @returns - HTML-Code for one single small card/ task
 */

function generateCardSmallHTML(positionOfTask) {
    return /*html*/ `
    <div class="card-task-small" draggable="true" ondragstart="moveElement(${tasks[positionOfTask]['idTask']})" onclick="openElement(${tasks[positionOfTask]['idTask']})">
        <div class="card-category-small">${tasks[positionOfTask]['category']}</div>
        <div class="ctn-card-text-small">
            <div class="card-title-small">${tasks[positionOfTask]['titleTask']}</div>
            <div class="card-description-small">${tasks[positionOfTask]['descriptionTask']}</div>
        </div>

        <div class="ctn-card-subtasks-small">
            <div class="ctn-card-progress-bar-small">
                <div class="card-progress-bar-small"></div>
            </div>
            <span class="card-span-subtasks-small">1/2 Subtasks</span>
        </div>
        
        <div class="ctn-card-user-prio-small">
            <div class="ctn-card-assigned-users-small">
                <div class="card-assigned-user-small">AM</div>
                <div class="card-assigned-user-small">EM</div>
                <div class="card-assigned-user-small">MB</div>
            </div>
        <img class="img-card-priority-small" src="./assets/img/prio_media_color.svg"/>
        </div>
    </div>
    `
}
