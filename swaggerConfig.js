const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smart Meter API",
            version: "1.0.0",
            description: "API documentation for the Smart Meter project",
        },
        servers: [
            {
                url: "https://smartmeter-project.onrender.com/api", // Replace with your server URL
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;