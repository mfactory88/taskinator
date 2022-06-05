var buttonEl = document.querySelector("#save-task");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.textContent = prompt("Enter Task");
    tasksToDoEl.appendChild(listItemEl);
    listItemEl.className = "task-item";
}

buttonEl.addEventListener("click", createTaskHandler);