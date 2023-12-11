import { Box, Divider } from "@mui/material";
import Content from "./content";
import Comments from "./comments";

function Main({ id, contentProps }) {
  return (
    <Box>
      <Content {...contentProps} />
      <Divider sx={{ my: 2 }} />
      <Comments id={id} />
    </Box>
  );
}

export default Main;
