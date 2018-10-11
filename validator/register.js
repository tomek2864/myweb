const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name musi być większe od 2 a mniejsze od 30 znaków";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Pole Name jest wymagane";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Pole email jest wymagane";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email jest błędny";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Pole z hasłem jest puste";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Hasło musi być większe od 6 i mniejsze od 30 znaków";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Powtórzenie hasła jest konieczne!";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Hasła do siebie nie pasują";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
