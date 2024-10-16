const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
