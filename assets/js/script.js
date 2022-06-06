//DOM elements and task id counter
var taskIdCounter = 0;

var tasks = [];

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

//Task form entry
var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.dir(taskNameInput);

    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.dir(taskTypeInput);

    // check for empty forms
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
  
    //has data attribute so get task id and call function to edit
    if (isEdit) {
        var taskID = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskID);
    }

    //no data attribute, so create object as normal and call to create
    else {
        // package up data as an object
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
        };
    }

    createTaskEl(taskDataObj);
    

};

//Create tasks
var createTaskEl = function(taskDataObj) {

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info"

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    console.log(tasks);

    // increment taskIdCounter
    taskIdCounter++;    

    console.log(taskDataObj);
    console.log(taskDataObj.status)

};

var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target

    if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskID = targetEl.getAttribute("data-task-id");
        deleteTask(taskID);
    }

    if (targetEl.matches(".edit-btn")) {
        // get the element's task id
        var taskID = targetEl.getAttribute("data-task-id");
        editTask(taskID);
    }
};

var deleteTask = function(taskID) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    
    //delete task
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTasks =[];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskID)) {
            updatedTasks.push(tasks[i]);
        }
    };

    //reassign tasks = updatedTasks
    tasks = updatedTasks;
    
};

var editTask = function(taskID) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskID);
    
};

var completeEditTask = function(taskName, taskType, taskID) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through task array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskStatusChangeHandler = function(event) {
    // get task item id
    var taskID = event.target.getAttribute("data-task-id");

    // get current option and convert to lower case
    var statusValue = event.target.value.toLowerCase();

    // fin parent task item element based on task id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected)
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update task status in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].status = statusValue;
        }
    };

    console.log(tasks);
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);