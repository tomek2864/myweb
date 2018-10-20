const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperience(arg) {
  let errors = {};

  arg.school = !isEmpty(arg.school) ? arg.school : "";
  arg.degree = !isEmpty(arg.degree) ? arg.degree : "";
  arg.fieldofstudy = !isEmpty(arg.fieldofstudy) ? arg.fieldofstudy : "";
  arg.from = !isEmpty(arg.from) ? arg.from : "";

  if (Validator.isEmpty(arg.school)) {
    errors.school = "Nazwa szkoły jest wymagana";
  }
  if (Validator.isEmpty(arg.fieldofstudy)) {
    errors.fieldofstudy = "Nazwa kierunku jest wymagana";
  }
  if (Validator.isEmpty(arg.from)) {
    errors.from = "arg rozpoczęcia nauki jest wymagana";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
