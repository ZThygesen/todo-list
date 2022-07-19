import List from './List';
import TaskModal from './Task/TaskModal';
import ProjectModal from './Project/ProjectModal';
import Project from './Project/Project';
import Task from './Task/Task';

const list = new List();
let projects;

new TaskModal(list);

new ProjectModal(list);

const expandProjects = document.querySelector('#projects');
expandProjects.addEventListener('click', () => list.expandProjects());

const allTasks = document.querySelector('#all');
allTasks.addEventListener('click', () => list.changeList(1));

const todayTasks = document.querySelector('#today');
todayTasks.addEventListener('click', () => list.changeList(2));

const weekTasks = document.querySelector('#week');
weekTasks.addEventListener('click', () => list.changeList(3));

if (localStorage.getItem('projects')) {
    projects = JSON.parse(localStorage.getItem('projects'));
    let newProjects = createObjects();

    list.setProjects(newProjects);
} else {
    console.log('here')
    localStorage.setItem('projects', JSON.stringify([{"name":"None","tasks":[{"name":"Schedule Dr. appointment","description":"Don't tell anyone about the rash","date":"2022-07-20","priority":"High","project":"None","completed":false},{"name":"Register for classes","description":"Plz no 8am","date":"2022-08-03","priority":"High","project":"None","completed":false}]},{"name":"Homework","tasks":[{"name":"Finish program","description":"Call Ellie for bugs","date":"2022-07-18","priority":"Medium","project":"Homework","completed":false},{"name":"Study for exam","description":"Remember, if you don't know it by 10pm you don't know it","date":"2022-07-22","priority":"Medium","project":"Homework","completed":false},{"name":"Read Ch. 1 - 2","description":"Lol jk, you don't actually read textbooks, remember?","date":"2022-07-24","priority":"Low","project":"Homework","completed":false}]},{"name":"Errands","tasks":[{"name":"Get groceries","description":"Don't go while hungry... bad things happen","date":"2022-07-30","priority":"Medium","project":"Errands","completed":true},{"name":"Ship package","description":"Yes, I regret 1am Amazon purchases","date":"","priority":"Low","project":"Errands","completed":false},{"name":"Fix car tire","description":"We love potholes!","date":"2022-07-18","priority":"High","project":"Errands","completed":true}]},{"name":"Chores","tasks":[{"name":"Clean room","description":"Shove everything into the closet === clean","date":"","priority":"Low","project":"Chores","completed":false},{"name":"Do dishes","description":"Letting them \"soak\" doesn't count","date":"2022-07-21","priority":"Low","project":"Chores","completed":true},{"name":"Meal prep","description":"Munchies for the whole week","date":"2022-07-23","priority":"Medium","project":"Chores","completed":false}]}]))
    projects = JSON.parse(localStorage.getItem('projects'));
    let newProjects = createObjects();

    list.setProjects(newProjects);
}

function createObjects() {
    projects = JSON.parse(localStorage.getItem('projects'));
    let newProjects = [];
    projects.forEach(p => {
        let project = new Project(p.name);

        let tasks = p.tasks;
        let newTasks = [];
        tasks.forEach(t => {
            let task = new Task(t.name, t.description, t.date, t.priority, t.project);
            task.completed = t.completed;
            newTasks.push(task);
            task.getDateObject();
        })
        project.tasks = newTasks;

        newProjects.push(project);
    });

    return newProjects;
}
