const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const postList = [];
  for (const post of postData) {
    const postItem = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    postList.push(postItem);
  }

  for (const comment of commentData) {
    const commentItem = await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: postList[Math.floor(Math.random() * postList.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
