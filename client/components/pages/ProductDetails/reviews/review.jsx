import { Rating, Stack, Typography } from "@mui/material";
import CustomeAvatar from "../../../utils/avatar";

const Review = ({ avatar, name, rating, content }) => {
  return (
    <Stack direction={{ md: "row" }} spacing={2}>
      <CustomeAvatar
        avatar={avatar}
        name={name}
        styles={{ height: 50, width: 50 }}
      />
      <Stack>
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {name}{" "}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Rating value={rating} readOnly />
          <Typography variant="h6">{rating} </Typography>
        </Stack>
        <Typography variant="body1">{content} </Typography>
      </Stack>
    </Stack>
  );
};

export default Review;
