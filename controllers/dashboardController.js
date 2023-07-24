const { BlogPost, User } = require('../models');

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            const userId = req.session.userId;
            const user = await User.findByPk(userId, { include: [BlogPost] });
            res.render('dashboard', { user });
        } catch (err) {
            res.status(500).json({ error: 'Failed to load dashboard!' });
        }
    },
};

module.exports = dashboardController;
