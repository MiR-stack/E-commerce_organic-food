export const validate = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  let error = {};

  if (!firstName) {
    error.firstName = "first name is required field";
  } else if (firstName.length > 20) {
    error.firstName = "name is too long. please use name under 20 charcter";
  }

  if (!lastName) {
    error.lastName = "last name is required field";
  } else if (lastName.length > 20) {
    error.firstName = "name is too long. please use name under 20 charcter";
  }

  if (!email) {
    error.email = "email is required field";
  } else if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    error.email = "please provide a valid email";
  }

  if (!password) {
    error.password = "password is required field";
  } else if (password.length < 6) {
    error.password = "password is too short please use minimum 6 charcter";
  }

  if (!confirmPassword) {
    error.confirmPassword = "confirmPassword is required field";
  } else if (confirmPassword !== password) {
    error.confirmPassword = "password is not matched matched";
  }

  return error;
};
