import EditModal from './EditModal';

const tasks = document.querySelector('.tasks');

const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function toWords(number) {
    let numStr = number.toString();
    let result = '';
    for (let i = 0; i < numStr.length; i++) {
        result += words[numStr.at(i)];
    }
    return result;
}

let id = 0;
function uniqueID() {
    return toWords(id++);
}

export default class TaskDisplay {
    constructor(task, list) {
        this.id = uniqueID();
        this.list = list;

        this.task = task;
        this.taskContainer;
        this.taskCheck;
        this.taskDetails;
        this.taskEdit;
        this.taskRemove;

        this.editModal = new EditModal(this.id, this.task, this.list);
    }

    getContainer() { return this.container; }

    displayTask() {
        this.createTask();

        this.taskCheck = document.querySelector(`.check.${this.id}`);
        this.taskCheck.checked = this.task.getCompleted();
        this.checkTask();
        this.taskCheck.addEventListener('click', () => this.checkTask());
        this.taskDetails = document.querySelector(`.details.${this.id}`);
        this.taskDetails.addEventListener('click', () => this.showDetails());
        this.taskEdit = document.querySelector(`.edit.${this.id}`);
        this.taskEdit.addEventListener('click', () => {this.editTask();});
        this.taskRemove = document.querySelector(`.remove.${this.id}`);
        this.taskRemove.addEventListener('click', () => this.removeTask());

        this.editModal.setOpenElem(this.taskEdit);
    }

    createTask() {
        this.taskContainer = document.createElement('div');
        this.taskContainer.classList.add('task-container');
        this.taskContainer.innerHTML = `
        <div class="task ${this.id}">
            <input type="checkbox" class="check ${this.id}">
            <p>${this.task.getName()}</p>
            <p>${this.task.getDate()}</p>
            <button class="details ${this.id}">Details</button>
            <p>${this.task.getPriority()} priority</p>
            <button class="edit ${this.id}">Edit</button>
            <button class="remove ${this.id}">Remove</button>
        </div>
        `;
        tasks.appendChild(this.taskContainer);
    }

    checkTask() {
        if (this.taskCheck.checked) {
            this.taskContainer.style.opacity = 0.5;
            this.task.setCompleted(true);
        } else {
            this.taskContainer.style.opacity = 1;
            this.task.setCompleted(false);
        }
    };

    showDetails() {
        if (this.taskContainer.children[1] !== undefined) { return; }

        const details = document.createElement('div');
        details.classList.add('details');
        details.innerHTML = `
        <span class="close ${this.id}">&times;</span>
        <p>Task: ${this.task.getName()}</p>
        <p>Description: ${this.task.getDescription()}</p>
        <p>Due: ${this.task.getDate()}</p>
        <p>Priority: ${this.task.getPriority()}</p>
        <p>Project: ${this.task.getProject()}</p>
        `;
        this.taskContainer.appendChild(details);

        const close = document.querySelector(`.close.${this.id}`);
        close.addEventListener('click', () => details.remove());
    }


    removeTask() {
        this.taskContainer.remove();
        this.list.removeTask(this.task);
    }

    editTask() {
        this.editModal.setOpenElem(this.taskEdit);
    }
}
