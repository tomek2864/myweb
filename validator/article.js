const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateArticle(arg) {
  let errors = {};

  arg.title = !isEmpty(arg.title) ? arg.title : "";
  arg.text = !isEmpty(arg.text) ? arg.text : {};
  arg.tags = !isEmpty(arg.tags) ? arg.tags : "";

  if (!Validator.isLength(arg.title, { min: 3 })) {
    errors.title = "Tytul musi zawierać minimum 3 znaki";
  }

  if (Validator.isEmpty(arg.title)) {
    errors.title = "Tytul jest wymagany";
  }

  /*if (!Validator.isLength(arg.text, { min: 100 })) {
    errors.text = "Artykuł musi zawierać przynajmniej 100 znaków";
  }

   if (Validator.isEmpty(arg.text)) {
    errors.text = "Tekst jest wymagany";
  } */
  if (Validator.isEmpty(arg.tags)) {
    errors.tags = "Należy podać przynajmniej jeden tag";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
