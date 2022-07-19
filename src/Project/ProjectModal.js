import Project from "./Project";

export default class ProjectModal {
    constructor(list) {
        this.list = list;

        const self = this;

        // open modal
        this.addProject = document.querySelector('#add-project');

        //modal components
        this.projectModal = document.querySelector('.modal.project');
        this.closeProjectModal = document.querySelector('.close.project');
        this.submitProject = document.querySelector('#submit-project');

        // modal input
        this.projectName = document.querySelector('#project');

        // event listeners
        this.addProject.addEventListener('click', () => this.displayProject());
        this.closeProjectModal.addEventListener('click', () => this.closeModal());        
        this.submitProject.addEventListener('click', (e) => self.createProject(e));
    }

    displayProject() {
        this.projectModal.style.display = 'block';
    }

    closeModal() {
        this.projectModal.style.display = 'none';
        this.projectName.value = '';
    }

    createProject(e) {
        e.preventDefault();
        if (this.projectName.value === '') { alert('Project name required'); return; }

        const project = new Project(this.projectName.value);

        if (this.list.projectExists(project.getName())) { alert('Project name already exists.'); return; }

        this.list.addProject(project);
        this.closeModal();
    }
}