const { BlogPost } = require('../models');

const homeController = {
    getHomePage: async (req, res) => {
        try {
            const blogPosts = await BlogPost.findAll({ include: ['User'], order: [['createdAt', 'DESC']] });
            res.render('home', { blogPosts });
        } catch (err) {
            res.status(500).json({ error: 'Failed to load homepage!' });
        }
    },
};

module.exports = homeController;
