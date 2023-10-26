import { Box, Skeleton, Stack } from "@mui/material";

function ProductCardSkelton({ view }) {
  return (
    <Stack gap={1} direction={view !== "grid" ? "row" : "column"}>
      <Skeleton
        variant="rectangular"
        height={150}
        width={view === "grid" ? "100%" : 250}
      />
      <Box sx={{ width: "100%" }}>
        <Stack>
          <Skeleton variant="text" width={"80%"} />
          <Skeleton variant="text" width={"40%"} />
          <Skeleton variant="text" width={"20%"} />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Skeleton variant="rounded" height={30} width={"50%"} />
          <Skeleton variant="circular" height={30} width={30} />
        </Stack>
      </Box>
    </Stack>
  );
}

export default ProductCardSkelton;
