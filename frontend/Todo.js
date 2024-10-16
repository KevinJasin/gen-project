// src/components/Todos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos', { headers: { Authorization: token } });
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos', error.response?.data?.message);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/todos',
        { title: newTodo, description },
        { headers: { Authorization: token } }
      );
      setTodos([...todos, res.data]);
      setNewTodo('');
      setDescription('');
    } catch (error) {
      console.error('Error creating todo', error.response?.data?.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, { headers: { Authorization: token } });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo', error.response?.data?.message);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      const updatedTodo = { title: newTodo, description };
      const res = await axios.put(`/api/todos/${id}`, updatedTodo, { headers: { Authorization: token } });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
      setNewTodo('');
      setDescription('');
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo', error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>TODOs</h2>
      <form onSubmit={editingTodo ? () => handleUpdateTodo(editingTodo) : handleCreateTodo}>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTodo ? 'Update' : 'Add Todo'}</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>: {todo.description} - {todo.status}
            <button onClick={() => { setNewTodo(todo.title); setDescription(todo.description); setEditingTodo(todo._id); }}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
