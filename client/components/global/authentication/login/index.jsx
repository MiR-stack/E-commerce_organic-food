import {
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  FormHelperText,
  Stack,
} from "@mui/material";
import FormCreator from "../../../shared/formCreator";
import { data } from "./data";
import { validate } from "./validation";
import { useEffect, useState } from "react";
import { handleComponent } from "../../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../../store/apis/authentication";
import { handleClose, handleToken } from "../../../../store/slices/authSlice";

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
        dispatch(handleToken(result.data.jwt));
      }
      dispatch(handleClose());
    }
  }, [result.status]);

  const { error } = useSelector((state) => state.authentication);

  return (
    <Box>
      <Stack alignItems={"center"}>
        <FormHelperText sx={{ color: "red" }}>
          {result.error?.data?.error.message || error}
        </FormHelperText>
      </Stack>
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
    </Box>
  );
}

export default Login;
