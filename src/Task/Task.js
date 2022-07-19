import { format, parseISO } from "date-fns";

export default class Task {
    constructor(name, description, date, priority, project) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.project = project;

        this.completed = false;
    }

    getName() { return this.name; }
    getDescription() { return this.description; }
    getDate() { return this.date; }
    getPriority() { return this.priority; }
    getProject() { return this.project; }
    getCompleted() { return this.completed; }

    setName(name) { this.name = name; }
    setDescription(description) { this.description = description; }
    setDate(date) { this.date = date; }
    setPriority(priority) { this.priority = priority; }
    setProject(project) { this.project = project; }
    setCompleted(bool) { this.completed = bool; }

    getDateObject() {
        const [y, m, d] = this.date.split('-');
        return new Date(y, m, d);
    }

    getFormattedDate() {
        return (this.hasDate()) ? format(parseISO(this.date), 'E, MMM do, yyyy') : 'No due date';
    }

    hasDate() {
        return (this.date === '') ? false : true;
    }
}