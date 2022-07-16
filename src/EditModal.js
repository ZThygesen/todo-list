const container = document.querySelector('.container');

export default class EditModal {
    constructor(id, task, list) {
        this.id = id;
        this.task = task;
        this.list = list;

        // open modal
        this.editTask;

        // modal components
        this.editModal = document.createElement('div');
        this.editModal.classList.add('modal');
        this.editModal.classList.add(`${this.id}`);
        this.editModal.innerHTML = this.generateModal();
        container.appendChild(this.editModal);

        this.closeTaskModal = document.querySelector(`.close.edit.${this.id}`);
        this.saveEdit = document.querySelector(`.save-edit.${this.id}`);

        // modal inputs
        this.taskName = document.querySelector(`.task-edit.${this.id}`);
        this.taskDescription = document.querySelector(`.description-edit.${this.id}`);
        this.taskHasDate = document.querySelector(`.has-due-date-edit.${this.id}`);
        this.taskDate = document.querySelector(`.date-edit.${this.id}`);
        this.taskPriority = document.querySelector(`.priority-edit.${this.id}`);
        this.taskProject = document.querySelector(`.task-project-edit.${this.id}`);

        // event listeners
        this.closeTaskModal.addEventListener('click', () => this.closeModal());
        this.saveEdit.addEventListener('click', (e) => {
            e.preventDefault();

            this.task.setName(this.taskName.value);
            this.task.setDescription(this.taskDescription.value);
            this.task.setDate(this.taskDate.value);
            this.task.setPriority(this.taskPriority.value);
            this.task.setProject(this.taskProject.value);
            this.list.update();
            this.closeModal();
        });
        this.taskHasDate.addEventListener('click', () => this.toggleDate());
    }

    setOpenElem(elem) {
        this.editTask = elem;
        this.editTask.addEventListener('click', () => this.displayModal());
    }

    displayModal() {
        this.editModal.style.display = 'block';

        // add projects to modal
        this.taskProject.innerHTML = '';
        this.list.getProjects().forEach(project => {
            const option = document.createElement('option');
            option.value = project.getName();
            option.textContent = project.getName();
            this.taskProject.appendChild(option);
        });
        this.taskHasDate.checked = this.task.hasDate();
        this.taskDate.disabled = !this.task.hasDate();
        this.taskPriority.value = this.task.getPriority();
        this.taskProject.value = this.task.getProject();
    }

    closeModal() {
        this.editModal.style.display = 'none';
    }

    toggleDate() {
        if (this.taskHasDate.checked) {
            this.taskDate.disabled = false;
        } else {
            this.taskDate.disabled = true;
            this.taskDate.value = '';
        }
    }

    generateModal() {
        return `
        <div class="modal-content">
            <span class="close edit ${this.id}">&times;</span>
            <form id="create-task">
                <div class="form">
                    <div class="left">
                        <label for="task-edit">Task</label>
                        <input class="task-edit ${this.id}" type="text" id="task-edit" value="${this.task.getName()}">
                        <label for="description-edit">Description</label>
                        <textarea class="description-edit ${this.id}" id="description-edit" cols="30" rows="5">${this.task.getDescription()}</textarea>
                    </div>
                    <div class="right">
                        <label for="has-due-date-edit">Set date?</label>
                        <input class="has-due-date-edit ${this.id}" type="checkbox" id="has-due-date-edit">
                        <label for="date-edit">Due Date</label>
                        <input class="date-edit ${this.id}" type="date" id="date-edit" value="${this.task.getDate()}">
                        <label for="priority-edit">Priority</label>
                        <select class="priority-edit ${this.id}" id="priority-edit">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    
                        <label for="task-project-edit">Project</label>
                        <select class="task-project-edit ${this.id}" id="task-project-edit"></select>
                    </div>
                </div>
                <button class="save-edit ${this.id}"type="button" id="save-edit">Save</button>
            </form>
        </div>
        `;
    }
}