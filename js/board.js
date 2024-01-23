let currentDraggedElement;
let statusTask = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
let tasks = [];
let positionOfTask;


async function initBoard() {
    await includeHTML();
    await loadTasks();
    await renderBoard(tasks);
    changeSelectedTab('tab-board');
}


/** 
 * This function loads all the tasks currently existing into a JSON-Array
 */
async function loadTasks() {
    let resp = await fetch('../tasks.json');
    tasks = await resp.json();
}


/**
 * This function iterates through all the status and selects the tasks for this status based on the tasks currently selected
 * It deletes the HTML-content of each column/ status and calls the functions to update the HTML-content
 * 
 * @param {array} currentTasks - array of tasks currently selected
 */
async function renderBoard(currentTasks) {
    for (i=0; i< statusTask.length; i++) {
        document.getElementById(`tasks-${statusTask[i]}`).innerHTML = ``;
        await updateStatus(statusTask[i], currentTasks);
    }
}


/**
 * This function empties the array for each status then iterates through all available tasks to update the arrays
 * This function filters the available tasks for each status and calls the function to create the HTML-content for each column
 * If there is no task available for a certain status a container shows that currenty there are no tasks in this status
 * 
 * @param {string} status - indicates the column/ status that is updated
 * @param {array} currentTasks - array of tasks currently selected
 */
async function updateStatus(status, currentTasks) {
     let selectedTasks = currentTasks.filter(t => t['statusTask'] == status);

     if (selectedTasks.length == 0) {
         document.getElementById(`empty-tasks-${status}`).classList.remove('d-none');
     } else {
         document.getElementById(`empty-tasks-${status}`).classList.add('d-none');
         for (j = 0; j < selectedTasks.length; j++) {
            let currentId = selectedTasks[j]['idTask'];
            positionOfTask = currentTasks.findIndex(id => id['idTask'] == currentId);
 
            document.getElementById(`tasks-${status}`).innerHTML += await generateCardSmallHTML(currentTasks,positionOfTask);
            getSelectedCategory(currentTasks, positionOfTask)
            calculateProgressSubtasks(currentTasks, positionOfTask);
            // getAssignedUsers();
            getSelectedPriority(currentTasks, positionOfTask);
         }
     } 
}


/**
 * This function gets the category of a given task and sets the corresponding background-color 
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the category should be determinated
 */
function getSelectedCategory(currentTasks, positionOfTask) {
    let categoryOfTask = currentTasks[positionOfTask]['category'];

    if (categoryOfTask == 'User Story') {
        document.getElementById(`category-task-${currentTasks[positionOfTask]['idTask']}`).style.backgroundColor = '#0038FF';
    } else if (categoryOfTask == 'Technical Task') {
        document.getElementById(`category-task-${currentTasks[positionOfTask]['idTask']}`).style.backgroundColor = '#1FD7C1';
    } 
}


/**
 * This functions calculates the completion rate of the subtasks of a given task so that the progress bar can be displayed correctly
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the completion rate is calculated
 */
function calculateProgressSubtasks(currentTasks, positionOfTask) {
    let numberOfSubtasks = currentTasks[positionOfTask]['subtasks'].length;
    let numberOfSubtasksClosed = 0;

    for (k=0; k < numberOfSubtasks; k++) {
        if (currentTasks[positionOfTask]['subtasks'][k]['statusSubtask'] == 'closed')
        numberOfSubtasksClosed++;
    }

    let completionOfSubtasks = numberOfSubtasksClosed / numberOfSubtasks *100;

    document.getElementById(`progress-task-${currentTasks[positionOfTask]['idTask']}`).style.width = completionOfSubtasks + '%';
    document.getElementById(`span-subtasks-${currentTasks[positionOfTask]['idTask']}`).innerHTML = `${numberOfSubtasksClosed}/${numberOfSubtasks}`;
}


// function getAssignedUsers(idTask, positionOfTask) {

//     document.getElementById(`users-task-${idTask}`).innerHTML =
// }


/**
 * This function gets the priority currently selected of the given task and sets the corresponding image 
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the priority should be determinated
 */
function getSelectedPriority(currentTasks, positionOfTask) {
    let priorityOfTask = currentTasks[positionOfTask]['priority'];

    if (priorityOfTask == 'Urgent') {
        document.getElementById(`img-prio-task-${currentTasks[positionOfTask]['idTask']}`).src = "./assets/img/prio_high_color.svg";
    } else if (priorityOfTask == 'Medium') {
        document.getElementById(`img-prio-task-${currentTasks[positionOfTask]['idTask']}`).src = "./assets/img/prio_medium_color.svg";
    } else if (priorityOfTask == 'Low') {
        document.getElementById(`img-prio-task-${currentTasks[positionOfTask]['idTask']}`).src = "./assets/img/prio_low_color.svg";
    }
}


function moveElement(idTask) {
    currentDraggedElement = idTask;
    document.getElementById(`card-task-small-${idTask}`).style.transform = 'rotate(5deg)';
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
    positionOfTask = tasks.findIndex(id => id['idTask'] == currentId);

    tasks[positionOfTask]['statusTask'] = newStatus;
    renderBoard(tasks);
}


function resetRotation(idTask) {
    document.getElementById(`card-task-small-${idTask}`).style.transform = 'rotate(0deg)';
}


/**
 * This function compares the content of the input field with all the tasks available
 * It transmits the selected tasks to the render function
 */
async function searchTask() {
    let searchInput = document.getElementById('searchTask').value.toUpperCase();
    let includedTasks = [];

    for (let p=0; p < tasks.length; p++) {
        let title = tasks[p]['titleTask'].toUpperCase();
        let description = tasks[p]['descriptionTask'].toUpperCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            includedTasks.push(tasks[p]);
        } 
    }

    await renderBoard(includedTasks);
}


// open layover/ detailed view
function openElement(idTask) {

    document.getElementsByTagName('body')[0].classList.add('disable-scroll');
}

// close layover/ detailed view
function closeTaskDetails() {
    document.getElementById('overlay-board').classList.add('d-none');
    document.getElementsByTagName('body')[0].classList.remove('disable-scroll');
}


function stopPropagation (event) {
    event.stopPropagation();
}



// **** GENERATE HTML-CODE ****

/**
 * This function generates the HTML-Code for the small cards on the kanban board
 * 
 * USER ARE STILL STATIC // NEEDS TO BE REPLACED BY FUNCTION "GETASSIGNEDUSERS" AFTER DEFINING "ARCHITECTURE" FOR USERS
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask -  position of the task for which the card on the kanban board should be created in the array "tasks" 
 * @returns - HTML-Code for one single small card/ task
 */
async function generateCardSmallHTML(currentTasks, positionOfTask) {
    return /*html*/ `
    <div class="card-task-small" id="card-task-small-${currentTasks[positionOfTask]['idTask']}" draggable="true" ondragstart="moveElement(${currentTasks[positionOfTask]['idTask']})" ondragend="resetRotation(${currentTasks[positionOfTask]['idTask']})" onclick="openElement(${currentTasks[positionOfTask]['idTask']})">
        <div class="card-category-small" id="category-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['category']}</div>
        <div class="ctn-card-text-small">
            <div class="card-title-small" id="title-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['titleTask']}</div>
            <div class="card-description-small" id="description-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['descriptionTask']}</div>
        </div>

        <div class="ctn-card-subtasks-small">
            <div class="ctn-card-progress-bar-small">
                <div class="card-progress-bar-small" id="progress-task-${currentTasks[positionOfTask]['idTask']}"></div>
            </div>
            <span class="card-span-subtasks-small" id="span-subtasks-${currentTasks[positionOfTask]['idTask']}"></span>
        </div>
        
        <div class="ctn-card-user-prio-small">
            <div class="ctn-card-assigned-users-small" id="users-task-${currentTasks[positionOfTask]['idTask']}">
                <div class="card-assigned-user-small">AM</div>
                <div class="card-assigned-user-small">EM</div>
                <div class="card-assigned-user-small">MB</div>
            </div>
        <img class="img-card-priority-small" id="img-prio-task-${currentTasks[positionOfTask]['idTask']}" src="./assets/img/prio_medium_color.svg"/>
        </div>
    </div>
    `
}
