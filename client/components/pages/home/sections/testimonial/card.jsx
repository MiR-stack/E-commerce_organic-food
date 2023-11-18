import {
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CustomAvatar from "../../../../utils/avatar";

function TestimonialCard({ avatar, name, review, rating }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
        height: 300,
        bgcolor: "background.paper",
      }}
    >
      <CustomAvatar avatar={avatar} name={name} />
      <CardContent>
        <Stack
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
          spacing={2}
        >
          <Box>
            <Typography
              component={"h5"}
              variant="h6"
              textTransform="capitalize"
            >
              {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={rating} readOnly />
              <Box sx={{ ml: 1 }}>{rating} </Box>
            </Box>
          </Box>
          <Typography>
            {review.length > 130
              ? `${`${review}`.substring(0, 130)}...`
              : review}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
