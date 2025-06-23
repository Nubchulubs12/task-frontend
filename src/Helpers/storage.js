export const saveUser = (user) => {
  localStorage.setItem(`${user.username}_tasks`, JSON.stringify(user));
};

export const loadUser = (username) => {
  const data = localStorage.getItem(`${username}_tasks`);
  if (data) {
    const obj = JSON.parse(data);
    obj.addTask = function(task) { this.tasks.push(task); }; // reattach method if needed
    return obj;
  } else {
    return { username, tasks: [] };
  }
};
