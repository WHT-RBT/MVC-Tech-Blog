const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const samplePosts = require('./sample-posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // sample posts and comments
  for (const post of samplePosts) {
    const user = users.find((user) => user.username === post.user);
    const newPost = await Post.create({
      title: post.title,
      content: post.content,
      user_id: user.id,
    });

    for (const comment of post.comments) {
      const commentUser = users.find((user) => user.username === comment.user);
      await Comment.create({
        comment_text: comment.comment_text,
        user_id: commentUser.id,
        post_id: newPost.id,
      });
    }
  }

  process.exit(0);
};

seedDatabase();
