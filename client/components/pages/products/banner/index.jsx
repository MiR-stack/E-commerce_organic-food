import { Box, Stack, Typography } from "@mui/material";
import CustomBreadcrumbs from "../../../shared/Breadcrumbs";
import { getBanner } from "../../../../utils";
import Image from "next/image";
import { Backdrop } from "../../../utils";

async function Banner({ children, name }) {
  const {
    srcs: { large },
    alt,
    breadcrumb,
  } = await getBanner("products");

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
        alt={alt}
        src={large}
        quality={100}
        fill
        sizes="100%"
        style={{
          objectFit: "cover",
        }}
        priority
      />
      <Backdrop />
      <CustomBreadcrumbs links={breadcrumb} currentPage={"products"} />
      <Stack
        component={"main"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ minHeight: { sm: 100, xs: 60 }, pt: { xs: 1, sm: 0 } }}
      >
        {name ? (
          <Typography variant="h4" component={h2}>
            {name}{" "}
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
