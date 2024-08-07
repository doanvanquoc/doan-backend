const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation cho hệ thống ứng dụng quản lý nhà hàng',
    },
    servers: [
      {
        // url: 'http://103.104.122.137:8080', // URL của API của bạn
        // url: 'http://localhost:8080', // URL của API của bạn
        url: 'https://bb4c-2402-800-b768-616e-a159-83d0-98d7-cdae.ngrok-free.app', // URL của API của bạn
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn tới các file chứa định nghĩa API bằng JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
