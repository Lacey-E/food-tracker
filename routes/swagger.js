const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


router.use((req, res, next) => {
  res.removeHeader('Content-Type');
  next();
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
