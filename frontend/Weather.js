// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const token = localStorage.getItem('token');

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/weather?city=${city}`, {
        headers: { Authorization: token }
      });
      setWeather(res.data);
    } catch (error) {
      console.error('Error fetching weather', error.response?.data?.message);
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
