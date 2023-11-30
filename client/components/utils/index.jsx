import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Stack,
  Button,
  styled,
  Typography,
  IconButton,
} from "@mui/material";

function Backdrop({ opacity = 0.5 }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: `rgba(0, 0, 0, ${opacity})`,
      }}
    ></Box>
  );
}

/**
 * @name quantityController
 * @variants [sm]
 * @returns {Object} jsx
 */
function QuantityController({
  increaseQuantity,
  dicreaseQuantity,
  quantity = 1,
  variant,
}) {
  if (variant === "sm") {
    return (
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton onClick={dicreaseQuantity} aria-label="remove">
          <Remove />
        </IconButton>
        <Typography variant="h6"> {quantity} </Typography>
        <IconButton onClick={increaseQuantity} aria-label="add">
          <Add />
        </IconButton>
      </Stack>
    );
  }

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
