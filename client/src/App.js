import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      throw new Error(
        alert('Todo must have at least 3 characters and less than 50 characters.')
      );
    }
  };

  const addTodo = async () => {
    handleCharactersError(todo);

    try {
      await axios.post('https://todo-mysql-backend.herokuapp.com/create', {
        todo,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllTodos = async () => {
    try {
      const response = await axios.get('https://todo-mysql-backend.herokuapp.com/');
      setTodoList(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (id) => {
    handleCharactersError(newTodo);

    try {
      await axios.put(`https://todo-mysql-backend.herokuapp.com/update/${id}`, {
        id,
        todo: newTodo,
      });
      setTodoList(prevList =>
        prevList.map((val) => (val.id === id ? { ...val, todo: newTodo } : val))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-mysql-backend.herokuapp.com/${id}`);
      setTodoList(prevList => prevList.filter((val) => val.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('https://todo-mysql-backend.herokuapp.com/login', {
        username,
        password,
      });
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
    setTodo('');
  };

  useEffect(() => {
    getAllTodos();
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // Only run once on initial render, not when todoList changes

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='/register'>
<Register />
</Route>
<Route path='/'>
<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
<TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} />
<TodoList
             todoList={todoList}
             setNewTodo={setNewTodo}
             updateTodo={updateTodo}
             deleteTodo={deleteTodo}
           />
</Layout>
</Route>
</Switch>
</Router>
</div>
);
}

export default App;
