import React, { useState, useEffect } from 'react';
import TaskItem from '../Model/TaskItem';
import '../index.css';
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
     <div className="layout">
       <div className="sidebar"></div>

       <div className="content">
         <h2>Task List</h2>

         <form className="task-form" onSubmit={handleAddTask}>
           <input
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="Title"
             required
             className="task-input"
           />
           <input
             value={desc}
             onChange={(e) => setDesc(e.target.value)}
             placeholder="Description"
             className="task-input"
           />
           <input
             type="date"
             value={due}
             onChange={(e) => setDue(e.target.value)}
             required
             className="task-input"
           />
           <button type="submit">Add Task</button>
         </form>

         <ul className="task-list">
           {tasks.map((task, idx) => (
             <li key={idx} className="task-item">
               <strong>{task.title}</strong>
               <div>{task.description}</div>
               <div className="task-due">Due: {task.dueDate}</div>
               <button
                 onClick={() => handleDeleteTask(task.title)}
                 className="delete-button"
               >
                 Delete
               </button>
             </li>
           ))}
         </ul>
       </div>

       <div className="sidebar"></div>
     </div>
   );
 }

export default TaskList;
