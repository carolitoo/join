let currentDraggedElement;
let statusOfCurrentDraggedElement;
let statusTask = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
let tasks = [];
let positionOfTask;


async function initBoard() {
    await includeHTML();
    await loadDummyContacts();
    // await loadNewUserContacts();
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
 * This function filters the available tasks for each status and calls the functions to create the HTML-content for each task on the kanban board
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
            let currentIdTask = selectedTasks[j]['idTask'];
            positionOfTask = currentTasks.findIndex(id => id['idTask'] == currentIdTask);
 
            document.getElementById(`tasks-${status}`).innerHTML += await generateCardSmallHTML(currentTasks, positionOfTask, currentIdTask);
            await createDynamicElementsCardSmall (currentTasks, positionOfTask, currentIdTask);
         }
     } 
}


/**
 * This function sets the dynamic values for a task/ card on the kanban board
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the card on the kanban board is created
 * @param {string} currentIdTask - id of the task for which the card on the kanban board is created
 */
async function createDynamicElementsCardSmall (currentTasks, positionOfTask, currentIdTask) {
    getSelectedCategory(`category-task-${currentIdTask}`, currentTasks, positionOfTask);
    await checkSubtasks(currentTasks, positionOfTask);
    await checkAssignedContactsCardSmall(currentTasks, positionOfTask, currentIdTask);
    getSelectedPriority(`img-prio-task-${currentIdTask}`, currentTasks, positionOfTask);
}


/**
 * This function gets the category of a given task and sets the corresponding background-color 
 * 
 * @param {string} idOfElement - id of the element for which the background-color should be set
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the category should be determinated
 */
function getSelectedCategory(idOfElement, currentTasks, positionOfTask) {
    let categoryOfTask = currentTasks[positionOfTask]['category'];

    if (categoryOfTask == 'User Story') {
        document.getElementById(idOfElement).style.backgroundColor = '#0038FF';
    } else if (categoryOfTask == 'Technical Task') {
        document.getElementById(idOfElement).style.backgroundColor = '#1FD7C1';
    } 
}


/**
 * This functions checks if a task has subtasks
 * If a task has subtasks it calls a function to calculate the progress - if a tasks has no subtasks the progress bar is not displayed at all
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the completion rate is calculated
 */
async function checkSubtasks(currentTasks, positionOfTask) {
    let numberOfSubtasks = currentTasks[positionOfTask]['subtasks'].length;

    if (numberOfSubtasks == 0) {
        document.getElementById(`ctn-card-subtasks-small-${currentTasks[positionOfTask]['idTask']}`).classList.add('d-none');
    } else {
        calculateProgressSubtasks(currentTasks, positionOfTask, numberOfSubtasks);
    }
}


/**
 * This functions calculates the completion rate of the subtasks of a given task so that the progress bar and the title can be displayed correctly
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the completion rate is calculated
 * @param {number} numberOfSubtasks - number of subtasks of the task currently selected
 */
function calculateProgressSubtasks(currentTasks, positionOfTask, numberOfSubtasks) {
    let numberOfSubtasksClosed = 0;

    for (k=0; k < numberOfSubtasks; k++) {
        if (currentTasks[positionOfTask]['subtasks'][k]['statusSubtask'] == 'closed') {
            numberOfSubtasksClosed++;
        }
    }

    let completionOfSubtasks = numberOfSubtasksClosed / numberOfSubtasks *100;
    document.getElementById(`progress-task-${currentTasks[positionOfTask]['idTask']}`).style.width = completionOfSubtasks + '%';
    document.getElementById(`span-subtasks-${currentTasks[positionOfTask]['idTask']}`).innerHTML = `${numberOfSubtasksClosed}/${numberOfSubtasks}`;
    document.getElementById(`ctn-card-subtasks-small-${currentTasks[positionOfTask]['idTask']}`).title = `${numberOfSubtasksClosed} of ${numberOfSubtasks} subtasks completed`;
}


/**
 * This function checks the number of assigned contacts to a task and creates the content for the kanban card depending on this number
 * Up to 4 contacts/ icons are displayed on the card - in case of more assigned contacts a dummy-icon indicates the number of the remaining contacts 
 * In case that no contacts are assigned to a task nothing is displayed
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the card on the kanban board is created
 * @param {string} currentIdTask - id of the task for which the card on the kanban board is created
 */
async function checkAssignedContactsCardSmall(currentTasks, positionOfTask, currentIdTask) {

    let maxNumberOfDisplayedContacts = 4; 
    let numberOfAssignedContacts = currentTasks[positionOfTask]['assignedContacts'].length;
    let numberOfRemainigContacts = numberOfAssignedContacts - maxNumberOfDisplayedContacts;

    if (numberOfAssignedContacts <= maxNumberOfDisplayedContacts && numberOfAssignedContacts > 0) {
        for (let u = 0; u < numberOfAssignedContacts; u++) {
            await getAssignedContactsCardSmall(currentTasks, positionOfTask, currentIdTask, u);
        }
    } else if (numberOfAssignedContacts > maxNumberOfDisplayedContacts && numberOfAssignedContacts > 0) {
        for (let u = 0; u < maxNumberOfDisplayedContacts - 1; u++) {
            await getAssignedContactsCardSmall(currentTasks, positionOfTask, currentIdTask, u);
        }
        await setOverflowContactIcon(currentIdTask, numberOfRemainigContacts);
    }
}


/**
 * This function generates the icon for a single contact assigned to task on the kanban board
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the card on the kanban board is created
 * @param {string} currentIdTask - id of the task for which the card on the kanban board is created
 * @param {number} u - element/ assigned user in the for loop for which the icon is created
 */
async function getAssignedContactsCardSmall(currentTasks, positionOfTask, currentIdTask, u) {
    let idContact = currentTasks[positionOfTask]['assignedContacts'][u]['idContact'];
    let positionContact = contacts.findIndex((id) => id["idContact"] == idContact);

    document.getElementById(`ctn-card-assigned-users-small-${currentIdTask}`).innerHTML += await generateContactIconCardSmallHTML(currentIdTask, idContact);
    document.getElementById(`card-assigned-user-small-${currentIdTask}-${idContact}`).innerHTML = await contacts[positionContact]['acronymContact'];
    document.getElementById(`card-assigned-user-small-${currentIdTask}-${idContact}`).style.backgroundColor = await contacts[positionContact]['colorContact'];
}


/**
 * This function creates the element indicating the remaining assigned contacts for a task (in case of an overflow)
 * 
 * @param {string} currentIdTask - id of the task for which the card on the kanban board is created
 * @param {number} numberOfRemainigContacts - number of contacts for which no icon is displayed on the small card on the kanban board
 */
async function setOverflowContactIcon(currentIdTask, numberOfRemainigContacts) {
    document.getElementById(`ctn-card-assigned-users-small-${currentIdTask}`).innerHTML += await generateContactIconCardSmallHTML(currentIdTask, 'overflow');
    document.getElementById(`card-assigned-user-small-${currentIdTask}-overflow`).innerHTML = `+${numberOfRemainigContacts}`;
    document.getElementById(`card-assigned-user-small-${currentIdTask}-overflow`).style.backgroundColor = 'grey';
}


/**
 * This function gets the priority currently selected of the given task and sets the corresponding image 
 * 
 * @param {string} idImgElement - id of the img element indicating the priority of the task
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the priority should be determinated
 */
function getSelectedPriority(idImgElement, currentTasks, positionOfTask) {
    let priorityOfTask = currentTasks[positionOfTask]['priority'];

    if (priorityOfTask == 'Urgent') {
        document.getElementById(idImgElement).src = "./assets/img/prio_high_color.svg";
    } else if (priorityOfTask == 'Medium') {
        document.getElementById(idImgElement).src = "./assets/img/prio_medium_color.svg";
    } else if (priorityOfTask == 'Low') {
        document.getElementById(idImgElement).src = "./assets/img/prio_low_color.svg";
    }
}


/**
 * This function gets the subtasks of the selected task
 * If a tasks has no subtasks the section for the subtasks is not displayed at all
 * 
 * @param {string} idOfElement - id of the element where the subtasks should be inserted
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask - position of the task (in the array currentTasks) for which the substasks are created
 */
async function getSelectedSubtasks(idOfElement, currentTasks, positionOfTask) {
    document.getElementById(idOfElement).innerHTML = ``;
    let currentId = currentTasks[positionOfTask]['idTask'];
    let numberOfSubtasks = currentTasks[positionOfTask]['subtasks'].length;

    if (numberOfSubtasks == 0) {
        document.getElementById(`ctn-task-detail-subtasks`).classList.add('d-none');
    } else {
        for (k=0; k < numberOfSubtasks; k++) {
            let idOfSubtask = currentTasks[positionOfTask]['subtasks'][k]['idSubtask'];
            let titleOfSubtask = currentTasks[positionOfTask]['subtasks'][k]['titleSubtask'];
    
            if (currentTasks[positionOfTask]['subtasks'][k]['statusSubtask'] == 'closed') {
                document.getElementById(idOfElement).innerHTML += await generateSubtasksDetailClosedHTML(currentId, idOfSubtask, titleOfSubtask);
            } else if (currentTasks[positionOfTask]['subtasks'][k]['statusSubtask'] == 'open') {
                document.getElementById(idOfElement).innerHTML += await generateSubtasksOpenDetailHTML(currentId, idOfSubtask, titleOfSubtask);
            }
        }
    }
}


/**
 * This function initiates moving a card on the board by identifying its id and displaying the drag-animation
 * 
 * @param {number} idTask - id of the task moved
 */
function moveElement(idTask) {
    currentDraggedElement = idTask;
    document.getElementById(`card-task-small-${idTask}`).style.transform = 'rotate(5deg)';
}


/**
 * This function allows to drop an element above the element containing this function via drag-and-drop (standard function)
 * This function also indicates visually that the task can be moved to another column (only if hovered over another status than the current status of the task)
 * 
 * @param {object} event
 * @param {string} newStatus - status of the column where the task might be dropped
 */
function allowDropWithPreview(event, newStatus) {
    event.preventDefault();
    statusOfCurrentDraggedElement = checkStatusofCurrentDraggedElement();
    let heightOfDraggedElement = document.getElementById(`card-task-small-${currentDraggedElement}`).offsetHeight;

    if (statusOfCurrentDraggedElement != newStatus) {
        document.getElementById(`preview-drop-task-${newStatus}`).style.height = `${heightOfDraggedElement}px`;
        document.getElementById(`preview-drop-task-${newStatus}`).classList.remove('d-none');
        document.getElementById(`empty-tasks-${newStatus}`).classList.add('d-none');
    }
}


/**
 * This function ensures that the preview for a task is only displayed while the task is dragged over an element/ status
 * 
 * @param {string} status - status of the column where the task was hovered over 
 */
function hidePreview(status) {
    document.getElementById(`preview-drop-task-${status}`).classList.add('d-none');
}


/**
 * This function checks the status of the currently dragged element
 * 
 * @returns - status of the currently dragged element
 */
function checkStatusofCurrentDraggedElement() {
    positionOfTask = tasks.findIndex(id => id['idTask'] == currentDraggedElement);
    return tasks[positionOfTask]['statusTask'];
}


/**
 * This function assignes the new status to a task that was shifted to another status per drag-and-drop then renders the board 
 * 
 * @param {string} newStatus - status of the task after moving it 
 */
function moveElementTo(newStatus) {
    positionOfTask = tasks.findIndex(id => id['idTask'] == currentDraggedElement);

    tasks[positionOfTask]['statusTask'] = newStatus;
    renderBoard(tasks);
    hidePreview(newStatus);
}


/**
 * This function ensures that a card on the kanban board returns to its original position when it is dropped 
 * 
 * @param {number} idTask - id of the task moved/ dragged
 */
function resetCardAndBoard(idTask) {
    document.getElementById(`card-task-small-${idTask}`).style.transform = 'rotate(0deg)';
    renderBoard(tasks);
}


/**
 * This function compares the content of the input field with all the tasks available - it transmits the selected tasks to the render function
 * The user gets an information if no tasks are found 
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

    if (includedTasks.length > 0) {
        document.getElementById('ctn-board').classList.remove('d-none');
        document.getElementById('board-no-results').classList.add('d-none');
        renderBoard(includedTasks);
    } else {
        document.getElementById('ctn-board').classList.add('d-none');
        document.getElementById('board-no-results').classList.remove('d-none');
    } 
}


/**
 * This function opens an overlay with the nested (updated) detailed view of a task - it also prevents the scrolling of content in the background
 * 
 * @param {string} idTask - id of the task in the array "tasks" for which the details are opened
 */
async function openTaskDetail(idTask) {
    positionOfTask = tasks.findIndex(id => id['idTask'] == idTask);

    document.getElementById('overlay-board').innerHTML = await generateViewTaskDetailHTML(positionOfTask, idTask);
    getSelectedCategory('task-detail-category', tasks, positionOfTask);
    getSelectedPriority('img-prio-task-detail', tasks, positionOfTask);
    checkAssignedContactsViedTaskDetail(positionOfTask);
    getSelectedSubtasks('task-detail-subtasks', tasks, positionOfTask);

    document.getElementById('overlay-board').classList.remove('d-none');
    document.getElementsByTagName('body')[0].classList.add('disable-scroll');
    
    document.getElementById('ctn-task-detail').classList.add('translate-x');
    setTimeout(() => {
        document.getElementById('ctn-task-detail').classList.remove('translate-x');
    }, 10)  
}


/**
 * This function checks if contacts are assigned to the task for which the detailed view is opened
 * If no contacts are assigned the div-container for the assigned contacts isn't displayed else the function to create the assigned contacts is called
 * 
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the detailed view is displayed
 */
async function checkAssignedContactsViedTaskDetail (positionOfTask) {
    let numberOfAssignedContacts = tasks[positionOfTask]['assignedContacts'].length;

    if (numberOfAssignedContacts == 0) {
        document.getElementById(`ctn-task-detail-assigned-users`).classList.add('d-none');
    } else {
        await getAssignedContactsViewTaskDetail (positionOfTask, numberOfAssignedContacts);
    }
}


/**
 * This function calls the function to generate the HTML-Code for each assigned contact in the detailed view of a task
 * 
 * @param {number} positionOfTask - position of the task (in the array tasks) for which the detailed view is displayed
 * @param {number} numberOfAssignedContacts - number of the assigned contacts for the displayed task
 */
async function getAssignedContactsViewTaskDetail (positionOfTask, numberOfAssignedContacts) {
    document.getElementById('ctn-task-detail-assigned-users-wrapper').innerHTML = '';

    for (u = 0; u < numberOfAssignedContacts; u++) {
        let idContact = tasks[positionOfTask]['assignedContacts'][u]['idContact'];
        let positionContact = contacts.findIndex((id) => id["idContact"] == idContact);

        document.getElementById('ctn-task-detail-assigned-users-wrapper').innerHTML += await generateContactViewTaskDetailHTML(positionContact, idContact);
        document.getElementById(`task-detail-assigned-user-acronym-${idContact}`).style.backgroundColor = contacts[positionContact]['colorContact'];
    }
}


/**
 * This function closes the overlay (containig the detailed view of a task) and ensures that scrolling is possible after closing the overlay 
 */
function closeTaskDetails() {
    document.getElementById('overlay-board').classList.add('d-none');
    document.getElementsByTagName('body')[0].classList.remove('disable-scroll');
}


function checkScroll(idTask) {
    let dragElement = document.getElementById(`card-task-small-${idTask}`);
    let dragElementTop = dragElement.getBoundingClientRect().top;
    let heightDraggedElement = dragElement.offsetHeight;
    let pufferScroll = 30;

    if (dragElementTop + heightDraggedElement + pufferScroll > window.innerHeight) {
        window.scrollBy(0, 100);
        console.log('Scroll-down');
    } else if (dragElementTop - pufferScroll < 0) {
        window.scrollBy(0, -100);
        console.log(dragElementTop);
        console.log('Scroll-up');
    }
}
