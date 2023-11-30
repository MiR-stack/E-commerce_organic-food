import { Box, Stack, Typography } from "@mui/material";
import CustomBreadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import { Backdrop } from "../../utils";

async function Banner({
  children,
  name,
  breadcrumbs,
  currentPage,
  image,
  opacity,
}) {
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        my: { xs: 1, sm: 2 },
        borderRadius: 2,
        bgcolor: "green",
        position: "relative",
        overflow: "hidden",
      }}
      component={"div"}
    >
      <Image
        alt={image.alt || "image"}
        src={image.src}
        quality={100}
        fill
        sizes="100%"
        style={{
          objectFit: "cover",
        }}
        priority
      />
      <Backdrop opacity={opacity} />
      <CustomBreadcrumbs
        links={breadcrumbs}
        currentPage={currentPage}
        styles={{ position: "absolute" }}
      />
      <Stack
        component={"main"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ minHeight: { sm: 120, xs: 80 }, pt: { xs: 1, sm: 0 } }}
      >
        {name ? (
          <Typography
            variant="h4"
            component={"h2"}
            sx={{ color: "white", zIndex: 3 }}
          >
            {name}
          </Typography>
        ) : (
          ""
        )}
        {children}
      </Stack>
    </Box>
  );
}

export default Banner;
