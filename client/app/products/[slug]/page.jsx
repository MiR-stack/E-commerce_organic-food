import { Container } from "@mui/material";
import { getData, getStrapiMedia, getStrapiUrl } from "../../../utils";
import ShortView from "../../../components/pages/ProductDetails/quickView";
import qs from "qs";
import variationsAdapter from "../../../adapters/variations";

// TODO: we will work with variations
async function ProductDetails({ params }) {
  //request url for fetch product
  const query = qs.stringify({
    populate: {
      images: { populat: "*" },
      // variations: {
      //   populate: ["image"],
      // },
    },
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  const url = getStrapiUrl(`/products?${query}`);
  const products = await getData(url, ["product"]);
  const {
    id,
    attributes: {
      name,
      images,
      avarageRating,
      stockStatus,
      weight,
      salePrice,
      price,
      shortDescription,
      // variations,
    },
  } = products.data[0];

  // extract varitaions images for image gallary
  // const variationsImage = variations.data.map((variation) => ({
  //   id: variation.id,
  //   image: variation.attributes.image,
  // }));

  // const variationsData = variationsAdapter(variations.data);

  const quickViewData = {
    images: {
      default: { id, images },
      // variations: variationsImage,
    },
    attributes: {
      id,
      thumbnail: getStrapiMedia(
        images.data[0].attributes.formats.thumbnail.url
      ),
      name,
      avarageRating,
      stockStatus,
      weight,
      salePrice,
      price,
      shortDescription,
    },
    // variations: variationsData,
  };

  return (
    <Container maxWidth={"lg"} sx={{ mt: 3 }}>
      <ShortView data={quickViewData} />
    </Container>
  );
}

export default ProductDetails;
