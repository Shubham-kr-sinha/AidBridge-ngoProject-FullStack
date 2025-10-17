const { Donor } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const login = async (req, res) => {
    try {
        const { name, pwd } = req.body
        if (!name || !pwd) {
            return res.json({ error: 'All fields are required' })
        }

        const foundDonor = await Donor.findOne({ where: { name } });
        if (!foundDonor) {
            return res.json({ error: `Donor with name ${name} doesn't exist` });
        }

        const match = await bcrypt.compare(pwd, foundDonor.pwd)
        if (!match) {
            return res.json({ error: 'You entered the wrong password!' })
        }

        jwt.sign(
            {
                donor_id: foundDonor.donor_id,
                name: foundDonor.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '8h' },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(foundDonor);
            }
        )

    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
}

const register = async (req, res) => {
    try {
        const { name, pwd, address = null, phone = null } = req.body;
        if (!name) {
            return res.json({ error: 'Name is required' });
        }
        if (!pwd || pwd.length < 6) {
            return res.json({ error: 'Password is required and should be at least 6 characters long' });
        }

        const hashedPwd = await bcrypt.hash(pwd, 10);
        const donor = await Donor.create({
            name,
            pwd: hashedPwd,
            address,
            phone_num: phone
        });

        return res.status(201).json(donor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

const getProfile = (req, res) => {    
    console.log(req.cookies);
    try {
        console.log(req.cookies);
        const { token } = req.cookie;
        console.log(token);
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, donor) => {
                if (err) throw err;
                res.json(donor);
            })
        } else {
            res.json(null);
        }
    } catch (err) {
        console.error(err)
        res.json({ error: err.message })
    }
}

module.exports = {
    login,
    register,
    getProfile
};