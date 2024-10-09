const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Comment out routes one by one
// const authRoutes = require('./routes/authRoutes');
// const todoRoutes = require('./routes/todoRoutes');
// const weatherRoutes = require('./routes/weatherRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);
// app.use('/api/weather', weatherRoutes);

// Health Check
app.get('/health', (req, res) => res.send('OK'));

// Error Handling Middleware
app.use(require('./middleware/errorHandler'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
