export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
}

    getName() { return this.name; }
    getTasks() { return this.tasks; }

    setName(name) { this.name = name; }
    addTask(task) { this.tasks.push(task); }

    removeTask(task) {
        let target;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i] === task) {
                target = i;
                break;
            }
        }
        this.tasks.splice(target, 1);
    }
}