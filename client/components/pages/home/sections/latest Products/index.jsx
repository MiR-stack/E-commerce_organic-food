import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GetProduct } from "../../../../../utils/index";
import ProductCard from "../../../../shared/productCard";

async function LatestProduts() {
  const products = await GetProduct("products", "latest");

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.data.map((product) => {
        let data = product.attributes;
        data.id = product.id;
        return (
          <Grid lg={4} hm={6} xs={12} key={data.id}>
            <span>
              <ProductCard
                data={data}
                yarn
                config={{
                  favorite: true,
                  favoriteLg: false,
                  size: "small",
                  direction: "flex",
                  mediaHeight: "120",
                  mediaWidth: "35%",
                }}
              />
            </span>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LatestProduts;
