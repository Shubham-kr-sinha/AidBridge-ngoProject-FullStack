const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// make a  donations 
router.post('/', donationController.createNewDonation);

// get all donations made
router.get('/', donationController.getAllDonations);

// get all donations made
router.get('/:id', donationController.getOneDonation);

module.exports = router;