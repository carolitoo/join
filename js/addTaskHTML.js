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


