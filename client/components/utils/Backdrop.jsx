import { Box } from "@mui/material";

function Backdrop({ opacity = 0.5 }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: `rgba(0, 0, 0, ${opacity})`,
      }}
    ></Box>
  );
}

export default Backdrop;
