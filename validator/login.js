const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(arg) {
  let errors = {};

  //Wykorzystanie is-empty.js
  arg.email = !isEmpty(arg.email) ? arg.email : "";
  arg.password = !isEmpty(arg.password) ? arg.password : "";

  if (!Validator.isEmail(arg.email)) {
    errors.email = "Email jest błędny";
  }

  if (Validator.isEmpty(arg.email)) {
    errors.email = "Należy podac adres email";
  }

  if (Validator.isEmpty(arg.password)) {
    errors.password = "Należy podac hasło";
  }

  return {
    errors, //obiekt
    isValid: isEmpty(errors)
  };
};
