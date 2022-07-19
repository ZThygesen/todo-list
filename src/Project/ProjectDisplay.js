import EditModal from './EditProjectModal';

const projects = document.querySelector('.projects-container');

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

export default class ProjectDisplay {
    constructor(project, list) {
        this.id = uniqueID();
        this.list = list;

        this.project = project;
        this.projectContainer;
        this.projectSelect;
        this.projectEdit;
        this.projectRemove;

        this.editModal;
    }

    displayProject() {
        this.createProject();

        this.projectSelect = document.querySelector(`.project-name.${this.id}`);
        this.projectSelect.addEventListener('click', () => this.list.changeList(this.project.getName()));

        this.projectEdit = document.querySelector(`.edit-project.${this.id}`);
        this.projectEdit.addEventListener('click', () => this.createModal());

        this.projectRemove = document.querySelector(`.remove-project.${this.id}`);
        this.projectRemove.addEventListener('click', () => this.removeProject());
    }

    createProject() {
        this.projectContainer = document.createElement('div');
        this.projectContainer.classList.add('project-container');
        this.projectContainer.innerHTML = `
        <div class="project ${this.id}">
            <p class="project-name ${this.id}">${this.project.getName()}</p>
            <i class="fa-regular fa-pen-to-square fa-lg edit-project ${this.id}"></i>
            <i class="fa-regular fa-trash-can fa-lg remove-project ${this.id}"></i>
        </div>
        `;
        projects.appendChild(this.projectContainer);
    }

    createModal() {
        this.editModal = new EditModal(this.project, this.list)
    }

    removeProject() {
        this.projectContainer.remove();
        this.list.removeProject(this.project);
    }
}