import { ExpandMore } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

function BlogsLayout({ title, children }) {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} gap={1} mb={2}>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {title}
        </Typography>
        <ExpandMore />
      </Stack>

      {children}
    </Box>
  );
}

export default BlogsLayout;
