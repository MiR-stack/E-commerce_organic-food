import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
function CartActions({ subtotal, saved }) {
  return (
    <Stack
      direction={{ sm: "row", xs: "column-reverse" }}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      sx={{ mt: 5 }}
      gap={2}
    >
      <Link href={"/"} legacyBehavior>
        <Button variant="outlined" sx={{ width: { xs: "100%", sm: "unset" } }}>
          Continue Shopping{" "}
        </Button>
      </Link>
      <Stack gap={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Sub Total: </Typography>
          <Typography variant="h4">${subtotal} </Typography>
        </Stack>
        {saved > 0 ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Saved: </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                fontSize: "calc(.8rem + 1vw)",
              }}
              color={"text.secondary"}
            >
              ${saved}{" "}
            </Typography>
          </Stack>
        ) : (
          ""
        )}
        <Typography variant="body1">
          Shipping and tax Will Calculate at Checkout
        </Typography>
        <Link href={"/checkout"} legacyBehavior>
          <Button variant="contained"> Checkout</Button>
        </Link>
      </Stack>
    </Stack>
  );
}

export default CartActions;
