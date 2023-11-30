import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { QuantityController } from "../../../utils";
import { useDispatch } from "react-redux";
import {
  dicreaseItem,
  increaseItem,
  removeCart,
} from "../../../../store/slices/productSlice";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function CartProductCart({ product }) {
  const { id, thumbnail, name, price, salePrice, quantity } = product;

  //   handle quantity
  const dispatch = useDispatch();
  const increaseQuantity = () => {
    dispatch(increaseItem(id));
  };

  const dicreaseQuantity = () => {
    dispatch(dicreaseItem(id));
  };

  //   handle remove
  const remove = () => {
    dispatch(removeCart(id));
  };

  return (
    <Grid container gap={2}>
      <Grid sm={6} xs={12}>
        <Stack direction={"row"} spacing={2}>
          <Box sx={{ height: 80, width: 100, position: "relative" }}>
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="30vh"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Stack>
            <Typography variant="h6" component={"h3"}>
              {name}{" "}
            </Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography variant="h6" component={"p"}>
                {" "}
                ${salePrice}{" "}
              </Typography>
              {salePrice < price ? (
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "line-through" }}
                  component={"p"}
                >
                  ${price}{" "}
                </Typography>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid sm={2} xs={5}>
        <Stack alignItems={"center"}>
          <QuantityController
            variant={"sm"}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            dicreaseQuantity={dicreaseQuantity}
          />
          <Button sx={{ textDecoration: "underline" }} onClick={remove}>
            {" "}
            Remove
          </Button>
        </Stack>
      </Grid>
      <Grid sm={3} xs={6}>
        <Stack alignItems={{ sm: "flex-end", xs: "center" }}>
          <Typography variant="h6">Total</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="h6">${salePrice * quantity} </Typography>
            {salePrice < price ? (
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through" }}
              >
                ${price * quantity - salePrice * quantity}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CartProductCart;
