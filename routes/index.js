const express = require('express');
const router = express.Router();
const { homeController, dashboardController, authController, postController } = require('../controllers');

// Home page
router.get('/', homeController.getHomePage);

// Dashboard
router.get('/dashboard', authController.requireAuth, dashboardController.getDashboard);

// Signup
router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.signup);

// Login
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

// Blog post
router.get('/post/:id', postController.getBlogPost);
router.post('/post/:id/comment', authController.requireAuth, postController.createComment);

// Add blog post
router.get('/add', authController.requireAuth, postController.getAddPostPage);
router.post('/add', authController.requireAuth, postController.addPost);

module.exports = router;
