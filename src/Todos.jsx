import { useState } from 'react';
import './App.css';

let id = 0;
const generateId = () => ++id;

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  function appendTodo(task) {
    const todoObj = {
      id: generateId(),
      task,
      completed: false
    };
    setTodos([...todos, todoObj]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter(x => x.id !== id));
  }

  function getFilteredTodos() {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    if (filter === 'incomplete') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  }

  return (
    <div className="todoApp">
      <h1>TODO</h1>
      <TodoForm appendTodo={appendTodo} />
      <div className="filters">
        <button onClick={() => setFilter('all')}>Tümü</button>
        <button onClick={() => setFilter('completed')}>Tamamlananlar</button>
        <button onClick={() => setFilter('incomplete')}>Tamamlanmayanlar</button>
      </div>
      <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

function TodoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <ul className='todoList'>
      {todos.map(x => (
        <TodoItem 
          key={x.id} 
          id={x.id} 
          task={x.task} 
          completed={x.completed} 
          deleteTodo={deleteTodo} 
          toggleComplete={toggleComplete} 
        />
      ))}
    </ul>
  );
}

function TodoItem({ task, id, completed, deleteTodo, toggleComplete }) {
  return (
    <li className='readOnly'>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleComplete(id)}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {task}
      </span>
      <button onClick={() => deleteTodo(id)}>✖️</button>
    </li>
  );
}

function TodoForm({ appendTodo }) {
  function handleSubmit(e) {
    e.preventDefault();
    appendTodo(e.target['task'].value);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input required name='task' type="text" />
      <button>ekle</button>
    </form>
  );
}

export default App;
