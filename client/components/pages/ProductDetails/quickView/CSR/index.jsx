"use client";
import { Stack, Typography } from "@mui/material";
import { QuantityController } from "../../../../utils";
import { useState } from "react";
import CardFooter from "../../../../shared/productCard/cardFooter";

const buttonsConfig = {
  favorite: true,
  favoriteLg: false,
  size: "large",
};

function CSR({ data }) {
  const { thumbnail, price, salePrice, id } = data;
  const [quantity, setQuantity] = useState(1);
  console.log("csr", thumbnail);
  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const DicreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  data.quantity = quantity;

  return (
    <Stack gap={2}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
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
          quantity={quantity}
        />
      </Stack>
      <CardFooter data={data} config={buttonsConfig} />
    </Stack>
  );
}

export default CSR;
