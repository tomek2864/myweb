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

// @route   GET api/articles/id/:id
// @desc    Get articles by id
// @access  Public
router.get("/id/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err =>
      res.status(404).json({ noarticlesfound: "Brak artykułu o takim ID." })
    );
});

// @route   GET api/articles/handle/:handle
// @desc    Get articles by User Handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        Article.find({ user: profile.user.id })
          .sort({ date: -1 })
          .then(articles => res.json(articles))
          .catch(err =>
            res
              .status(404)
              .json({ noarticlesfound: "Nie znaleziono żadnych artykułów." })
          );
      } else {
        //errors
        res
          .status(404)
          .json({ profile: "Ten user nie ma utworzonego profilu." });
      }
    });
});

// @route   GET api/articles /handle/:handle
// @desc    Get articles by User Handle
// @access  Public
router.get("/handle/:handle/:tag", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        Article.find({
          user: profile.user.id,
          tags: { $all: [req.params.tag] }
        })
          .sort({ date: -1 })
          .then(articles => res.json(articles))
          .catch(err =>
            res
              .status(404)
              .json({ noarticlesfound: "Nie znaleziono żadnych artykułów." })
          );
      } else {
        //errors
        res
          .status(404)
          .json({ profile: "Ten user nie ma utworzonego profilu." });
      }
    });
});

// @route   GET api/articles/type/:type
// @desc    Get articles by type
// @access  Public
router.get("/tag/:typeID", (req, res) => {
  Article.find({ tags: { $all: [req.params.typeID] } })
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
      title: req.body.title,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      summary: req.body.summary,
      ytLinks: req.body.ytLinks,
      photoLinks: req.body.photoLinks,
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
          if (article.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "Użytkownik nieautoryzowany" });
          }
          //Usuwanie
          article.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json("Artykułu nieznaleziono"));
    });
  }
);

module.exports = router;
