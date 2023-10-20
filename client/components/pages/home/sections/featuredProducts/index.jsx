import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { GetProduct } from "../../../../../utils";
import Card from "./card";

async function FeaturedProduts() {
  const products = await GetProduct("products", "featured");

  return (
    <Grid container spacing={{ xs: 3, lg: 4 }}>
      {products.data.map((product) => {
        product.attributes.id = product.id;
        return (
          <Grid md={4} sm={6} xs={12} key={product.id}>
            {" "}
            <Card data={product.attributes} variant="featured" />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default FeaturedProduts;
