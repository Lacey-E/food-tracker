const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'FoodTrack API',
    description: 'API documentation for the FoodTrack web application',
  },
  host: 'food-tracker-app-60wj.onrender.com/',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });