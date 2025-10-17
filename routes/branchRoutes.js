const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController')


// Create a new branch
router.post('/', branchController.createNewBranch);

// Get all branches
router.get('/', branchController.getAllBranches);

module.exports = router;