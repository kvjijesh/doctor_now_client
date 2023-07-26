const validate = (values) => {
  const errors = {};
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!values.name) {
    errors.name = "Username is required";
  } else if (/\s/g.test(values.name)) {
    errors.name = "Username cannot contain spaces";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (/\s/g.test(values.password)) {
    errors.password = "Password cannot contain spaces";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default validate;
