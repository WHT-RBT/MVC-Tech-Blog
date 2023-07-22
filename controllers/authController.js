const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  getSignupPage: (req, res) => {
    res.render('signup');
  },

  signup: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
      res.redirect('/login');
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  },

  // Implement login, logout, and requireAuth functions
  // ...

};

module.exports = authController;
