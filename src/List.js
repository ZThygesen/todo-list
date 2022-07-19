import Project from './Project/Project';
import ProjectDisplay from './Project/ProjectDisplay'
import TaskDisplay from './Task/TaskDisplay';
import {format, addDays, parseISO} from 'date-fns';

import {populateWithExampleTasks} from './Example';

const projectsArrow = document.querySelector('#expand-arrow');
const projectsContainer = document.querySelector('.projects-container');

const title = document.querySelector('.title');
const tasks = document.querySelector('.task-list');

export default class List {
    constructor() {
        this.self = this;
        this.projects = [new Project('None')];
        this.currList = 1;

        //populateWithExampleTasks();
    }

    changeList(mode) {
        this.currList = mode;
        this.update();
    }

    getProjects() { return this.projects; }
    setProjects(projects) { this.projects = projects; this.update(); }

    getProjectByTask(task) {
        let project;
        this.projects.forEach(p => {
            if(task.getProject() === p.getName()) {
                project = p;
            }
        });

        return project;
    }

    getProjectByName(name) {
        let project;
        this.projects.forEach(p => {
            if(p.getName() === name) {
                project = p;
            }
        });

        return project;
    }

    addProject(project) { 
        this.projects.push(project);
        this.update();
    }

    addTask(task, project) {
        this.projects.forEach(p => {
            if (project === p.getName()) { p.addTask(task); }
        });
        this.update();
    }

    removeProject(project) {
        let target;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].getName() === project.getName()) {
                target = i;
                break;
            }
        }
        this.projects.splice(target, 1);
        this.update();
    }

    removeTask(task) {
        const project = this.getProjectByTask(task);
        project.removeTask(task);
        this.update();
    }

    updateTaskProject(task, newProj) {
        if (task.getProject() === newProj) { return; }
       
        this.removeTask(task);
        this.addTask(task, newProj);
    }

    updateProjectTasks(project) {
        project.getTasks().forEach(task => {
            task.setProject(project.getName());
        });
    }

    listProjects() {
        projectsContainer.innerHTML = '';
        this.projects.forEach(project => {
            if (project.getName() !== 'None') {
                const newProject = new ProjectDisplay(project, this.self);
                newProject.displayProject();
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
        localStorage.setItem('projects', JSON.stringify(this.projects));
    
        this.listProjects();
        this.listTasks();
    }

    listTasks() {
        tasks.innerHTML = '';
        switch(this.currList) {
            case(1):
                title.textContent = 'All Tasks';
                this.listAllTasks();
                break;
            case(2):
                title.textContent = 'Today\'s Tasks';
                this.listTodaysTasks();
                break;
            case(3):
                title.textContent = 'This week\'s Tasks';
                this.listWeekTasks();
                break;
            default:
                title.textContent = `${this.currList}`;
                this.listProjectTasks();
                break;
        }
    }


    listAllTasks() {
        let tasks = [];
        let noDate = [];
        this.projects.forEach(project => {
            project.getTasks().forEach(task => {
                if (task.getDate() === '') { noDate.push(task) }
                else { tasks.push({task: task, date: task.getDateObject()}); }
            });
        });

        let sorted = this.sortTasksByDate(tasks).concat(noDate);
        sorted.forEach(task => {
            const newTask = new TaskDisplay(task, this.self);
            newTask.displayTask();
        });
    }

    listTodaysTasks() {
        this.projects.forEach(project => {
            project.getTasks().forEach(task => {
                if(this.isToday(task)) {
                    const newTask = new TaskDisplay(task, this.self);
                    newTask.displayTask();
                }
            });
        });
    }

    listWeekTasks() {
        this.projects.forEach(project => {
            project.getTasks().forEach(task => {
                if(this.isThisWeek(task)) {
                    const newTask = new TaskDisplay(task, this.self);
                    newTask.displayTask();
                }
            });
        });
    }

    listProjectTasks() {
        const project = this.getProjectByName(this.currList);
        if (project === undefined) { this.currList = 1; this.update(); return; }
        project.getTasks().forEach(task => {
            const newTask = new TaskDisplay(task, this.self);
            newTask.displayTask();
        });
    }

    isToday(task) {
        const today = format(new Date(), 'yyyy-MM-dd');
        return today === task.getDate();
    }

    isThisWeek(task) {
        const today = parseISO(format(new Date(), 'yyyy-MM-dd'));
        let dates = [format(today, 'yyyy-MM-dd')];
        for (let i = 1; i < 8; i++) {
            dates.push(format(addDays(today, i), 'yyyy-MM-dd'));
        }

        return dates.includes(task.getDate());
        const week = format(addDays(today, 7), 'EEEE, MMM Q, yyyy');
    }

    expandProjects() {
        projectsContainer.classList.toggle('hidden');
        projectsArrow.classList.toggle('rotate');
    }

    sortTasksByDate(tasks) {
        const sortedObj = tasks.sort((task1, task2) => Number(task1.date) - Number(task2.date),);
        let sortedTasks = [];
        
        for (let key in sortedObj) {
            sortedTasks.push(sortedObj[key].task);
        }
        return sortedTasks;
    }
}