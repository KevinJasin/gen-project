// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Todos from './components/Todos';
import Weather from './components/Weather';

const App = () => {
  return (
    <Router>
      <div>
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
