/* eslint-disable no-unused-vars */
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();