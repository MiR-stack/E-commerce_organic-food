import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

function Backdrop() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: " rgba(0, 0, 0, 0.5)",
      }}
    ></Box>
  );
}

export default Backdrop;
