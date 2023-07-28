const router = require('express').Router();
const { User } = require('../models');

// Route for signup
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // Set up session data for the new user
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
