const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kimelia Lumora API',
      version: '1.0.0',
      description: 'API documentation for the Kimelia Lumora AI Learning Platform',
      contact: {
        name: 'API Support',
        email: 'support@kimelialumora.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
      // We will add the Production server URL here later when we deploy!
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // This tells Swagger where to look for your documentation comments
  apis: ['./src/routes/*.js', './src/models/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;