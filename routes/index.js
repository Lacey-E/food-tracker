const express = require('express');
const router = express.Router();

router.use('/user', require('./users'));

router.use('/inventory', require('./inventory'));

router.use('/recipe', require('./recipes'));

router.use('/list', require('./shoppingList'));