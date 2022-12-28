const express = require('express');
const router = express.Router();
const userauth = require('../middleware/userauth');
const Profile = require('../models/Profile');

// fetch all profiles
router.get('/fetchallprofiles', userauth, async (req, res) => {
    const profiles = await Profile.find({ user: req.user });
    res.json(profiles);
});

// create a profile
router.post('/createprofile', userauth, async (req, res) => {
    try {
        const { name, age, dob, gender, phoneno, address } = req.body;
        if (!name || !age || !gender || !address || !dob) {

            return res.status(400).json({ message: "Enter all fields" });
        }
        const profile = new Profile({
            user: req.user,
            name,
            age,
            dob,
            gender,
            phoneno,
            address,
        });
        const savedProfile = await profile.save();
        res.send(savedProfile);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

});

// update a profile
router.put('/updateprofile/:id', userauth, async (req, res) => {
    try {
        const { name, age, dob, gender, phoneno, address } = req.body;
        // create a new profile obj
        const newprofile = {}
        if (name) newprofile.name = name;
        if (age) newprofile.age = age;
        if (gender) newprofile.gender = gender;
        if (dob) newprofile.dob = dob;
        if (phoneno) newprofile.phoneno = phoneno;
        if (address) newprofile.address = address;

        let profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (profile.user.toString() !== req.user) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        profile = await Profile.findByIdAndUpdate(req.params.id, { $set: newprofile }, { new: true });
        res.json({ profile });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

// delete a profile
router.delete('/deleteprofile/:id', userauth, async (req, res) => {
    try {

        let profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (profile.user.toString() !== req.user) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        profile = await Profile.findByIdAndDelete(req.params.id);
        res.json({ "success": "deleted the profile", profile: profile });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
