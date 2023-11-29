import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ImageGallery from "./ImageGallery";
import Content from "./content";

function ShortView({ data, variant }) {
  const { images, attributes, variations } = data;
  return (
    <Grid2 container spacing={3}>
      <Grid2 md={6} sx={{ height: variant !== "quickView" ? 480 : "unset" }}>
        <ImageGallery images={images} variant={variant} />
      </Grid2>
      <Grid2 md={6}>
        <Content {...attributes} variant={variant} />
      </Grid2>
    </Grid2>
  );
}

export default ShortView;
