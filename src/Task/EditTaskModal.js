const container = document.querySelector('.container');

export default class EditTaskModal {
    constructor(task, list) {
        this.task = task;
        this.list = list;

        // open modal
        this.editTask;

        // modal components
        this.editModal = document.createElement('div');
        this.editModal.className = 'modal edit task';
        this.editModal.innerHTML = this.generateModal();
        container.appendChild(this.editModal);

        this.closeTaskModal = document.querySelector('.close.edit.task');
        this.saveEdit = document.querySelector('.save.edit');

        // modal inputs
        this.taskName = document.querySelector('.task-name.edit');
        this.taskDescription = document.querySelector('.description.edit');
        this.taskHasDate = document.querySelector('.has-due-date.edit');
        this.taskDate = document.querySelector('.date.edit');
        this.taskPriority = document.querySelector('.priority.edit');
        this.taskProject = document.querySelector('.task-project.edit');

        // event listeners
        this.closeTaskModal.addEventListener('click', () => this.closeModal());
        this.saveEdit.addEventListener('click', (e) => this.saveChanges(e));
        this.taskHasDate.addEventListener('click', () => this.toggleDate());

        this.displayModal();
    }

    displayModal() {
        this.editModal.style.display = 'block';

        this.addProjectOptions();
    
        this.taskHasDate.checked = this.task.hasDate();
        this.taskDate.disabled = !this.task.hasDate();
        this.taskPriority.value = this.task.getPriority();
        this.taskProject.value = this.task.getProject();
    }

    saveChanges(e) {
        e.preventDefault();
       if (this.taskName.value === '') { alert('Task name required'); return; }
        
        this.task.setName(this.taskName.value);
        this.task.setDescription(this.taskDescription.value);
        this.task.setDate(this.taskDate.value);
        this.task.setPriority(this.taskPriority.value);

        this.list.updateTaskProject(this.task, this.taskProject.value);
        this.task.setProject(this.taskProject.value);

        this.list.update();
        this.closeModal();
    }

    closeModal() {
        this.editModal.remove();
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

    generateModal() {
        return `
        <div class="modal-content">
            <span class="close edit task">&times;</span>
            <form id="create-task">
                <div class="form">
                    <div class="left">
                        <label for="task-edit">Task</label>
                        <input class="task-name edit" type="text" id="task-edit" value="${this.task.getName()}">
                        <label for="description-edit">Notes</label>
                        <textarea class="description edit" id="description-edit" cols="30" rows="5">${this.task.getDescription()}</textarea>
                    </div>
                    <div class="right">
                        <label for="has-due-date-edit">Set date?</label>
                        <input class="has-due-date edit" type="checkbox" id="has-due-date-edit">
                        <label for="date-edit">Due Date</label>
                        <input class="date edit" type="date" id="date-edit" value="${this.task.getDate()}">
                        <label for="priority-edit">Priority</label>
                        <select class="priority edit" id="priority-edit">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    
                        <label for="task-project-edit">Project</label>
                        <select class="task-project edit" id="task-project-edit"></select>
                    </div>
                </div>
                <button class="save edit" type="button" id="save-edit">Save</button>
            </form>
        </div>
        `;
    }
}