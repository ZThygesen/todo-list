import List from './List';
import Task from './Task';
import TaskModal from './TaskModal';
import ProjectModal from './ProjectModal';

const projects = new List();

new TaskModal(projects);

new ProjectModal(projects);

const allTasks = document.querySelector('#all');
allTasks.addEventListener('click', () => projects.listAllTasks());

const todayTasks = document.querySelector('#today');
todayTasks.addEventListener('click', () => projects.listTodaysTasks());
