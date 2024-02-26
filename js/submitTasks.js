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

    // Validierung des Titels
    if (title.trim() === '') {
        return; // Beende die Funktion, wenn der Titel nicht ausgefüllt ist
    }

       // Validierung der Kategorie
       if (category === '') {
        return; // Beende die Funktion, wenn keine Kategorie ausgewählt wurde
    }

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
        'statusTask': "toDo",
    };
    
    tasks.push(newTask);
    await saveTasks();
    location.href='board.html';
    console.log(tasks);
}

