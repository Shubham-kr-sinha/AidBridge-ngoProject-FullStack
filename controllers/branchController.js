const { Branch } = require('../models');

// @desc    Adds a new branch
// @route   POST /branches
const createNewBranch = async (req, res) => {
    const { location } = req.body;
    try {
        const branch = await Branch.create({
           location
        });
        res.status(201).json(branch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets all the branches
// @route   GET /branches
const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.status(200).json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewBranch,
    getAllBranches
};