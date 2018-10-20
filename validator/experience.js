const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperience(arg) {
  let errors = {};

  arg.title = !isEmpty(arg.title) ? arg.title : "";
  arg.company = !isEmpty(arg.company) ? arg.company : "";
  arg.from = !isEmpty(arg.from) ? arg.from : "";

  if (Validator.isEmpty(arg.title)) {
    errors.title = "Nazwa stanowiska w pracy jest wymagana";
  }
  if (Validator.isEmpty(arg.company)) {
    errors.company = "Nazwa firmy jest wymagana";
  }
  if (Validator.isEmpty(arg.from)) {
    errors.from = "arg rozpoczęcia pracy jest wymagana";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
