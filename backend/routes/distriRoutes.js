const express = require('express');
const router = express.Router();
const distriController = require('../controllers/distriController')


// Create a distribution
router.post('/', distriController.createNewDistribution);

// Get all distributions
router.get('/', distriController.getAllDistributions);

module.exports = router;