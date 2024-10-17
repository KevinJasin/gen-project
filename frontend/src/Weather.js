// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const token = localStorage.getItem('token');

  // Function to fetch weather data based on the city
  const fetchWeather = async (e) => {
    e.preventDefault();
    
    // Check if token is present
    if (!token) {
      setErrorMessage('You need to log in first.'); // Show error if no token
      return;
    }

    try {
      const res = await axios.get(`/api/weather?city=${city}`, {
        headers: { Authorization: token }
      });
      setWeather(res.data);
      setErrorMessage(''); // Clear error message on successful fetch
    } catch (error) {
      console.error('Error fetching weather', error.response?.data?.message);
      setErrorMessage('Error fetching weather data. Please try again.'); // Set error message for the user
    }
  };

  return (
    <div>
      <h2>Weather</h2>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error messages */}
      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}K</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
