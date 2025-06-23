export default class User {
  constructor(username) {
    this.username = username;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
