const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //hash the password, generate salt
      bcrypt.getSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          (newUser.password = hash),
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login User / Returnig JWT Token
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      //Login
    } else {
      return res.status(404).json("error login");
    }
  });
});

module.exports = router;
