import { Button, Stack, Typography } from "@mui/material";

function Tags({ tags }) {
  return (
    <Stack gap={2}>
      <Typography variant="h6">Tags:</Typography>

      <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
        {tags.map((tag) => (
          <Button variant="outlined">{tag.attributes.name} </Button>
        ))}
      </Stack>
    </Stack>
  );
}

export default Tags;
