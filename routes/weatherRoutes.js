const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Weather API endpoint to get weather data
router.get('/:city', authMiddleware, async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
