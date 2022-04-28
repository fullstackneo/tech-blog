const router = require('express').Router();

const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: 1,
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
      res.render('dashboard', { posts });

      // res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/create-post', (req, res) => {
  res.render('create-post')
})

router.get('/edit/:id', (req, res) => {
  res.render('edit-post');
});

module.exports = router;
