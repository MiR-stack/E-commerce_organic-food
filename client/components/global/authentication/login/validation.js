export const validate = ({ email, password }) => {
  let error = {};

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

  return error;
};
