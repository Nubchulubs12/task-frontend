import React, { useState, useEffect } from 'react';
import TaskItem from '../Model/TaskItem';

function TaskList({ userEmail }) {
  const storageKey = `${userEmail}_tasks`;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, [storageKey]);

  const saveTasks = (newTasks) => {
    localStorage.setItem(storageKey, JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !due) return;

    const newTask = new TaskItem(title, desc, due);
    const updated = [...tasks, newTask];
    saveTasks(updated);

    setTitle('');
    setDesc('');
    setDue('');
  };

  const handleDeleteTask = (titleToDelete) => {
    const updated = tasks.filter(task => task.title !== titleToDelete);
    saveTasks(updated);
  };

  return (
    <div>
      <h2>Task List</h2>
      <form onSubmit={handleAddTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>
            <strong>{task.title}</strong> – {task.description} (Due: {task.dueDate})
            <button onClick={() => handleDeleteTask(task.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
