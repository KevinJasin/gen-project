const express = require('express');
const { getWeather } = require('../controllers/weatherController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getWeather);

module.exports = router;
