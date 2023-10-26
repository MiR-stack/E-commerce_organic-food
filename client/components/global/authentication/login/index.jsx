import {
  Stack,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import FormCreator from "../../../shared/formCreator";
import { data } from "./data";
import { validate } from "./validation";
import { useEffect, useState } from "react";
import { Google } from "@mui/icons-material";
import {
  handleComponent,
  handleToken,
} from "../../../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../../store/apis/authentication";
import { handleClose } from "../../../../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(true);
  const handleRemember = () => setRemember(!remember);

  const [login, result] = useLoginMutation();
  const handleSubmit = (values) => {
    login(values);
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      if (remember) {
        localStorage.setItem("token", JSON.stringify(result.data.jwt));
      }
      dispatch(handleToken(result.data.jwt));
      dispatch(handleClose());
    }
  }, [result.status]);

  return (
    <Stack alignItems={"center"} gap={1}>
      <Button variant="outlined" startIcon={<Google />}>
        {" "}
        sign in with google
      </Button>

      <Divider>or</Divider>
      <FormHelperText sx={{ color: "red" }}>
        {result.error?.data?.error.message}{" "}
      </FormHelperText>
      <FormCreator data={data} validate={validate} submit={handleSubmit}>
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={handleRemember} />}
          label="Remember me"
        />
        <Button fullWidth sx={{ my: 2 }} type="submit" variant="contained">
          log in
        </Button>
      </FormCreator>
      <Typography variant="body2">
        Didn't have any acount?{" "}
        <Box
          component={"strong"}
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(handleComponent("register"))}
        >
          {" "}
          register
        </Box>
      </Typography>
    </Stack>
  );
}

export default Login;
