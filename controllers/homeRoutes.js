const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postsdata = await Post.findAll({
      // attributes: ["title", "content","date_created"],
      include: [{ model: User }],
    });
    // convert to plain javascript
    const posts = postsdata.map((post) => post.get({ plain: true }));
    // console.log(posts);
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
      include: [{ model: User }, { model: Comment }],
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

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      //the person going through the process of logging in with set a session that then become the req.session.user_id value
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    //get rid of password info, and also get all of the user's posts

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      //triple dots - breaking up an existing array into a new array
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    //if you are logged in there is no point to going to the login page
    //force redirect to profile
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
