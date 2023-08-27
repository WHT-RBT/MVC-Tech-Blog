const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const samplePosts = require('./sample-posts.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users first
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed sample posts and comments
for (const post of samplePosts) {
  const user = users.find((user) => user.username === post.user);
        if (user) {
        const newPost = await Post.create({
          name: post.name, // Add this line
          title: post.title,
          content: post.content,
          user_id: user.id,
        });

        for (const comment of post.comments) {
          const commentUser = users.find((user) => user.username === comment.user);
          if (commentUser) {
            await Comment.create({
              comment_text: comment.comment_text,
              user_id: commentUser.id,
              post_id: newPost.id,
            });
          } else {
            console.log(`Comment user: ${comment.user} not found`);
          }
        }
      } else {
        console.log(`Post user: ${post.user} not found`);
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }

  // Remove this line to avoid forcefully terminating the process in a production environment
  process.exit(0);
};

seedDatabase();
