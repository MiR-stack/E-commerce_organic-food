"use client";
import { Box } from "@mui/material";
import Header from "./header";
import { useState } from "react";
import Products from "./products/products";

function ProductsView({ categories }) {
  const [view, setView] = useState("grid");
  const handleView = (_e, view) => setView(view);

  return (
    <Box sx={{ width: "100%" }}>
      <Header handleView={handleView} view={view} categories={categories} />
      <Products layout={view} />
    </Box>
  );
}

export default ProductsView;
