const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();

const userSchema = require('../schemas/userSchema');
const User = mongoose.model('User', userSchema)


//SIGNUP User
router.post('/signup', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword
        })
        await user.save();
        res.status(200).json({
            message: 'User created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user'
        })
    }

})


module.exports = router