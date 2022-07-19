import Task from './Task';

export default class TaskModal {
    constructor(list) {
        this.list = list;

        // open modal
        this.addTask = document.querySelector('#add-task');

        // modal components
        this.taskModal = document.querySelector('.modal.task');
        this.closeTaskModal = document.querySelector('.close.task');
        this.submitTask = document.querySelector('#submit-task');

        // modal inputs
        this.taskName = document.querySelector('#task');
        this.taskDescription = document.querySelector('#description');
        this.taskHasDate = document.querySelector('#has-due-date');
        this.taskDate = document.querySelector('#date');
        this.taskPriority = document.querySelector('#priority');
        this.taskProject = document.querySelector('#task-project');

        // event listeners
        this.addTask.addEventListener('click', () => this.displayModal());
        this.closeTaskModal.addEventListener('click', () => this.closeModal());
        this.submitTask.addEventListener('click', (e) => this.createTask(e));
        this.taskHasDate.addEventListener('click', () => this.toggleDate());
    }

    displayModal() {
        this.taskModal.style.display = 'block';
        this.addProjectOptions();
    }

    closeModal() {
        this.taskModal.style.display = 'none';

        this.taskName.value = '';
        this.taskDescription.value = '';
        this.taskHasDate.checked = false;
        this.taskDate.value = '';
        this.taskDate.disabled = true;
        this.taskPriority.value = 'Low';
        this.taskProject.value = 'None';
    }

    createTask(e) {
        e.preventDefault();
        if (this.taskName.value === '') { alert('Task name required'); return; }

        const task = new Task(this.taskName.value, this.taskDescription.value, this.taskDate.value, this.taskPriority.value, this.taskProject.value);
        this.list.addTask(task, this.taskProject.value);
        this.closeModal();
    }

    toggleDate() {
        if (this.taskHasDate.checked) {
            this.taskDate.disabled = false;
        } else {
            this.taskDate.disabled = true;
            this.taskDate.value = '';
        }
    }

    addProjectOptions() {
        this.taskProject.innerHTML = '';
        this.list.getProjects().forEach(project => {
            const option = document.createElement('option');
            option.value = project.getName();
            option.textContent = project.getName();
            this.taskProject.appendChild(option);
        });
    }
}