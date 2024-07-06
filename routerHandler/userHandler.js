const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

//Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPassword) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            access_token: token,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router