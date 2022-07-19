const container = document.querySelector('.container');

export default class EditProjectModal {
    constructor(project, list) {
        this.project = project;
        this.list = list;

        // open modal
        this.editProject;

        // modal components
        this.editModal = document.createElement('div');
        this.editModal.className = 'modal edit project';
        this.editModal.innerHTML = this.generateModal();
        container.appendChild(this.editModal);

        this.closeProjectModal = document.querySelector('.close.edit.project');
        this.saveEdit = document.querySelector('.save.edit');

        // modal inputs
        this.projectName = document.querySelector('.project-name.edit');

        // event listeners
        this.closeProjectModal.addEventListener('click', () => this.closeModal());
        this.saveEdit.addEventListener('click', (e) => this.saveChanges(e));

        this.displayModal();
    }

    displayModal() {
        this.editModal.style.display = 'block';
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.projectName.value === '') { alert('Project name required'); return; }

        this.project.setName(this.projectName.value);
        this.list.updateProjectTasks(this.project);
        this.list.update();
        this.closeModal(); 
    }

    closeModal() {
        this.editModal.remove();
    }

    generateModal() {
        return `
        <div class="modal-content">
            <span class="close edit project">&times;</span>
            <form id="create-project">
                <label for="project-edit">Project</label>
                <input class="project-name edit" type="text" value="${this.project.getName()}">
                <button class="save edit" type="submit" id="save-edit">Save</button>
            </form>
        </div>
        `;
    }
}