"use client";
import { Stack, Typography } from "@mui/material";
import { QuantityController } from "../../../utils";
import { useState } from "react";
import CardFooter from "../../productCard/cardFooter";

function CSR({ data }) {
  const buttonsConfig = {
    favorite: true,
    favoriteLg: false,
    size: "large",
    subscribe: data.stockStatus !== "available",
  };

  const { price, salePrice, id } = data;
  const [product, setProduct] = useState(data);
  const IncreaseQuantity = () => {
    setProduct({ ...product, quantity: product.quantity + 1 });
  };
  const DicreaseQuantity = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  return (
    <Stack gap={{ xs: 1, md: 2 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        sx={{ flexWrap: "wrap" }}
      >
        <Typography variant="h3">${salePrice}</Typography>
        {price !== salePrice ? (
          <Typography sx={{ textDecoration: "line-through" }}>
            ${price}
          </Typography>
        ) : (
          ""
        )}
        <QuantityController
          id={id}
          increaseQuantity={IncreaseQuantity}
          dicreaseQuantity={DicreaseQuantity}
          quantity={product.quantity}
        />
      </Stack>
      <CardFooter data={product} config={buttonsConfig} />
    </Stack>
  );
}

export default CSR;
