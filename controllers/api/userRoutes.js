const router = require('express').Router();
const { User } = require('../../models');

// Allow users to sign up
router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name || null, 
    })
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow users to login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbUserData) => {
        // If no user exists, return error
        if (!dbUserData) {
            res.status(400).json({ message: 'There is no user with that email address!' });
            return;
        }

        // Check submitted password
        const validPassword = dbUserData.checkPassword(req.body.password);
        // If not valid, notify user
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect! Try again.' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// Terminate sessions and redirect to the main page
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
