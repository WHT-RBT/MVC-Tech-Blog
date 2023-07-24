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
      res.status(500).json({ error: 'Failed to create user!' });
    }
  },

  //login, logout, and requireAuth functions
  
  getLoginPage: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials!' });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          req.session.userId = user.id;
          res.redirect('/dashboard');
        } else {
          res.status(401).json({ error: 'Invalid credentials!' });
        }
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to log in!' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to logout!' });
      } else {
        res.redirect('/login');
      }
    });
  },

  requireAuth: (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = authController;
