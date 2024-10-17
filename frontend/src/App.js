import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London'); // Default city

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBhZTExNmI3ZjhmOTE1ZWE2ZDYzZSIsImlhdCI6MTcyOTE0ODQxMiwiZXhwIjoxNzI5MTUyMDEyfQ.zCii7vxg1Okhz-iGnG627fIFBNOkAINtCMl0YIRz5jw'; // Replace with the token you get after logging in
        const response = await axios.get(`http://localhost:3000/api/weather?city=${city}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching weather data');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]); // Runs when the component mounts or city changes

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => setCity(city)}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
