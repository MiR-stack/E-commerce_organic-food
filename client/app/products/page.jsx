import { Container } from "@mui/material";
import Main from "../../components/pages/products/main";
import Banner from "../../components/shared/banner";
import BannerContent from "./bannerContent";
import { getBanner } from "../../utils";

async function Products() {
  const {
    srcs: { large },
    alt,
    breadcrumb,
  } = await getBanner("products");

  return (
    <Container>
      <span>
        <Banner
          image={{ src: large, alt }}
          currentPage={"products"}
          breadcrumbs={breadcrumb}
        >
          <BannerContent />
        </Banner>
        <Main />
      </span>
    </Container>
  );
}

export default Products;
