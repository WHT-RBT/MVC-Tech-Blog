const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            order: [['created_at', 'DESC']], // Order by created_at in descending order
            attributes: ['id', 'title', 'created_at', 'user_id', 'description'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        const posts = dbPostData.map((post) => {
            return {
                postId: post.id,
                title: post.title,
                description: post.description,
                date: post.created_at,
            };
        });

        // dashboard view with posts and other user data
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
