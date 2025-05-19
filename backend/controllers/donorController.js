const bcrypt = require('bcrypt');
const { Donor } = require('../models');

// @desc    Creates a new donor
// @route   POST /register
const createNewDonor = async (req, res) => {
    const { name, pwd, address = null, phone_num = null } = req.body;
    if (!name || !pwd) return res.status(400).json({ message: "Name and Password are necessary" });
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const donor = await Donor.create({
            name,
            pwd: hashedPwd,
            address,
            phone_num
        });
        res.status(201).json(donor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Updates a single donor
// @route   PUT /register/:donor_id
const updateDonor = async (req, res) => {
    const id = parseInt(req.url.split("/")[1]);
    const { name = null, address = null, phone_num = null } = req.body;
    try {
        const donor = await Donor.findOne({ where: { donor_id: id } });
        if (!donor) return res.json({ message: `Donor with donor_id ${id} doesn't exist` });

        if (name) donor.name = name;
        if (address) donor.address = address;
        if (phone_num) donor.phone_num = phone_num;
        await donor.save();

        res.status(201).json(donor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets all the donors
// @route   GET /register
const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll();
        res.status(200).json(donors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// @desc    Gets the donor with given id
// @route   GET /register/:donor_id
const getDonor = async (req, res) => {
    const id = parseInt(req.url.split("/")[1]);
    console.log(id);
    try {
        const donor = await Donor.findByPk(id);
        if (!donor) {            
            return res.json({ message: `Donor with donor_id:${id} doesn't exist` });
        }
        res.status(200).json(donor.toJSON());
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNewDonor,
    updateDonor,
    getAllDonors,
    getDonor
};