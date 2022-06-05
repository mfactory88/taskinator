//var buttonEl = document.querySelector("#save-task");

var formEl = document.querySelector("#task-form")

var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {

    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.textContent = "This is a new task."
    tasksToDoEl.appendChild(listItemEl);
    listItemEl.className = "task-item";

    //console.log(event)
}

formEl.addEventListener("submit", createTaskHandler);

console.log(createTaskHandler);