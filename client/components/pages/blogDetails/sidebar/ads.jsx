import { Box, Stack, Typography } from "@mui/material";

function Ads() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        bgcolor: "divider",
        cursor: "pointer",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          border: "1px solid black",
          height: "80%",
          width: "80%",
        }}
      >
        <Typography variant="h4"> Ads</Typography>
      </Stack>
    </Stack>
  );
}

export default Ads;
