import { Box, Container } from "@mui/material";
import { getBanner } from "../../utils";
import Banner from "../../components/shared/banner";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BlogsContainer from "../../components/pages/blogs";
import SearchBar from "../../components/shared/searchBar";
import { searchbarStyles } from "../products/bannerContent";

async function Cart() {
  const {
    name,
    srcs: { large },
    alt,
    breadcrumb,
  } = await getBanner("blogs");

  return (
    <Container>
      <span>
        <Banner
          name={name}
          image={{ src: large, alt }}
          breadcrumbs={breadcrumb}
          currentPage={"blogs"}
          opacity={0.4}
        >
          <SearchBar open prefix="blogs" styles={searchbarStyles} />
        </Banner>
        <BlogsContainer />
      </span>
    </Container>
  );
}

export default Cart;
