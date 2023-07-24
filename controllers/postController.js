const { BlogPost, Comment } = require('../models');

const postController = {
  getBlogPost: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: ['User'],
          },
          'User',
        ],
      });
      res.render('post', { blogPost });
    } catch (err) {
      res.status(404).json({ error: 'Blog post not found!' });
    }
  },

  createComment: async (req, res) => {
    const { content } = req.body;
    const { id: blogPostId } = req.params;
    const { userId } = req.session;
    try {
      await Comment.create({ content, userId, blogPostId });
      res.redirect(`/post/${blogPostId}`);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add comment!' });
    }
  },

  // need to create getAddPostPage and addPost functions

};

module.exports = postController;
