const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfile = require("../../validator/profile");
const validateExperience = require("../../validator/experience");
const validateEducation = require("../../validator/education");

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
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Nie ma profilu dla tego uzytkownika";
          return res.status(404).json(errors);
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
          errors.noprofile = "Brak profili użytkowników";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({ profile: "Brak profili użytkowników." })
      );
    // obsluga bledów do zmiany
  }
);

// @route   POST api/profile
// @desc    Add user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);
    //Sprawdzenie czy nie zostały wprowadzone błedne dane, dot wszystkich zapytan POST
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    let fieldsOfSkills = [];
    // Skills sa tablica
    if (typeof req.body.skills !== "undefined") {
      let pos_mainSkill, sub_str_mainSkill, sub_str_skills;
      const elemSkillsTable = req.body.skills.split(";");
      elemSkillsTable.forEach((element, index) => {
        //elemSkillsTable[index] = elemSkillsTable[index].replace(/\s+/g, ""); //usuwanie bialych znakow
        pos_mainSkill = elemSkillsTable[index].search(":");
        sub_str_mainSkill = elemSkillsTable[index].substr(0, pos_mainSkill);
        sub_str_skills = elemSkillsTable[index].substr(pos_mainSkill + 1);

        /* if (sub_str_mainSkill[0] === " ") {
          sub_str_mainSkill[0].replace(/\s+/g, ""); //usuwanie bialych znakow
        }
        if (sub_str_skills[0] === " ") {
          sub_str_skills[0].replace(" ", ""); //usuwanie bialych znakow
        } */

        fieldsOfSkills.push({
          main: sub_str_mainSkill,
          skills: sub_str_skills
        });

        //console.log(skillsTabTmp[index].skills);
      });
      profileFields.skills = fieldsOfSkills;
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Brak znanego id, takze tworzymy nowy profil
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Taki handle istnieje";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  // errors
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        //errors
        res
          .status(404)
          .json({ profile: "Ten user nie ma utworzonego profilu." });
      }
    });
});

// @route   GET api/profile/user/:userID
// @desc    Get profile by use useriD
// @access  Public
router.get("/user/:userID", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.userID })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        //error
        errors.noprofile = "Ten user nie ma utworzonego profilu.";
        res.status(404).json(errors);
      }
    })
    .catch(err =>
      res.status(404).json({ profile: "Ten user nie ma utworzonego profilu." })
    );
});

// @route   POST api/profile/experience
// @desc    Add experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperience(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Umiesczenie newExperience w tablicy
      profile.experience.unshift(newExperience);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      profile.education.unshift(newEducation);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/experience/:expID
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:expID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.expID);

        //Usuniecie z tablicy
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/education/:eduID
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:eduID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.eduID);

        //Usuniecie z tablicy
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user/profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
