import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Timer from "./timer";
import { getFormatedImage, getStrapiMedia } from "../../../../utils";
import Image from "next/image";
import TransparentBg from "../../../utils/transparenBg";
import Link from "next/link";

function Offer({
  data: { title, shortDescription, mainText, expireDate, buttons, image },
}) {
  const { srcs } = getFormatedImage(image);

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Box
        sx={{
          background: {
            xs: `url(${srcs.thumbnail})`,
            sm: `url(${srcs.small})`,
            md: `url(${srcs.medium})`,
            lg: `url(${srcs.large})`,
          },
        }}
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        component="div"
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 5 },
            background: "rgba(0,0,0,.65)",
          }}
        >
          <Stack
            alignItems={"center"}
            gap={1}
            sx={{
              p: { xs: 1, sm: 3 },
              border: 2,
              color: "grey.50",
              textAlign: "center",
            }}
          >
            <Typography variant="button" component="h5">
              {title}{" "}
            </Typography>
            <Typography variant="subtitle1">{shortDescription} </Typography>
            <Typography variant="h4" sx={{ color: "tertiary.main" }}>
              {mainText}{" "}
            </Typography>
            <Timer expireDate={expireDate} />
            <Link href={buttons[0].href} legacyBehavior>
              <Button variant="contained">{buttons[0].label} </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Offer;
