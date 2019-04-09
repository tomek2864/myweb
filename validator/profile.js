const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(arg) {
  let errors = {};
  rExpEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  arg.handle = !isEmpty(arg.handle) ? arg.handle : "";
  arg.email = !isEmpty(arg.email) ? arg.email : "";
  arg.status = !isEmpty(arg.status) ? arg.status : "";
  //arg.skills = !isEmpty(arg.skills) ? arg.skills : "";

  if (!Validator.isLength(arg.handle, { min: 2, max: 40 })) {
    errors.handle = "Handler musi zawierać od 2 do 40 znaków";
  }
  if (Validator.isEmpty(arg.handle)) {
    errors.handle = "Handler profilu jest wymagany";
  }
  if (Validator.isEmpty(arg.email)) {
    errors.email = "Adres email jest wymagany";
  }
  if (!isEmpty(arg.email)) {
    if (!arg.email.match(rExpEmail)) {
      errors.email = "Adres email jest niepoprawny";
    }
  }

  if (Validator.isEmpty(arg.status)) {
    errors.status = "Nazwa profesji jest wymagana";
  }
  /* if (Validator.isEmpty(arg.skills)) {
    errors.skills = "Umiejętności są wymagane";
  } */

  if (!isEmpty(arg.website)) {
    if (!Validator.isURL(arg.website)) {
      error.website = "Adres URL jest błędny";
    }
  }
  if (!isEmpty(arg.youtube)) {
    if (!Validator.isURL(arg.youtube)) {
      error.youtube = "Adres URL jest błędny";
    }
  }
  if (!isEmpty(arg.linkedin)) {
    if (!Validator.isURL(arg.linkedin)) {
      error.linkedin = "Adres URL jest błędny";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
