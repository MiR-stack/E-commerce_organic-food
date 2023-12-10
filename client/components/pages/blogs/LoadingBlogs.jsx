import React from "react";
import { Box, Skeleton, Stack, Divider } from "@mui/material";

function LoadingBlog({ index }) {
  return (
    <Stack
      flexDirection={{
        md: index % 2 === 0 ? "row-reverse" : "row",
        xs: "column",
      }}
      gap={2}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: { lg: 900, md: "400px", xs: "100%" },
          height: { md: "300px", sm: "220px", xs: "180px" },
        }}
      />
      <Stack gap={2} width={"100%"}>
        <Stack>
          <Skeleton variant="text" sx={{ fontSize: "4rem", width: "100%" }} />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "16px" }}
              width={"100px"}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "16px" }}
              width={"100px"}
            />
          </Stack>
        </Stack>
        <Stack>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Stack alignItems={"flex-end"}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "20px", width: "120px" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function LoadingBlogs() {
  return [1, 2, 3, 4, 5].map((_, index) => (
    <Box key={index} width={{ sm: "48%", md: "100%" }}>
      <LoadingBlog index={index} />
      <Divider
        sx={{ mt: { md: 5, xs: 2 }, display: { sm: "none", md: "block" } }}
      />
    </Box>
  ));
}

export default LoadingBlogs;
