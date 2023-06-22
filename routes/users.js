const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// GET all users
router.get('/', userController.getAllUserProfiles);

//GET a specific user by ID
router.get('/:id', userController.getUserProfileById);

// POST request to create a new user
router.post('/', userController.createUserProfile);

//Delete User by ID
router.delete('/:id', userController.deleteUser);

// Update User Profile by id
router.put('/:id', userController.updateUserProfile);

module.exports = router;