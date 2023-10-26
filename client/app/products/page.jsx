import { Container } from "@mui/material";
import Main from "../../components/pages/products/main";
import Banner from "../../components/pages/products/banner";
import BannerContent from "./bannerContent";

async function Products() {
  return (
    <Container>
      <span>
        <Banner>
          <BannerContent />
        </Banner>
        <Main />
      </span>
    </Container>
  );
}

export default Products;
