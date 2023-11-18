import { Star } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

function EmptyReviews() {
  return (
    <Stack alignItems={"center"} sx={{ p: 5 }}>
      <Star sx={{ height: 200, width: 200, color: "GrayText" }} />
      <Typography variant="h6" color={"GrayText"}>
        No reviews yet
      </Typography>
      <Typography variant="body1">Leave you experiance </Typography>
    </Stack>
  );
}

export default EmptyReviews;
