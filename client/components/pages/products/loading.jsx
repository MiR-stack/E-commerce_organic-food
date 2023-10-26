import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import ProductCardSkelton from "../../shared/skeltons/productCards";

function Loading({ layout }) {
  const GridProps =
    layout === "grid"
      ? {
          md: 4,
          xs: 6,
        }
      : { xs: 12 };

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {items.map((item) => (
        <Grid2 {...GridProps} key={item}>
          <ProductCardSkelton view={layout} />{" "}
        </Grid2>
      ))}
    </Grid2>
  );
}

export default Loading;
