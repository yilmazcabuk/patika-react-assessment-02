import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [newTodo, setNewTodo] = useState('');
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodo([...todo, {text: newTodo, done: false}]);
      setNewTodo('');
    }
  }

  function handleToggleAll() {
    setDone(!done);
  }

  function handleDeleteTodo(index) {
    const newTodoList = [...todo];
    newTodoList.splice(index, 1);
    setTodo(newTodoList);
  }

  const todoDone = todo.filter(item => item.done).length;
  const todoLeft = todo.filter(item => !item.done).length;

  return (
    <><section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleAddTodo}>
          <input 
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTodo}
            onChange={handleNewTodo}
          />
        </form>
      </header>
      <section 
        className="main"
        hidden={todo.length === 0}
      >
        <input 
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={todoLeft === 0}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {todo.map((item, index) => (
            <li 
              key={index}
              className={item.done ? 'completed' : ''}
              hidden={(item.done && activeFilter === 'active') || (!item.done && activeFilter === 'completed')}
            >
              <div className="view">
                <input 
                  className="toggle"
                  type="checkbox"
                  checked={item.done}
                  onChange={() => setTodo(todo.map((t, i) => i === index ? {...t, done: !t.done} : t))}
                />
                <label>{item.text}</label>
                <button 
                  className="destroy"
                  onClick={() => handleDeleteTodo(index)}
                >
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer 
        className="footer"
        hidden={todo.length === 0}
      >
        <span className="todo-count">
          <strong>{todoLeft}</strong> {todoLeft === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
          <li>
            <a 
              className={activeFilter === 'all' ? 'selected' : ''}
              href='#/'
              onClick={() => setActiveFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a 
              className={activeFilter === 'active' ? 'selected' : ''}
              href='#/'
              onClick={() => setActiveFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a 
              className={activeFilter === 'completed' ? 'selected' : ''}
              href='#/'
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button 
          className="clear-completed"
          hidden={todoDone === 0}
          onClick={() => setTodo(todo.filter(item => !item.done))}
        >
          Clear completed
        </button>
      </footer>
    </section>
    <footer className="info">
      <p>Click to edit a todo</p>
      <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
    </footer></>
  );
}

export default TodoApp;
