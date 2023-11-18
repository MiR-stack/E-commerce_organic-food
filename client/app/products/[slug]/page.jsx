import { Container } from "@mui/material";
import { getData, getStrapiMedia, getStrapiUrl } from "../../../utils";
import ShortView from "../../../components/pages/ProductDetails/quickView";
import qs from "qs";
import variationsAdapter from "../../../adapters/variations";
import Details from "../../../components/pages/ProductDetails/details";
import CustomBreadcrumbs from "../../../components/shared/Breadcrumbs";
import RelatedProucts from "../../../components/pages/ProductDetails/relatedProducts";

// TODO: we will work with variations
async function ProductDetails({ params }) {
  //request url for fetch product
  const productQuery = qs.stringify({
    populate: {
      images: {
        populate: "*",
        fields: ["formats"],
      },
      variations: {
        populate: ["images"],
      },

      tags: {
        populate: "*",
      },
      related_products: {
        populate: ["images"],
        fields: [
          "name",
          "slug",
          "price",
          "discount",
          "salePrice",
          "ratingCount",
          "avarageRating",
        ],
      },
      category: true,
    },
    // [
    //   "images",
    //   "variations.images",
    //   "reviews.profile",
    //   "tags",
    //   "relatedProducts",
    // ]
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  const url = getStrapiUrl(`/products?${productQuery}`);
  const products = await getData(url, [params.slug]);
  const {
    id,
    attributes: {
      name,
      slug,
      images,
      avarageRating,
      stockStatus,
      weight,
      salePrice,
      price,
      shortDescription,
      description,
      tags,
      related_products,
      category,
      // variations,
    },
  } = products.data[0];

  // extract varitaions images for image gallary
  // const variationsImage = variations.data.map((variation) => ({
  //   id: variation.id,
  //   image: variation.attributes.image,
  // }));

  // const variationsData = variationsAdapter(variations.data);

  // console.log("product details", products.data[0].attributes);

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

  const breadcrumbs = [
    {
      name: "home",
      href: "/",
    },
    {
      name: "shop",
      href: "/products",
    },
  ];

  return (
    <Container maxWidth={"lg"} sx={{ mt: 3 }}>
      <CustomBreadcrumbs
        links={breadcrumbs}
        currentPage={"product details"}
        styles={{ color: "text.primary", pb: 2 }}
      />
      <ShortView data={quickViewData} />
      <Details id={id} details={description} />
      <span>
        <RelatedProucts
          relatedProducts={related_products.data}
          slug={slug}
          category={category.data.attributes.slug}
        />
      </span>
    </Container>
  );
}

export default ProductDetails;
