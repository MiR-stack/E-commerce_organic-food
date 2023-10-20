import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  Divider,
  FormHelperText,
} from "@mui/material";
import { Google, Token } from "@mui/icons-material";
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
import {
  useCreateProfileMutation,
  useDeleteUserMutation,
  useRegisterMutation,
} from "../../../../store/apis/authentication";

function Register() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(true);
  const handleRemember = () => {
    setRemember(!remember);
  };

  const [formData, setFormData] = useState();
  const [register, { status, isLoading, isSuccess, data: userData, error }] =
    useRegisterMutation();
  const handleSubmit = (values) => {
    const { firstName, lastName, email, password } = values;
    setFormData(values);
    register({ name: `${firstName} ${lastName}`, email, password });
  };

  const [createProfile, profileData] = useCreateProfileMutation();
  const [deleteUser, { data: deletedUser }] = useDeleteUserMutation();
  useEffect(() => {
    if (isSuccess) {
      createProfile({
        id: userData.user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        token: userData.jwt,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (profileData.status === "rejected") {
      deleteUser({ id: userData.user.id, token: userData.jwt });
    }

    if (profileData.status === "fulfilled") {
      if (remember) {
        localStorage.setItem("token", JSON.stringify(userData.jwt));
      }
      dispatch(handleToken(userData.jwt));
      dispatch(handleClose());
    }
  }, [profileData.status]);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
      <Button variant="outlined" startIcon={<Google />}>
        {" "}
        sign up with google
      </Button>

      <Divider>or</Divider>
      <FormHelperText sx={{ color: "red" }}>
        {error?.data.error.message}{" "}
      </FormHelperText>
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
        <Button sx={{ width: "100%" }} type="submit" variant="contained">
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
    </Stack>
  );
}

export default Register;
