class Todomanager {
    tasks;

    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        let d = new Date();
        let newTask = new Todo(d.getTime(), description);
        this.tasks.push(newTask);
        addTasksToScreen(this.tasks);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        addTasksToScreen(this.tasks);
    }

    updateTask(index, newDescription) {
        this.tasks = this.tasks[index].description = newDescription;
        addTasksToScreen(this.tasks);
    }

    toggleIsCompleted(index) {
        this.tasks = this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
        addTasksToScreen(this.tasks);
    }
}


class Todo {
    id;
    description;
    createDate;
    isCompleted;

    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.createDate = new Date();
        this.isCompleted = false;
    }
}


let tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addTaskBtn");
let taskManager = new Todomanager();


function addTaskToScreen(task) {
    //create the element
    let row = `
    <tr class="todo-row">
        <td class="todo-cell">${task.isComplete}</td>
        <td class="todo-cell">${task.id}</td>
        <td class="todo-cell">${task.description}</td>
        <td class="todo-cell">${task.creationDate}</td>
        <td class="todo-cell">
        <button>Edit</button>
        </td>
        <td class="todo-cell">
        <button onclick="taskManager.removeTask(${index})>Delete</button>
        </td>
    </tr>`;
    //append child
    tableBody.innerHTML += row;
}


function addTasksToScreen(tasks) {
    tableBody.innerHTML = "";
    tasks.forEach((task) => {
        addTaskToScreen(task);
    });
}


addBtn.addEventListener("click", () => {
    let txtInput = document.getElementById("newTaskInput");
    if (txtInput.value) {
        taskManager.addTask(txtInput.value);
        txtInput.value = "";
    }
});