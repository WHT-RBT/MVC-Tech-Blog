const router = require('express').Router();
const { User } = require('../models');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/', (req, res) => {
  console.log("HOME ROUTE GOT HITTTTT")
  res.render("home");
});

router.get('/login', (req, res) => {
  console.log('HOME ROUTE GOT HITTTTT')

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Renders the homepage
router.get('/', (req, res) => {
  // Your existing code for rendering the homepage
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {
  // Your existing code for rendering a single post
});

// Renders the dashboard page
router.get('/dashboard',  (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.logged_in,
    username: req.session.username,
  });
});

module.exports = router;
