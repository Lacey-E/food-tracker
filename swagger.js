const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Food tracker API',
        description: 'Group work API',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);