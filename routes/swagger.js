const express = require('express'),
      router = express(),
      swaggerUi = require('swagger-ui-express'),
      swaggerDocument = require('../swagger.json');

router
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
