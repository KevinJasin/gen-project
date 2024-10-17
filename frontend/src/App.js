// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './Auth'; // Assuming Auth.js is in the src folder
import Todos from './Todo'; // Assuming Todos.js is named Todo.js in the src folder
import Weather from './Weather'; // Assuming Weather.js is in the src folder
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
          </ul>
        </nav>
        <h1>Todo and Weather App</h1>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
