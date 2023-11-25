import React from "react";
import FeaturedProduts from "../sections/featuredProducts";
import Categories from "../sections/categories";
import { getCategories } from "../../../../utils";
import LatestProducts from "../sections/latest Products";
import AboutUs from "../sections/aboutUs";
import Blog from "../sections/blog";
import Testimonials from "../sections/testimonial";

async function SectionManager({ sectionFor }) {
  switch (sectionFor) {
    case "featuredProducts":
      return <FeaturedProduts />;
    case "category":
      const categoriesData = await getCategories("home");
      return <Categories categories={categoriesData} />;
    case "latestProducts":
      return <LatestProducts />;
    case "storeReviews":
      return <Testimonials />;
    case "aboutUs":
      return <AboutUs />;
    case "blogs":
      return <Blog />;
  }
  return <></>;
}

export default SectionManager;
