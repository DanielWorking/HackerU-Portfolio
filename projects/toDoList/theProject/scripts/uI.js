export default class UI {
    constructor(todoList, todoInput, todoContainer, todoCount) {
        this.todoList = todoList;
        this.todoInput = todoInput;
        this.todoContainer = todoContainer;
        this.todoCount = todoCount;
    }

    displayTasks() {
        // clears the current todo display
        this.todoContainer.innerHTML = '';
        const todos = this.todoList.getTodos();

        // iterates through the tasks to create HTML elements for each one
        todos.forEach((item, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = "todo-container";

            // create checkbox for completion status
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.id = `input-${index}`;
            checkbox.checked = item.completed;
            checkbox.addEventListener('change', () => {
                this.todoList.toggleTask(index);
                this.displayTasks();
            });

            // create paragraph for task description
            const taskDescription = document.createElement('p');
            taskDescription.id = `todo-${index}`;
            taskDescription.className = item.completed ? "disabled" : "";
            taskDescription.textContent = item.description;
            taskDescription.addEventListener('click', () => this.editTask(index, taskDescription));

            taskElement.appendChild(checkbox);
            taskElement.appendChild(taskDescription);
            this.todoContainer.appendChild(taskElement);
        });

        // updating the counter of tasks
        this.todoCount.textContent = todos.length;
    }

    // edit the task description
    editTask(index, taskElement) {
        const currentDescription = this.todoList.getTodos()[index].description;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentDescription;
        inputField.className = 'edit-input';
        taskElement.replaceWith(inputField);

        // save changes on 'Enter' key press or when input loses focus
        inputField.addEventListener('blur', () => this.saveEdit(index, inputField));
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveEdit(index, inputField);
            }
        });

        // automatically focus the input field
        inputField.focus();
    }

    // save the edited task description
    saveEdit(index, inputField) {
        const newDescription = inputField.value.trim();
        if (newDescription !== "") {
            this.todoList.editTask(index, newDescription);
        }
        this.displayTasks(); // refresh the list
    }

    // clears the value of the input after the task is added
    clearInput() {
        this.todoInput.value = '';
    }
}