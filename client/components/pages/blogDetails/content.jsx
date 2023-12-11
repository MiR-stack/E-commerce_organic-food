import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { getFormatedImage, getStrapiMedia } from "../../../utils";
import { ShareOutlined } from "@mui/icons-material";
import Share from "../../utils/Share";
import Author from "./author";

function Content({ title, content, urlToImage, permalink, authorId }) {
  // get required image sizes
  const {
    srcs: { large },
    alt,
  } = getFormatedImage(urlToImage);

  return (
    <Stack gap={2}>
      <Box>
        <Typography
          variant="h3"
          component={"h1"}
          sx={{ mt: 4, fontFamily: "'Teko', sans-serif" }}
        >
          {title}{" "}
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <span>
            <Author authorId={authorId} />
          </span>
          <Share
            text={"share this artice"}
            title={"share with your friend"}
            url={permalink}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="subtitle1">Share:</Typography>
              <ShareOutlined sx={{ fontSize: "16px" }} />
            </Stack>
          </Share>
        </Stack>
      </Box>
      <Box
        sx={{
          height: 400,
          width: "100%",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          src={large}
          alt={alt || title}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100%"
        />
      </Box>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Stack>
  );
}

export default Content;
