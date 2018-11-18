const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(arg) {
  let errors = {};

  arg.name = !isEmpty(arg.name) ? arg.name : "";
  arg.email = !isEmpty(arg.email) ? arg.email : "";
  arg.password = !isEmpty(arg.password) ? arg.password : "";
  arg.password2 = !isEmpty(arg.password2) ? arg.password2 : "";

  if (!Validator.isLength(arg.name, { min: 2, max: 30 })) {
    errors.name = "Name musi być większe od 2 a mniejsze od 30 znaków";
  }

  if (Validator.isEmpty(arg.name)) {
    errors.name = "Nazwa użytkownika jest wymagana";
  }
  if (Validator.isEmpty(arg.email)) {
    errors.email = "Email jest wymagany";
  }
  if (!Validator.isEmail(arg.email)) {
    errors.email = "Email jest błędny";
  }
  if (Validator.isEmpty(arg.password)) {
    errors.password = "Pole z hasłem jest puste";
  }
  if (!Validator.isLength(arg.password, { min: 6, max: 30 })) {
    errors.password = "Hasło musi być większe od 6 i mniejsze od 30 znaków";
  }
  if (Validator.isEmpty(arg.password2)) {
    errors.password2 = "Powtórzenie hasła jest konieczne!";
  }
  if (!Validator.equals(arg.password, arg.password2)) {
    errors.password2 = "Hasła do siebie nie pasują";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
