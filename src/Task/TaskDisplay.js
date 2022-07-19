import EditModal from './EditTaskModal';

const tasks = document.querySelector('.task-list');

const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function toWords(number) {
    let numStr = number.toString();
    let result = '_';
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

        this.editModal;
    }

    displayTask() {
        this.createTask();

        this.taskCheck = document.querySelector(`.check.${this.id}`);
        this.taskCheck.checked = this.task.getCompleted();
        this.checkTask();
        this.taskCheck.addEventListener('change', () => this.checkTask());

        this.taskDetails = document.querySelector(`.details-btn.${this.id}`);
        this.taskDetails.addEventListener('click', () => this.showDetails());

        this.taskEdit = document.querySelector(`.edit.${this.id}`);
        this.taskEdit.addEventListener('click', () => this.createModal());

        this.taskRemove = document.querySelector(`.remove.${this.id}`);
        this.taskRemove.addEventListener('click', () => this.removeTask());

    }

    createTask() {
        this.taskContainer = document.createElement('div');
        this.taskContainer.classList.add('task-container');
        this.taskContainer.innerHTML = `
        <div class="task ${this.id}">
            <input type="checkbox" class="check ${this.id}">
            <p>${this.task.getName()}</p>
            <p class="center" id="break">${this.task.getFormattedDate()}</p>
            <button class="details-btn ${this.id}">Details</button>
            <p class="center" style="color: ${this.getPriorityColor()};">${this.task.getPriority()}</p>
            <i class="fa-regular fa-pen-to-square fa-xl edit ${this.id}"></i>
            <i class="fa-regular fa-trash-can fa-xl remove ${this.id}"></i>
        </div>
        `;
        tasks.appendChild(this.taskContainer);
    }

    createModal() {
        this.editModal = new EditModal(this.task, this.list);
    }

    checkTask() {
        if (this.taskCheck.checked) {
            this.taskContainer.style.opacity = 0.2;
            this.task.setCompleted(true);
        } else {
            this.taskContainer.style.opacity = 1;
            this.task.setCompleted(false);
        }
        localStorage.setItem('projects', JSON.stringify(this.list.getProjects()));
    };

    showDetails() {
        if (this.taskContainer.children[1] !== undefined) { return; }

        const details = document.createElement('div');
        details.className = 'task-details';
        details.innerHTML = `
        <div class="left">
            <p><span class="bold">Task:</span> ${this.task.getName()}</p>
            <p><span class="bold">Notes:</span> ${this.task.getDescription()}</p>
        </div>
        <div class="right">
            <p><span class="bold">Due:</span> ${this.task.getFormattedDate()}</p>
            <p><span class="bold">Priority:</span> ${this.task.getPriority()}</p>
            <p><span class="bold">Project:</span> ${this.task.getProject()}</p>
        </div>
        <span class="close ${this.id}">&times;</span>
        `;
        this.taskContainer.appendChild(details);

        const close = document.querySelector(`.close.${this.id}`);
        close.addEventListener('click', () => details.remove());
    }

    removeTask() {
        this.taskContainer.remove();
        this.list.removeTask(this.task);
    }

    getPriorityColor() {
        switch (this.task.getPriority()) {
            case('Low'):
                return '#007500';
            case('Medium'):
                return '#fc6a03';
            case('High'):
                return '#ff0000';
        }
    }
}
