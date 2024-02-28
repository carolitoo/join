/**
 * Submits a task with the default status and a generated ID
 * @param {string} taskStatus - The status of the task that is added to the array/ board
 */
async function submitTask(taskStatus) {
    let title = document.getElementById('task-input-title').value;
    let description = document.getElementById('task-input-description').value;
    let date = new Date(document.getElementById('task-input-dueDate').value);
    let timeStamp = new Date().getTime();

    // Fortsetzung der Aufgabenverarbeitung, wenn der Titel ausgefüllt ist
    let newTask = {
        'idTask':  `task-${timeStamp}`,
        'titleTask': title,
        'descriptionTask': description,
        'assignedContacts':  assignedUsers.map(user => ({ idContact: user.ID })),
        'dueDate': date,
        'priority': taskPrio,
        'category': category,
        'subtasks': addedSubtasks,
        'statusTask': taskStatus,
    };
    
    tasks.push(newTask);
    await saveTasks();
    location.href='board.html';
    console.log(tasks);
}

