const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users/:id', userController.getProfile);

router.post('/address/users/:id', addressController.saveAddress);
router.put('/address/users/:id', addressController.updateAddress);
router.delete('/address/users/:id', addressController.deleteAddress);
router.get('/address/users/:id', addressController.getUserAddress);

module.exports = router;