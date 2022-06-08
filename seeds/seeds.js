const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const posts = [];

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const postItem = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(postItem);
  }

  for (const comment of commentData) {
    const commentItem = await Comment.create({
      ...comment,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,

      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
