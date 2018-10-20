const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateLogin = require("../../validator/login");
const validateRegister = require("../../validator/register");

const User = require("../../models/User");

//Sprawdzenie users route
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email taki istneje";
      return res.status(400).json({ errors });
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

      //hash hasla, generate salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() // zapis do db
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
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Przeszukanie bazy maili
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.user = "Nie ma takiego użytkownika";
      return res.status(404).json(errors);
    }
    //Sprawdzanie hasla przez bcrypt
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Uzytkownik sprawdzony
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Tworzenie JWT  JSON Web Token Payload

        // Sign Token
        // Jak dlugo Token jest przy zyciu
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 }, // ustawiony czas zycia tokenu
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token // Utworzenie tokenu
            });
          }
        );
      } else {
        errors.password = "Hasło jest niewłaściwe";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/actual
// @desc Return actual login user
// @access Private
router.get(
  "/actual",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
