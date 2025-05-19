const { Donation, Donor, Item, Branch } = require('../models');

// @desc    Creates a new donor
// @route   POST /donations
const createNewDonation = async (req, res) => {
    const { donor_id, item_id, date_received, branch_id } = req.body;
    try {
        const donation = await Donation.create({
            donor_id,
            item_id,
            date_received,
            branch_id
        });
        return res.status(201).json(donation);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}


// @desc    Gets all the donations
// @route   GET /donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({ include: [Donor, Item, Branch] });
        if (!donations?.length)
            return res.status(400).json({ message: 'No donations' });
        res.json(donations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets all the donations
// @route   GET /donations
const getOneDonation = async (req, res) => {
    const id = req.url.split('/')[1];
    try {
        const donation = await Donation.findOne({
            where: { donation_id: id },
            include: [Donor, Item, Branch]
        });
        if (!donation)
            return res.json({ error: `A donation with id: ${id} doesn't exist` });
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewDonation,
    getAllDonations,
    getOneDonation
};