const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Model artykulu
const Article = require("../../models/Article");

// Model profilu uzytkownika
const Profile = require("../../models/Profile");

const validateArticle = require("../../validator/article");

//Sprawdzenie arktykyl route
// @route   GET api/articles/test
// @desc    Tests article route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Articles works" }));

// @route   GET api/articles
// @desc    Get articles route
// @access  Public
router.get("/", (req, res) => {
  Article.find()
    .sort({ date: -1 })
    .then(articles => res.json(articles))
    .catch(err =>
      res
        .status(404)
        .json({ noarticlesfound: "Nie znaleziono żadnych artykułów." })
    );
});

// @route   GET api/articles/:id
// @desc    Get articles by id
// @access  Public
router.get("/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err =>
      res.status(404).json({ noarticlesfound: "Brak artykułu o takim ID." })
    );
});

// @route   GET api/articles/type/:type
// @desc    Get articles by type
// @access  Public
router.get("/type/:typeID", (req, res) => {
  Article.find({ tags: req.params.typeID })
    .populate("tags.type")
    .then(article => res.json(article))
    .catch(err =>
      res
        .status(404)
        .json({ noarticlesfound: "Brak artykułów o podanych tagach" })
    );
});

// @route   GET api/articles
// @desc    Create article
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticle(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newArticle = new Article({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      tags: req.body.tags.split(",")
    });

    newArticle.save().then(article => res.json(article));
  }
);

// @route   DELETE api/articles/:id
// @desc    Delete article
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Article.findById(req.params.id)
        .then(article => {
          //Sprawdz użytkownika
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "Użytkownik nieautoryzowany" });
          }
          //Usuwanie
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json("Postu nieznaleziono"));
    });
  }
);

module.exports = router;
