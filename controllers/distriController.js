const { Distribution, Item, Branch, Beneficiary } = require('../models');

// @desc    Creates a new distribution
// @route   POST /distributions
const createNewDistribution = async (req, res) => {
    const { item_id, branch_id, date, beneficiary_id  } = req.body;
    try {        
        const distribution = await Distribution.create({
            item_id, 
            branch_id,
            date, 
            beneficiary_id
        });
        res.status(201).json(distribution);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}


// @desc    Gets all the donations
// @route   GET /donations
const getAllDistributions = async (req, res) => {
    try {
        const distributions = await Distribution.findAll({ include: [Item, Branch, Beneficiary] });
        if (!distributions?.length)
            return res.status(400).json({ message: 'No distributions' });
        res.json(distributions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewDistribution,
    getAllDistributions
};