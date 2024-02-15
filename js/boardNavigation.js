let currentIdTask;
let currentDraggedElement;
let idOfCurrentDraggedElement;
let statusOfCurrentDraggedElement;
let matchingStatusTask = [
    {
        "statusTask": 'toDo', 
        "statusTaskName": 'To Do',
    }, 
    {
        "statusTask": 'inProgress', 
        "statusTaskName": 'In Progress',
    }, 
    {
        "statusTask": 'awaitFeedback', 
        "statusTaskName": 'Await Feedback',
    }, 
    {
        "statusTask": 'done', 
        "statusTaskName": 'Done',
    }
]

// let startX;
// let startY;

// function checkScrollY(e) {
//     console.log(e)
// }



function changeStatusMobile(event, currentStatus, idTask) {
    event.stopPropagation();
    currentIdTask = idTask;
    openSubmenuChangeStatusMobile(currentStatus);
}


async function openSubmenuChangeStatusMobile(currentStatus) {
    document.getElementById(`ctn-submenu-card-small-${currentIdTask}`).innerHTML = '';
    document.getElementById(`ctn-submenu-card-small-${currentIdTask}`).innerHTML += `<span>Change Status</span>`;

    for (i = 0; i < statusTask.length; i++) {
        if (statusTask[i] != currentStatus) {
            let newStatusName = matchingStatusTask.find(element => element.statusTask == statusTask[i]).statusTaskName;
            document.getElementById(`ctn-submenu-card-small-${currentIdTask}`).innerHTML += await generateElementSubmenuChangeStatusCardSmallHTML(`'${statusTask[i]}'`, `${newStatusName}`);
        }
    }

    document.getElementById('overlay-board-submenu').classList.remove('d-none');
    document.getElementById(`ctn-submenu-card-small-${currentIdTask}`).classList.remove('d-none');
    document.getElementById(`ctn-card-show-more-small-${currentIdTask}`).classList.add('d-none');
}


/**
 * This function closes the overlay that is opened when the submenu to change the status is selected and also resets the submenu and the "show-more"-button (only relevant for mobile view)
 */
function closeSubmenuChangeStatusMobile() {
    document.getElementById('overlay-board-submenu').classList.add('d-none');
    document.getElementById(`ctn-submenu-card-small-${currentIdTask}`).classList.add('d-none');
    document.getElementById(`ctn-card-show-more-small-${currentIdTask}`).classList.remove('d-none');
}


/**
 * This function initiates moving a card on the board by identifying its id and displaying the drag-animation
 * 
 * @param {number} idTask - id of the task moved
 */
function moveElement(idTask) {
    currentIdTask = idTask;
    currentDraggedElement = document.getElementById(`card-task-small-${idTask}`);
    
    currentDraggedElement.style.transform = 'rotate(5deg)';
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
    let heightOfDraggedElement = document.getElementById(`card-task-small-${currentIdTask}`).offsetHeight;

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
    positionOfTask = tasks.findIndex(id => id['idTask'] == currentIdTask);
    return tasks[positionOfTask]['statusTask'];
}


/**
 * This function assignes the new status to a task that was shifted to another status per drag-and-drop then renders the board and resets the view to default (if necessary)
 * 
 * @param {string} newStatus - status of the task after moving it 
 */
function moveElementTo(newStatus) {
    positionOfTask = tasks.findIndex(id => id['idTask'] == currentIdTask);

    tasks[positionOfTask]['statusTask'] = newStatus;
    renderBoard(tasks);

    hidePreview(newStatus);
    document.getElementById('overlay-board-submenu').classList.add('d-none');
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





// function scrollY(event) {
//   isDragging = true;
//   let startY = event.clientY;
//   let initialScrollTop = window.scrollY;

//   function onMouseMove(event) {
//     if (isDragging) {
//       let deltaY = event.clientY - startY;
//       window.scrollTo(initialScrollTop - deltaY);
//       console.log(deltaY);
//     }
//   }

//   function onMouseUp() {
//     isDragging = false;
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseup", onMouseUp);
//   }

//   document.addEventListener("mousemove", onMouseMove);
//   document.addEventListener("mouseup", onMouseUp);
// }



// function checkScroll(idTask) {
//     let dragElement = document.getElementById(`card-task-small-${idTask}`);
//     let dragElementTop = dragElement.getBoundingClientRect().top;
//     let heightDraggedElement = dragElement.offsetHeight;
//     let pufferScroll = 30;

//     if (dragElementTop + heightDraggedElement + pufferScroll > window.innerHeight) {
//         window.scrollBy(0, 100);
//         console.log('Scroll-down');
//     } else if (dragElementTop - pufferScroll < 0) {
//         window.scrollBy(0, -100);
//         console.log(dragElementTop);
//         console.log('Scroll-up');
//     }
// }