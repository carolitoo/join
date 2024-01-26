/**
 * This function generates the HTML-Code for the small cards on the kanban board
 * 
 * USERS ARE STILL STATIC // NEED TO BE REPLACED BY FUNCTION "GETASSIGNEDUSERS" AFTER DEFINING "ARCHITECTURE" FOR USERS
 * 
 * @param {array} currentTasks - array of tasks currently selected
 * @param {number} positionOfTask -  position of the task for which the card on the kanban board should be created in the array currentTasks
 * @returns - HTML-Code for one single small card/ task
 */
async function generateCardSmallHTML(currentTasks, positionOfTask) {
    return /*html*/ `
    <div class="card-task-small" id="card-task-small-${currentTasks[positionOfTask]['idTask']}" draggable="true" ondragstart="moveElement(${currentTasks[positionOfTask]['idTask']})" ondragend="resetRotation(${currentTasks[positionOfTask]['idTask']})" onclick="openTaskDetail(${currentTasks[positionOfTask]['idTask']})">
        <div class="card-category-small" id="category-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['category']}</div>
        <div class="ctn-card-text-small">
            <div class="card-title-small" id="title-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['titleTask']}</div>
            <div class="card-description-small" id="description-task-${currentTasks[positionOfTask]['idTask']}">${currentTasks[positionOfTask]['descriptionTask']}</div>
        </div>

        <div class="ctn-card-subtasks-small" id="ctn-card-subtasks-small-${currentTasks[positionOfTask]['idTask']}">
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


/**
 * This function generates the HTML-Code for the detailed view of a single task (selected from the kanban board)
 * 
 * USERS ARE STILL STATIC // NEED TO BE REPLACED BY FUNCTION "GETASSIGNEDUSERS" AFTER DEFINING "ARCHITECTURE" FOR USERS
 * 
 * @param {array} currentTasks  - array of tasks currently selected
 * @param {number} positionOfTask  -  position of the task for which the card on the kanban board should be created in the array currentTasks
 * @returns  - HTML-Code for the detailed view of the selected task
 */
async function generateViewTaskDetailHTML(currentTasks, positionOfTask) {
    return /*html*/ `
    <div class="ctn-task-detail" id="ctn-task-detail" onclick="stopPropagation(event)">
        <div class="ctn-task-detail-header">
          <div class="task-detail-category" id="task-detail-category">${currentTasks[positionOfTask]['category']}</div>
          <div class="ctn-task-detail-close">
            <img class="task-detail-close" src="./assets/img/close_black.svg" onclick="closeTaskDetails()">
          </div>
        </div>
        <h1>${currentTasks[positionOfTask]['titleTask']}</h1>
        <div>${currentTasks[positionOfTask]['descriptionTask']}</div>
        <div class="ctn-task-detail-date">
          <span class="color-bg">Due date:</span>
          <div>${(new Date(currentTasks[positionOfTask]['dueDate'])).toLocaleDateString('en-US')}</div>
        </div>
        <div class="ctn-task-detail-priority">
          <span class="color-bg">Priority:</span>
          <div class="ctn-task-detail-priority-right">
            <div>${currentTasks[positionOfTask]['priority']}</div>
            <img id="img-prio-task-detail" src="./assets/img/prio_medium_color.svg">
          </div>
        </div>
        <div class="ctn-task-detail-assigned-users">
          <div class="color-bg">Assigned To:</div>
          <div class="ctn-task-detail-assigned-users-wrapper">
            <div class="ctn-task-detail-single-assigned-user">
              <div class="task-detail-assigned-user-acronym">EM</div>
              <div class="task-detail-assigned-user-name">Emmanuel Mauer</div>
            </div>
            <div class="ctn-task-detail-single-assigned-user">
              <div class="task-detail-assigned-user-acronym">MB</div>
              <div class="task-detail-assigned-user-name">Marcel Bauer</div>
            </div>
            <div class="ctn-task-detail-single-assigned-user">
              <div class="task-detail-assigned-user-acronym">AM</div>
              <div class="task-detail-assigned-user-name">Anton Mayer</div>
            </div>
          </div>
        </div>

        <div class="ctn-task-detail-subtasks" id="ctn-task-detail-subtasks">
            <div class="color-bg">Subtasks</div>
            <div id="task-detail-subtasks">
                <div class="ctn-task-detail-single-subtask">
                    <img class="task-detail-checkbox" src="./assets/img/checkbox_checked_default.svg">
                    <div></div>
                </div>
                <div class="ctn-task-detail-single-subtask">
                    <img class="task-detail-checkbox" src="./assets/img/checkbox_blank_default.svg">
                    <div></div>
                </div>
            </div>
        </div>

        <div class="ctn-task-detail-edit-delete">
          <div class="ctn-task-detail-edit-delete-single" onmouseover="changeImgTo('img-task-detail-delete', 'delete_lb')" onmouseout="changeImgTo('img-task-detail-delete', 'delete_default')">
            <img id="img-task-detail-delete" src="./assets/img/delete_default.svg">
            <span>Delete</span>
          </div>
          <div class="task-detail-separator-edit"></div>
          <div class="ctn-task-detail-edit-delete-single" onmouseover="changeImgTo('img-task-detail-edit', 'edit_lb')" onmouseout="changeImgTo('img-task-detail-edit', 'edit_default')">
            <img id="img-task-detail-edit" src="./assets/img/edit_default.svg">
            <span>Edit</span>
          </div>
        </div>

      </div>`
}


/**
 * This function generates the HTML-Code for a single closed subtask within the detailed view of a task
 * 
 * CHECK LATER IF MERGE WITH "generateSubtasksOpenDetailHTML" IS POSSIBLE/ MAKES SENSE
 * 
 * @param {number} idOfTask - id of the task for which the detailed view is opened
 * @param {number} idOfSubtask - id of the subtask for which the HTML-Code should be created
 * @param {string} titleOfSubtask - title of the subtask for which the HTML-Code should be created
 * @returns - HTML-Code for a single closed subtask within the detailed view of a task
 */
async function generateSubtasksDetailClosedHTML(idOfTask, idOfSubtask, titleOfSubtask) {
    return /*HTML*/ `
        <div class="ctn-task-detail-single-subtask" id="subtask-${idOfTask}-${idOfSubtask}">
        <img class="task-detail-checkbox" src="./assets/img/checkbox_checked_default.svg">
        <div>${titleOfSubtask}</div>
    </div>
    `
}


/**
 * This function generates the HTML-Code for a single open subtask within the detailed view of a task
 * 
 * CHECK LATER IF MERGE WITH "generateSubtasksClosedDetailHTML" IS POSSIBLE/ MAKES SENSE
 * 
 * @param {number} idOfTask - id of the task for which the detailed view is opened
 * @param {number} idOfSubtask - id of the subtask for which the HTML-Code should be created
 * @param {string} titleOfSubtask - title of the subtask for which the HTML-Code should be created
 * @returns - HTML-Code for a single open subtask within the detailed view of a task
 */
async function generateSubtasksOpenDetailHTML(idOfTask, idOfSubtask, titleOfSubtask) {
    return /*HTML*/ `
        <div class="ctn-task-detail-single-subtask" id="subtask-${idOfTask}-${idOfSubtask}">
        <img class="task-detail-checkbox" src="./assets/img/checkbox_blank_default.svg">
        <div>${titleOfSubtask}</div>
    </div>
    `
}