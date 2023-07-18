const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// GET all users
router.get('/', userController.getAllUserProfiles);

//GET a specific user by ID
router.get('/:id', userController.getUserProfileById);

// POST request to create a new user
router.post('/', userController.createUserProfile);

// POST request to create a new user
router.put('/:id', userController.updateUserProfile);

// POST request to create a new user
router.delete('/:id', userController.deleteUser);

router.get('/login', userController.login);

router.get('/logout', userController.logout);

// Export the router object to be used by other modules
module.exports = router;