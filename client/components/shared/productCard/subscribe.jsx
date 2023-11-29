import { Notifications } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

function Subscribe() {
  return (
    <FormControl variant="outlined" size="sm">
      <FormHelperText id="email-helper-text" sx={{ m: 0 }}>
        Notify me when available
      </FormHelperText>
      <OutlinedInput
        id="email"
        size="sm"
        placeholder="Enter your email"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <Notifications />
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="email-helper-text"
        inputProps={{
          "aria-label": "email",
        }}
      />
    </FormControl>
  );
}

export default Subscribe;
