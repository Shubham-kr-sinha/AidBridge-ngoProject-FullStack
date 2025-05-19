const express = require('express');
const router = express.Router();
const beneController = require('../controllers/beneController')


// Create a new donor
router.post('/', beneController.createNewBeneficiary);

// Get all the donors
router.get('/', beneController.getAllBeneficiaries);

module.exports = router;