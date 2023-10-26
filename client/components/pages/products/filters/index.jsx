"use client";
import { Button, Stack, Typography } from "@mui/material";
import PriceRange from "./priceRange/priceRange";
import FilterList from "./filterlist";

function Filters({ categories, view }) {
  categories = categories.map((category) => category.attributes);

  const availability = [
    {
      name: "in stock",
      slug: "available",
    },
    {
      name: "coming soon",
      slug: "coming soon",
    },
    {
      name: "out of stock",
      slug: "stock out",
    },
  ];

  return (
    <Stack
      gap={2}
      sx={{ width: 250, display: { xs: view ? "flex" : "none", lg: "flex" } }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mb: 1 }}
      >
        <Typography variant="h5">Filter</Typography>
        <Button color="warning">reset</Button>
      </Stack>
      <PriceRange />
      <FilterList param={"category"} title={"Category"} lists={categories} />
      <FilterList
        param={"status"}
        title={"Availability"}
        lists={availability}
      />
    </Stack>
  );
}

export default Filters;
