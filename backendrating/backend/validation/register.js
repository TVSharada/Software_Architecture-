const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lasttname = !isEmpty(data.lasttname) ? data.lasttname : "";
  data.email_id = !isEmpty(data.email_id) ? data.email_id : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.re_enterpassword = !isEmpty(data.re_enterpassword) ? data.re_enterpassword : "";
// Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email_id)) {
    errors.email_id = "Email field is required";
  } else if (!Validator.isEmail(data.email_id)) {
    errors.email_id = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.re_enterpassword)) {
    errors.re_enterpassword = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.re_enterpassword)) {
    errors.re_enterpassword = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};