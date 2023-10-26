import { Box, Divider } from "@mui/material";
import { getCategories } from "../../../utils";
import Filter from "./filters";
import ProductsView from "./productsView";

async function Main() {
  const categories = await getCategories("short");
  return (
    <Box sx={{ display: "flex", gap: { xs: 0, lg: 4 }, my: { xs: 2, sm: 5 } }}>
      <span>
        <Filter categories={categories.data} />
      </span>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", lg: "block" } }}
      />
      <ProductsView categories={categories.data} />
    </Box>
  );
}

export default Main;
