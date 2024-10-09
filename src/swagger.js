const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3006',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
