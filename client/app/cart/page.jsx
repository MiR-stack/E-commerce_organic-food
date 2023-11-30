import { Container } from "@mui/material";
import { getBanner } from "../../utils";
import Banner from "../../components/shared/banner";
import ProductsList from "../../components/pages/cart/productsList";

async function Cart() {
  const {
    name,
    srcs: { large },
    alt,
    breadcrumb,
  } = await getBanner("cart");

  return (
    <Container>
      <span>
        <Banner
          name={name}
          image={{ src: large, alt }}
          breadcrumbs={breadcrumb}
          currentPage={"Cart"}
          opacity={0.4}
        />
        <ProductsList />
      </span>
    </Container>
  );
}

export default Cart;
