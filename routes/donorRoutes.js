const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController')


// Create a new donor
router.post('/', donorController.createNewDonor);

// Update a donor
router.put('/:id', donorController.updateDonor);

// Get all the donors
router.get('/', donorController.getAllDonors);

// Get all the donors
router.get('/:id', donorController.getDonor);

module.exports = router;