import { useState } from 'react'
import './App.css'

let id = 0;
const generateId = () => ++id;

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
 

  function appendTodo(task) {
    const todoObj = {
      id: generateId(),
      task,
      completed: false
    }
    setTodos([...todos, todoObj]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(x => x.id !== id));
  }

  function deleteCompleted() {
    setTodos(todos.filter(x => !x.completed));
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

  function checkBox(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { id: todo.id, task: todo.task, completed: !todo.completed };
        }
        return todo;
      })
    );
  }



  return (
    <div className="todoApp">
      <div className="header"><h1>TODO</h1></div>
      <TodoForm appendTodo={appendTodo} />
      <TodoList todos={getFilteredTodos()} deleteTodo={deleteTodo} checkBox={checkBox} />
      <div className="filters">
        <p>{todos.length} items left</p>
        <div className="btn">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('incomplete')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className='clearbtn' onClick={deleteCompleted}>Clear Completed</button>
      </div>
    </div>
    
  )
}

function TodoList({ todos, deleteTodo, checkBox }) {

  return (
    <ul className='todoList'>
      {todos.map(x => <TodoItem key={x.id} id={x.id} task={x.task} completed={x.completed} checkBox={checkBox} deleteTodo={deleteTodo} />)}
    </ul>
  )
}

function TodoItem ({ task, id, deleteTodo, completed, checkBox }) {
    return (
      <li className='readOnly'>
          <div className="todos">
          <input type="checkbox" checked={completed} onChange={() => checkBox(id)} />
          <span style={{textDecoration: completed ? 'line-through' : ''}}>{task}</span>
          </div>
        <button className='silme' onClick={() => deleteTodo(id)}>✖️</button>
      </li>
    )
}

function TodoForm({ appendTodo }) {
  function handeleSubmit(e) {
    e.preventDefault();
    appendTodo(e.target['task'].value);
    e.target.reset();
  }


  return (
    <form onSubmit={handeleSubmit}>
      <input className='giris' required name='task' type="text" placeholder='Create a new todo…' />
    </form>
  )

}

export default App
