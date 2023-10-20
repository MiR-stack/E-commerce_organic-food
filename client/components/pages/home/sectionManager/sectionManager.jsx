import React from "react";
import FeaturedProduts from "../sections/featuredProducts";
import Categories from "../sections/categories";
import { getCategories, getData, getStrapiUrl } from "../../../../utils";
import LatestProducts from "../sections/latest Products";
import Testimonials from "../sections/testimonial";
import AboutUs from "../sections/aboutUs";
import Blog from "../sections/blog";
import qs from "qs";

const testimonialsQuery = qs.stringify({
  populate: {
    profile: {
      fields: ["firstName", "lastName"],
      populate: {
        avatar: {
          fields: ["alternativeText", "formats"],
        },
      },
    },
  },
});

async function SectionManager({ sectionFor }) {
  const categoriesData = await getCategories("home");

  // fetching testimonials data
  const url = getStrapiUrl(`/store-reviews?${testimonialsQuery}`);
  const testimonials = await getData(url, ["testimonials"]);

  switch (sectionFor) {
    case "featuredProducts":
      return <FeaturedProduts />;
    case "category":
      return <Categories categories={categoriesData} />;
    case "latestProducts":
      return <LatestProducts />;
    case "storeReviews":
      return <Testimonials testimonials={testimonials} />;
    case "aboutUs":
      return <AboutUs />;
    case "blogs":
      return <Blog />;
  }
  return <></>;
}

export default SectionManager;
