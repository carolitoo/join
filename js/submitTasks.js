async function initAddTask() {
    await includeHTML();
    // await loadUserData();
    // await getLoggedInEmail();
    // await renderAcronym(loggedInEmail);
    //await loadUserData();//
    await loadContacts();
    await loadTasks();
    //clearAssignedUsersArray();
    changeSelectedTab('tab-add-task');
}

/**
 * Submits a task with the default status and a generated ID
 * @param {string} taskStatus - The status of the task.
 */
async function submitTask() {
    let title = document.getElementById('task-input-title').value;
    let description = document.getElementById('task-input-description').value;
    let date = new Date(document.getElementById('task-input-dueDate').value);
    let timeStamp = new Date().getTime();
  
    let newTask = {
        'idTask':  `task-${timeStamp}`, // ID is set as a timecode so every ID is unique
        'titleTask': title,
        'descriptionTask': description,
        'assignedContacts':  assignedUsers.map(user => ({ idContact: user.ID })), 
        'dueDate': date,
        'priority': taskPrio,
        'category': category,
        'subtasks': addedSubtasks,
        'statusTask': "toDo",
    };
    tasks.push(newTask); 
    await saveTasks();
    location.href='board.html'
    
    console.log(tasks)
};