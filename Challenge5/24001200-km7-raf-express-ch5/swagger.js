// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Dokumentasi API dengan Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path ke file yang mendefinisikan endpoint
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
