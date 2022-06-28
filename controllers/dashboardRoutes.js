/* eslint-disable no-unused-vars */
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'content', 'title', 'created_at'],
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
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: true,
      username: req.session.username,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'content', 'title', 'created_at'],
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
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found'});
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      post,
      logged_in: true,
      username: req.session.username,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/new', (req, res) => {
  res.render('new-post', { username: req.session.username });
});

module.exports = router;