const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController')

// Create a new item
router.post('/', itemController.createNewItem);

// Get all the items
router.get('/', itemController.getAllItems);

module.exports = router;