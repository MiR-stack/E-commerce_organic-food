import { Comment } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

function EmptyComments() {
  return (
    <Stack alignItems={"center"} sx={{ p: 5 }}>
      <Comment sx={{ height: 200, width: 200, color: "GrayText" }} />
      <Typography variant="h6" color={"GrayText"}>
        No discussion yet
      </Typography>
      <Typography variant="body1">Let's start to discuss </Typography>
    </Stack>
  );
}

export default EmptyComments;
