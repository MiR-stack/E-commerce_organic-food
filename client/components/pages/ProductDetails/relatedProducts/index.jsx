import { Box, Typography } from "@mui/material";
import { getRelatedItems } from "../../../../utils";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import productAdapter from "../../../../adapters/product";
import ProductCard from "../../../shared/productCard";

const productCardConfig = {
  mediaHeight: 150,
  mediaWidth: "100%",
  direction: "block",
  size: "small",
  quickView: true,
  favorite: false,
};

const query = {
  populate: ["images", "category"],
  fields: [
    "name",
    "slug",
    "price",
    "stockStatus",
    "weight",
    "discount",
    "salePrice",
    "ratingCount",
    "avarageRating",
  ],
};

async function RelatedProducts({ relatedProducts, category, slug }) {
  const Products = await getRelatedItems(
    relatedProducts,
    slug,
    query,
    category,
    "products",
    3
  );

  const products = productAdapter(Products);
  return products.length > 0 ? (
    <Box>
      <Typography variant="h4">Related Products</Typography>
      <Grid container spacing={4} sx={{ py: 2 }}>
        {products.map((product) => (
          <Grid key={product.id} md={3} sm={6} xs={12}>
            <ProductCard data={product} config={productCardConfig} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    ""
  );
}

export default RelatedProducts;
