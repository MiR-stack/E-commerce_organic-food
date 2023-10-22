import {
  Avatar,
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { getStrapiMedia } from "../../../../../utils";

function TestimonialCard({ avatar, name, review, rating }) {
  const avatarMedia = getStrapiMedia(
    avatar.data?.attributes.formats.thumbnail.url
  );

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  name = name.replace(/\s+/g, " ").trim();
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
      <Avatar
        src={avatarMedia}
        alt={avatar.data?.attributes.alternativeText || "avater"}
        sx={{
          bgcolor: stringToColor(name),
          height: 70,
          width: 70,
          textTransform: "uppercase",
        }}
      >
        {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
      </Avatar>
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
