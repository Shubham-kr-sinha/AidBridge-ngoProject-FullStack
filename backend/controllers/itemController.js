const { Item } = require('../models');

// @desc    Creates a new Item
// @route   POST /item
const createNewItem = async (req, res) => {
    const { type, quality_status, desc = null } = req.body;
    try {
        const item = await Item.create({
            type, 
            quality_status,
            desc
        });
        return res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets all the items
// @route   GET /items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewItem,
    getAllItems
};