import Project from './Project';
import TaskDisplay from './TaskDisplay';
import {format} from 'date-fns';

const projectsContainer = document.querySelector('.projects-container');

const title = document.querySelector('.title');
const tasks = document.querySelector('.tasks');

export default class List {
    constructor() {
        this.self = this;
        this.projects = [new Project('None')];
        this.mode = 1;
    }

    getProjects() { return this.projects; }

    getTaskProject(task) {
        let project;
        this.projects.forEach(p => {
            if(task.getProject() === p.getName()) {
                project = p;
            }
        });

        return project;
    }

    addProject(project) { 
        this.projects.push(project);
        this.listProjects();
    }

    addTask(task, project) {
        this.projects.forEach(p => {
            if (project === p.getName()) { p.addTask(task); }
        });
        this.update();
    }

    removeTask(task) {
        const project = this.getTaskProject(task);
        project.removeTask(task);
    }

    listProjects() {
        projectsContainer.innerHTML = '';
        this.projects.forEach(p => {
            if (p.getName() !== 'None') {
                const project = document.createElement('div');
                project.innerHTML = `
                <button id="${p.getName()}">${p.getName()}</button>
                `;
                projectsContainer.appendChild(project);
            }
        });
    }

    projectExists(project) {
        let exists = false;
        this.projects.forEach(p => {
            if (project === p.getName()) { exists = true; }
        });

        return exists;
    }

    update() {
        this.listProjects();
        this.listAllTasks();
    }


    listAllTasks() {
        title.textContent = 'All Tasks';
        tasks.innerHTML = '';
        this.projects.forEach(project => {
            project.getTasks().forEach(task => {
                const newTask = new TaskDisplay(task, this.self);
                newTask.displayTask();
            });
        });
    }

    listTodaysTasks() {
        title.textContent = 'Today\'s Tasks';
        tasks.innerHTML = '';
        this.projects.forEach(project => {
            project.getTasks().forEach(task => {
                if(this.isToday(task)) {
                    const newTask = new TaskDisplay(task, this.self);
                    newTask.displayTask();
                }
            });
        });
    }

    isToday(task) {
        const today = format(new Date(), 'dd.MM.yyyy');
        console.log(today);
        console.log(task.getDate());
    }
}