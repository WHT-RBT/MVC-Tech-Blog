const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Add this before your routes
app.use(express.static('public'));

router.get('/', (req,res) => {
  console.log("HOME ROUTE GOT HITTTTT")
  res.render("home")
})

router.get('/login', (req, res) => {
  console.log('HOME ROUTE GOT HITTTTT')

  // If the user is already logged in, redirects the request to another route
  if (req.session.logged_in) {
    res.redirect('./public/js/dashboard.js');
    return;
  }

  res.render('login');
});

// this renders the homepage.handlebars template
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'description', 'created_at', 'user_id'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      // Serialize the data, essentially making it an easier object to iterate through
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Reverse the order of all posts so the newest posts show near the top
      posts.reverse();
      // Render the homepage template and include the posts object we just declared
      res.render('home', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id, // params == endpoint url data
    },
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
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      const title = dbPostData.dataValues.title;
      const user = dbPostData.dataValues.user.username;
      const date = dbPostData.dataValues.created_at;
      const description = dbPostData.dataValues.description;
      const post = {
        title,
        date,
        user,
        description,
        comments: [],
      };
      // For each comment, push it to the array inside our object
      for (let i = 0; i < dbPostData.dataValues.comments.length; i++) {
        let username = dbPostData.dataValues.comments[i].user.username;
        let commentText = dbPostData.dataValues.comments[i].comment_text;
        let commentDate =
          dbPostData.dataValues.comments[i].dataValues.created_at;
        let user_id = dbPostData.dataValues.comments[i].dataValues.user_id;
        let comment_id = dbPostData.dataValues.comments[i].dataValues.id;

        post.comments.push({
          user: username,
          userId: user_id,
          text: commentText,
          date: commentDate,
          commentId: comment_id,
          // Check the username of each comment and return 'true' if username matches logged in user
          usersComment: username == req.session.username,
        });
      }

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;