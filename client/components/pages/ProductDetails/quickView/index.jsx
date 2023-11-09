"use client";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ImageGallery from "../ImageGallery";
import Content from "./content";

function QuickView({ data }) {
  const { images, attributes, variations } = data;
  return (
    <Grid2 container spacing={3}>
      <Grid2 md={6} sx={{ height: "480px" }}>
        <ImageGallery images={images} />
      </Grid2>
      <Grid2 md={6}>
        <Content {...attributes} />
      </Grid2>
    </Grid2>
  );
}

export default QuickView;
