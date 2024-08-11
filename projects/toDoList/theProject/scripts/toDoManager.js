import Todo from "./toDo.js";

// managing the tasks list
export default class ToDoManager {
    constructor() {
        // retrieving the todo list from storage, if not existing - get an empty array
        this.todos = JSON.parse(localStorage.getItem('todo')) || [];
    }

    // adding a new task
    addTask(description) {
        if (!description) {
            throw new Error("Task description cannot be empty");
        }
        const newTask = new Todo(description); // creating the new task using the Todo class
        this.todos.push(newTask); // adding the new task to the todo list in storage
        this.saveToLocalStorage(); // updating the todo list in storage
    }

    // change the status of the task (completed or not)
    toggleTask(index) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Invalid task index");
        }
        this.todos[index].toggle(); // using the task index to update the task status
        this.saveToLocalStorage(); // updating the todo list in storage
    }

    // change the description of the task
    editTask(index, newDescription) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Invalid task index");
        }
        if (!newDescription) {
            throw new Error("New description cannot be empty");
        }
        this.todos[index].updateDescription(newDescription); // using the task index to change the task description
        this.saveToLocalStorage(); // updating the todo list in storage
    }

    // deleting all existing tasks
    deleteAllTasks() {
        this.todos = []; // list equals to empty array
        this.saveToLocalStorage(); // updating the todo list in storage
    }

    // save the current state of the todo list to storage
    saveToLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    // returns the current todo list
    getTodos() {
        return this.todos;
    }
}