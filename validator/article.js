const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateArticle(arg) {
  let errors = {};

  arg.text = !isEmpty(arg.text) ? arg.text : "";
  arg.tags = !isEmpty(arg.tags) ? arg.tags : "";

  if (!Validator.isLength(arg.text, { min: 100 })) {
    errors.text = "Artykuł musi zawierać przynajmniej 100 znaków";
  }

  if (Validator.isEmpty(arg.text)) {
    errors.text = "Tekst jest wymagany";
  }
  if (Validator.isEmpty(arg.tags)) {
    errors.tags = "Należy podać przynajmniej jeden tag";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
