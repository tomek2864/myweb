const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile/
// @desc    Get actual users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //obsługa błędów

    Profile.findOne({ user: req.body.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          return res.status.json("Nie ma profilu dla tego uzytkownika"); // obsluga bledów do zmiany
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all users profile
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TO DO Obsługa błędów
    Profile.find() // wszystkie profile
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          return res.status.json("Brak profili użytkowników"); // obsluga bledów do zmiany
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({ profile: "Brak profili użytkowników." })
      );
    // obsluga bledów do zmiany
  }
);

module.exports = router;
