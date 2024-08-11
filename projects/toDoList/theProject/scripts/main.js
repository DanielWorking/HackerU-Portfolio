import ToDoManager from "./toDoManager.js";
import UI from "./uI.js";

// creating DOM variables
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const addButton = document.querySelector('.btn');
const deleteButton = document.getElementById('deleteButton');

// creating new class instances
const todoListManager = new ToDoManager();
const uiManager = new UI(todoListManager, todoInput, todoList, todoCount);

addButton.addEventListener('click', () => {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        try {
            todoListManager.addTask(newTask); // add the task to the todo list
            uiManager.clearInput(); // clear input field
            uiManager.displayTasks(); // display the task in tasks container
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An error occurred while adding the task. Please try again.");
        }
    } else {
        alert("Task description cannot be empty");
    }
});

deleteButton.addEventListener('click', () => {
    try {
        todoListManager.deleteAllTasks(); // clears the todo list
        uiManager.displayTasks(); // update the tasks container
    } catch (error) {
        console.error("Error deleting tasks:", error);
        alert("An error occurred while deleting tasks. Please try again.");
    }
});

// display the current tasks when the page loads
uiManager.displayTasks();