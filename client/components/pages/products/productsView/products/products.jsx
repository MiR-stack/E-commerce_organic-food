import { Box, Pagination, Stack, Typography } from "@mui/material";
import useProducts from "./useProducts";
import ProductCard from "../../../../shared/productCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Loading from "../../loading";
import { useEffect } from "react";

function Products({ layout }) {
  const {
    handlePage,
    refetch,
    data,
    productCardConfig,
    GridProps,
    isLoading,
    productsData,
    page,
  } = useProducts(layout);

  useEffect(() => {
    refetch();
  }, []);

  console.log(productsData);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {data?.meta.pagination.total} items found
      </Typography>
      {isLoading ? (
        <Loading layout={layout} />
      ) : (
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          {productsData?.map((product) => (
            <Grid2 {...GridProps} key={product.id}>
              <ProductCard data={product} config={productCardConfig} />
            </Grid2>
          ))}
        </Grid2>
      )}
      <Stack alignItems={"center"} sx={{ mt: 4 }}>
        {data?.meta.pagination.pageCount > 1 ? (
          <Pagination
            count={data?.meta.pagination.pageCount}
            page={page}
            siblingCount={1}
            shape="rounded"
            onChange={handlePage}
          />
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}

export default Products;
