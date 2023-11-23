import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import { data } from "./data";
import { validate } from "./validation";
import { useDispatch } from "react-redux";
import CustomeLink from "../../../shared/customeLink";
import FormCreator from "../../../shared/formCreator";
import {
  handleClose,
  handleComponent,
  handleToken,
} from "../../../../store/slices/authSlice";
import { useRegisterMutation } from "../../../../store/apis/authentication";

function Register() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(true);
  const handleRemember = () => {
    setRemember(!remember);
  };

  const [register, { isSuccess, data: userData, error }] =
    useRegisterMutation();
  const handleSubmit = (values) => {
    const { email, password, firstName, lastName } = values;
    register({
      userName: email.split("@")[0],
      email,
      password,
      firstName,
      lastName,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleToken(userData.jwt));
      dispatch(handleClose());
    }
  }, [isSuccess]);

  return (
    <Box>
      <Stack alignItems={"center"}>
        <FormHelperText sx={{ color: "red" }}>
          {error?.data.error.message}
        </FormHelperText>
      </Stack>
      <FormCreator data={data} validate={validate} submit={handleSubmit}>
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={handleRemember} />}
          label="Remember me"
        />
        <Typography sx={{ my: 1 }} variant="body2">
          By clicking register. i accept all{" "}
          <CustomeLink
            href={"/termsAndContditions"}
            label={"Terms"}
            style={{ color: "text.primary", fontWeight: 800 }}
          />{" "}
          and{" "}
          <CustomeLink
            href={"/termsAndContditions"}
            label={"Conditions"}
            style={{ color: "text.primary", fontWeight: 800 }}
          />{" "}
        </Typography>
        <Button sx={{ width: "100%", my: 2 }} type="submit" variant="contained">
          sign up
        </Button>
      </FormCreator>

      <Typography variant="body2">
        Already have an account?{" "}
        <Box
          component={"strong"}
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(handleComponent("login"))}
        >
          login
        </Box>
      </Typography>
    </Box>
  );
}

export default Register;
