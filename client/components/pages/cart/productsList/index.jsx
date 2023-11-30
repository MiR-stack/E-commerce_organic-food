"use client";

import { Box, Container, Divider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "./card";
import CartActions from "../actions";

function ProductsList() {
  const cart = useSelector((state) => state.products.carts);

  // calculate subtotal and saved

  let subtotal = 0;
  let saved = 0;
  const len = cart.length;
  for (let i = 0; i < len; i++) {
    const { quantity, salePrice, price } = cart[i];
    subtotal += quantity * salePrice;
    saved = quantity * price - quantity * salePrice;
  }

  return (
    <Container maxWidth={"md"}>
      <Stack spacing={3} sx={{ mt: { sm: 8, xs: 3 } }}>
        {cart?.map((item) => (
          <Stack key={item.id} spacing={3}>
            <Card product={item} />
            <Divider />
          </Stack>
        ))}
      </Stack>
      <CartActions subtotal={subtotal} saved={saved} />
    </Container>
  );
}

export default ProductsList;
