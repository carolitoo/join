let currentStatus;

/**
 * This function opens the edit task form and prefilles all values and input fields with the information stored in the backend
 * 
 * @param {string} idTask  - id of the task for which the edit mode is opened
 */
async function openEditTask(idTask) {
    let positionTask = tasks.findIndex((id) => id["idTask"] == idTask);
  
    document.getElementById("overlay-board").classList.remove("d-none");
    document.getElementsByTagName("body")[0].classList.add("disable-scroll");
  
    document.getElementById('overlay-board').innerHTML = await generateViewEditTasklHTML(idTask);
    setMinDueDate('edit-task-dueDate');
    await prefillInputFields(positionTask);
    setPriorityEditTask(positionTask);
    await createDropDownUserEditTask(idTask);
    clearAssignedUsersArray();
    await updateAssignedUsers(positionTask, idTask);
    renderCheckedContacts();
    await renderSubtasksEditTask(positionTask);
    addEventListenerToEditForm();
  }
  
  
  /**
   * This function prefilles the input field title, description and due date with the information currently stored for the task that is edited
   * 
   * @param {number} positionTask - position of the task that is edited in the array "tasks"
   */
  async function prefillInputFields (positionTask) {
    document.getElementById('edit-task-title').value = tasks[positionTask]['titleTask'];
    document.getElementById('edit-task-description').value = tasks[positionTask]['descriptionTask'];
    document.getElementById('edit-task-dueDate').value= tasks[positionTask]['dueDate'].toLocaleString().substring(0,10);
  }
  
  
  /**
   * This function selects the right button based on the priority currently selected for the task that is edited
   * 
   * @param {number} positionTask - position of the task that is edited in the array "tasks"
   */
  function setPriorityEditTask (positionTask) {
    let priorityOfTask = tasks[positionTask]["priority"];
  
    if (priorityOfTask == "Urgent") {
      changeButtonColorsUrgent();
    } else if (priorityOfTask == "Medium") {
      changeButtonColorsMedium();
    } else if (priorityOfTask == "Low") {
      changeButtonColorsLow();
    }
  }
  
  
  /**
   * This function generates the drop down for the assigned users in the edit task view - the checkboxes are still blank after running this function
   * 
   * @param {string} idTask - id of the task that is edited
   */
  async function createDropDownUserEditTask(idTask) {
    document.getElementById('ctn-edit-task-drop-down-user').innerHTML = await generateCurrentUserDropDownHTML(0, idTask);
    for (let j = 1; j < contacts.length; j++) {
      document.getElementById('ctn-edit-task-drop-down-user').innerHTML += await generateContactDropDownHTML(j, idTask);
    }
  }
  
  
  /**
   * This function checkes the checkboxes and filles the array assigned users for/ with the users assigned to the task currently edited
   * 
   * @param {number} positionTask - position of the task that is edited in the array "tasks" 
   * @param {string} idTask - id of the task that is edited
   */
  async function updateAssignedUsers (positionTask, idTask) {
    for (let i = 0; i< tasks[positionTask]['assignedContacts'].length; i++) {
      let idContact = tasks[positionTask]['assignedContacts'][i]['idContact'];
      let positionContact = contacts.findIndex((id) => id['ID'] == idContact)
  
      document.getElementById(`checkbox-${idTask}-${positionContact}`).checked = true;
      document.getElementById(`checkbox-${idTask}-${positionContact}`).parentElement.classList.add('active');

      assignedUsers.push({ name: contacts[positionContact]['name'], ID: contacts[positionContact]['ID'] });
    }
  }
  
  
  /**
   * This function renders the subtasks into the edit task view and pushes the subtasks to the temporary array "addedSubtasks"
   * 
   * @param {number} positionTask - position of the task that is edited in the array "tasks"
   */
  async function renderSubtasksEditTask(positionTask) {
    document.getElementById('added-subtask-ctn').innerHTML = '';
    addedSubtasks = [];
  
    for (let i=0; i < tasks[positionTask]['subtasks'].length; i++) {
      let currentSubtask = tasks[positionTask]['subtasks'][i];
      let currentSubtaskTitle = currentSubtask['titleSubtask']
      document.getElementById('added-subtask-ctn').innerHTML += await generateSingleSubtaskHTML(i, currentSubtaskTitle);
  
      let newSubtask = {
        'idSubtask':  currentSubtask['idSubtask'],
        'titleSubtask': currentSubtask['titleSubtask'],
        'statusSubtask': currentSubtask['statusSubtask'],
    }
    addedSubtasks.push(newSubtask);
    }
  }

  
  /**
   * This function adds an event listener to the edit task form element to prevent the default behaviour of the enter key
   */
  function addEventListenerToEditForm() {
    document.getElementById('form-edit-task-board').addEventListener('keydown', function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  }
  
  
  /**
   * This function updates the values/ inputs made the in edit task form in the backend and closes the overlay
   * 
   * @param {string} idTask - id of the task that is edited
   */
  async function editTask(idTask) {
    let positionTask = tasks.findIndex((id) => id["idTask"] == idTask);
  
    let title = document.getElementById('edit-task-title').value;
    let description = document.getElementById('edit-task-description').value;
    let date = new Date(document.getElementById('edit-task-dueDate').value);
  
    tasks[positionTask]['titleTask'] = title;
    tasks[positionTask]['descriptionTask'] = description;
    tasks[positionTask]['dueDate'] = date.toJSON();
    tasks[positionTask]['priority'] = taskPrio;
    tasks[positionTask]['assignedContacts'] = assignedUsers.map(user => ({ idContact: user.ID }));
    tasks[positionTask]['subtasks'] = addedSubtasks;
  
    await saveTasks();
    closeTaskDetails();
  }
  
  
  /**
   * This function opens the drop down with the contacts in the editTask-View 
   * It also adds an event listener to the background so that the drop down is closed when clicking outside the drop down container
   */
  function openDropDownEditTask() {
    document.getElementById('ctn-edit-task-drop-down-user').classList.remove('d-none');
    document.getElementById('edit-task-placeholder-drop-down').classList.add('d-none');
    document.getElementById('ctn-edit-task-search-user').classList.remove('d-none');
    document.getElementById('ctn-edit-task-board').addEventListener("click", clickOutsideHandlerEdit);
  }


  /**
   * This function closes the drop down with the contacts when the user clicks outside the container (on the white background) in the edit view
   */
  function clickOutsideHandlerEdit(event) {
    if (event.target.className =="ctn-task-detail") {
      closeDropDownEditTask();
    } 
  }


  /**
   * This function closes the drop down with the contacts in the editTask-View and removes the event listener
   */
  function closeDropDownEditTask() {
    document.getElementById('ctn-edit-task-drop-down-user').classList.add('d-none');
    document.getElementById('edit-task-placeholder-drop-down').classList.remove('d-none');
    document.getElementById('ctn-edit-task-search-user').classList.add('d-none');
    document.getElementById('ctn-edit-task-board').removeEventListener("click", clickOutsideHandlerEdit);
  }
  
  
  /**
   * This function opens the overlay for adding a task when the user is on the board
   * In case of small window width the user is forwarded to the add_task.html 
   * The task is added to the status depending on which icon or button the user clicks to open the add task dialog
   * 
   * @param {string} taskStatus - status to which the task will be added after submission
   */
  function openAddTaskBoard(taskStatus) {
    currentStatus = taskStatus;
    document.getElementById('body-board').setAttribute("onresize", `checkWindowWidthAddTaskBoard()`)
    if (window.innerWidth <= 1380) {
      window.location.href = 'add_task.html';
      localStorage.setItem('statusTransfer', taskStatus);
    } else {
      document.getElementById('overlay-board-addTask').classList.remove('d-none');
      document.getElementsByTagName("body")[0].classList.add("disable-scroll");
      addEventListenerToAddForm();
      setMinDueDate('task-input-dueDate');
      document.getElementById('Add-Task-Form').setAttribute("onsubmit", `submitTask('${taskStatus}'); return false;`);
      document.getElementById('wrapper-add-task-board').addEventListener('click', clickOutsideHandlerAdd);
      document.getElementById('Add-Task-Form').addEventListener('click', clickOutsideHandlerAdd);
    }
  }


  /**
   * This function ensures that the add task overlay on the board is only displayed when the screen has a certain width
   * On falling below the defined width the user is forwarded to the add-task-page
   */
  function checkWindowWidthAddTaskBoard() {
    if (window.innerWidth <= 1380) {
      localStorage.setItem('statusTransfer', currentStatus);
      window.location.href = 'add_task.html';
    }
  }


  /**
   * This function ensures that the drop down is closed when the user clicks outside the box in the add task overlay
   * 
   * @param {obeject} event 
   */
  function clickOutsideHandlerAdd(event) {
    if (
      event.target.className !== "assignedContacts-open" &&
      event.target.className !== "input-add-task" &&
      event.target.className !== "contact" &&
      event.target.className !== "dropdwon-checkbox"
    ) {
      document.getElementById("assignedContactsCtn").style.display = "none";
    }
  }
  

  /**
   * This function closes the overlay (containig the form for adding a task), empties the temporary needed arrays and ensures that scrolling is possible after closing the overlay
   */
  function closeAddTaskBoard() {
    document.getElementById("overlay-board-addTask").classList.add("d-none");
    document.getElementsByTagName("body")[0].classList.remove("disable-scroll");
    clearAssignedUsersArray();
    addedSubtasks = [];
    document.getElementById('wrapper-add-task-board').removeEventListener('click', clickOutsideHandlerAdd);
    document.getElementById('Add-Task-Form').removeEventListener('click', clickOutsideHandlerAdd);
    document.getElementById('body-board').removeAttribute("onresize");
  }
  
