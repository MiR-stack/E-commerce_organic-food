import { Box, Typography } from "@mui/material";
import { getData, getStrapiUrl } from "../../../../utils";
import qs from "qs";
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

async function RelatedProducts({ relatedProducts, category, slug }) {
  const slugs = relatedProducts.reduce(
    (acc, cur) => {
      acc.push(cur.attributes.slug);
      return acc;
    },
    [slug]
  );

  if (relatedProducts.length < 3) {
    const relatedProductsQuery = qs.stringify({
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
      filters: {
        category: {
          slug: {
            $eq: category,
          },
        },
        slug: {
          $ne: slugs,
        },
      },
      pagination: {
        limit: 3 - relatedProducts.length,
      },
    });
    const url = getStrapiUrl(`/products?${relatedProductsQuery}`);
    const data = await getData(url, ["relatedProducts", slug]);
    relatedProducts = [...relatedProducts, ...data.data];
  }

  const products = productAdapter(relatedProducts);
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
