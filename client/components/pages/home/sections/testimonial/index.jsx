import { getData, getStrapiUrl } from "../../../../../utils";
import TestimonialsSlider from "./slider";
import { addCustomer } from "../../../../../utils/customer";

async function StoreReviews() {
  // fetching testimonials data
  const url = getStrapiUrl(`/store-reviews`);
  const { data } = await getData(url, ["testimonials"]);

  // testimonials with customer
  const testimonials = await addCustomer(data);

  return <TestimonialsSlider testimonials={testimonials} />;
}

export default StoreReviews;
