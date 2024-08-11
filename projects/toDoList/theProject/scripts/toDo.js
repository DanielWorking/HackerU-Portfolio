// a class representing a task
export default class Todo {
    // the constructor gets the description of the task and its status (completed or not)
    constructor(description, completed = false) {
        this.description = description;
        this.completed = completed;
    }

    // changing the task status (between not completed and completed)
    toggle() {
        this.completed = !this.completed;
    }

    // updating the description of the task for the new description
    updateDescription(newDescription) {
        this.description = newDescription;
    }
}