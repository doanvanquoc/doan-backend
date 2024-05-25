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
        url: 'http://localhost:8080', // URL của API của bạn
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
