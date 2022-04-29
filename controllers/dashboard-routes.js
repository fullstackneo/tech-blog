const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      //include the comment model here
    ],
  })
    .then(dbData => {
      const posts = dbData.map(item => item.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn,
      });

      // res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/create-post', withAuth, (req, res) => {
  res.render('create-post');
});

router.get('/edit/:id', withAuth, (req, res) => {
  res.render('edit-post');
});

module.exports = router;
