const { Beneficiary } = require('../models');

// @desc    Creates a new beneficiary
// @route   POST /beneficiaries
const createNewBeneficiary = async (req, res) => {
    const { name, address = null, phone_num = null } = req.body;
    if (!name) return res.status(400).json({ message: "Name is necessary" });
    try {
        const beneficiary = await Beneficiary.create({
            name,
            address,
            phone_num
        });
        res.status(201).json(beneficiary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets all the beneficiaries
// @route   GET /beneficiaries
const getAllBeneficiaries = async (req, res) => {
    try {
        const beneificiaries = await Beneficiary.findAll();
        res.status(200).json(beneificiaries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewBeneficiary,
    getAllBeneficiaries
};