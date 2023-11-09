import { Box, Stack, Button, styled, Typography } from "@mui/material";

function Backdrop() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: " rgba(0, 0, 0, 0.5)",
      }}
    ></Box>
  );
}

/**
 *
 * @param {Number} id product id
 * @returns
 */
function QuantityController({
  id,
  increaseQuantity,
  dicreaseQuantity,
  quantity = 1,
}) {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Button
        variant="outlined"
        sx={{ p: "5px" }}
        size="small"
        onClick={increaseQuantity}
      >
        +
      </Button>
      <Typography>{quantity}</Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{ p: "5px" }}
        onClick={dicreaseQuantity}
      >
        -
      </Button>
    </Stack>
  );
}

export { Backdrop, QuantityController };
