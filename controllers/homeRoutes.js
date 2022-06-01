const router = require("express").Router();
const { Post, User, Comment } = require("../models");
// const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    //   const projectData = await Project.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['name'],
    //       },
    //     ],
    //   });

    //   // Serialize data so the template can read it
    //   const projects = projectData.map((project) => project.get({ plain: true }));
    const postsdata = await Post.findAll({
      // attributes: ["title", "content","date_created"],
      include: [{ model: User }],
    });
    // convert to plain javascript
    const posts = postsdata.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/post/:id", async (req, res) => {
  try {
    const postsdata = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    // convert to plain javascript
    const post = postsdata.get({ plain: true });
    console.log(post);
    // Pass serialized data and session flag into template
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
