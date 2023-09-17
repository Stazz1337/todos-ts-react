import React, { useState } from 'react';
import './App.css';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

enum View {
  All,
  Completed,
  Active,
}

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [view, setView] = useState<View>(View.All);

  const addTask = (): void => {
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = (): void => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  let displayedTasks = tasks;
  if (view === View.Completed) {
    displayedTasks = tasks.filter((task) => task.completed);
  } else if (view === View.Active) {
    displayedTasks = tasks.filter((task) => !task.completed);
  }

  return (
    <section className='app'>
      <div className='app__wrapper'>
        <h1 className='app__title'>ToDoList</h1>
        <form className='app__form'>
          <input
            className='app__task-input'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='New task'
          />
          <button
            className='app__add-task-btn'
            onClick={addTask}
            disabled={!newTask}
          >
            Add task
          </button>
        </form>

        <div className='app__view-buttons'>
          <button
            className={`app__view-button ${view === View.All ? 'active' : ''}`}
            onClick={() => setView(View.All)}
          >
            All
          </button>
          <button
            className={`app__view-button ${
              view === View.Active ? 'active' : ''
            }`}
            onClick={() => setView(View.Active)}
          >
            Active
          </button>
          <button
            className={`app__view-button ${
              view === View.Completed ? 'active' : ''
            }`}
            onClick={() => setView(View.Completed)}
          >
            Completed
          </button>

          <button className='app__view-button' onClick={clearCompleted}>
            Clear completed
          </button>
        </div>

        <div className='app__task-count'>{activeTasksCount} tasks left</div>

        <ul className='app__task-list'>
          {displayedTasks.map((task) => (
            <li
              key={task.id}
              className={`app__task-item ${task.completed ? 'completed' : ''}`}
            >
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
