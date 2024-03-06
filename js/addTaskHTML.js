/**
 * This function return the HTML-Code for the element of the current user in the dropdown menu for assigning users to a task 
 * 
 * @param {number} positionContact - position of the contact of the current user
 * @param {string} idTask - id of the task that is currenty edited
 * @returns - HTML-Code for the element of the current user in the dropdown menu for assigning users to a task 
 */
async function generateCurrentUserDropDownHTML(positionContact, idTask) {
    return /*html*/ `
    <div class="contact">
        <div class="contact-circle-and-name-box">
            <div style="background-color:${contacts[positionContact]['colorContact']}" class="task-detail-assigned-user-acronym">
                <span>${contacts[positionContact]['acronymContact']}</span> 
            </div>
            <span>${contacts[positionContact]['name']} (YOU)</span> 
        </div>
        <input class="dropdwon-checkbox" id="checkbox-${idTask}-${positionContact}" type="checkbox" onclick="saveContactsToArray(this)"/>
    </div>
`
}


/**
 * This function return the HTML-Code for a single element/ user in the dropdown menu for assigning users to a task 
 * 
 * @param {number} positionContact  - position of the contact for which the element in the dropdown is created
 * @param {string} idTask - id of the task that is currenty edited
 * @returns - HTML-Code for a single element/ user in the dropdown menu for assigning users to a task 
 */
async function generateContactDropDownHTML(positionContact, idTask) {
    return /*html*/ `
    <div class="contact">
        <div class="contact-circle-and-name-box">
            <div style="background-color:${contacts[positionContact]['colorContact']}" class="task-detail-assigned-user-acronym">
                <span>${contacts[positionContact]['acronymContact']}</span> 
            </div>
            <span>${contacts[positionContact]['name']}</span> 
        </div>
        <input class="dropdwon-checkbox" id="checkbox-${idTask}-${positionContact}" type="checkbox" onclick="saveContactsToArray(this)"/>
    </div>
`
}


/**
 * This function generates the HTML-Code for a single subtask in the list of subtasks
 * 
 * @param {number} positionSubtask - position of the subtask
 * @param {string} currentSubtaskTitle - title of the subtask
 * @returns 
 */
async function generateSingleSubtaskHTML(positionSubtask, currentSubtaskTitle) {
    return /*html*/ `
    <div id="subtaskListElement${positionSubtask}" class="subtask-list" onmouseover="showElement('subtask-icons${positionSubtask}')" onmouseout="hideElement('subtask-icons${positionSubtask}')" onclick="editSubtask(${positionSubtask})"> 
        <span>&#x2022; ${currentSubtaskTitle}</span>
        <div class="subtask-icons d-none" id="subtask-icons${positionSubtask}"> 
            <button class="delete-btn" type="button" onclick="deleteSubtask(${positionSubtask}), stopPropagation(event)"></button>
            <button class="confirm-btn" type="button" onclick="editSubtask(${positionSubtask})"></button>
        </div>
    </div>
    `
}


/**
 * This function generates the HTML-Code for a subtask in the edit mode
 * 
 * @param {number} i - id/ counter of the edited subtask
 * @param {string} subtaskTitle - title of the subtask that is edited
 * @returns - HTML-Code for a subtask in the edit mode
 */
async function generateEditSubtaskHTML(i, subtaskTitle) {
    return /*HTML*/ `
        <input class="input-edit-subtask" type="text" id="editedSubtask${i}" class="input-add-task" value="${subtaskTitle}" onkeyup="checkInputEditSubtask(event, i)">
        <div class="subtask-icons"> 
            <button class="check-square-btn" type="button" onclick="updateSubtask(${i})"></button>
            <button class="delete-btn white-bg" type="button" onclick="deleteSubtask(${i})"></button>
        </div>
    `
}
