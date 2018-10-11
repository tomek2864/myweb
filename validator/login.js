const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email jest błędny";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Należy podac adres email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Należy podac hasło";
  }

  return {
    errors, //obiekt
    isValid: isEmpty(errors)
  };
};
