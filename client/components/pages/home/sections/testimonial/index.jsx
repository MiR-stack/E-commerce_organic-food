import {
  getData,
  getStrapiUrl,
  getValues,
  mixArray,
} from "../../../../../utils";
import TestimonialsSlider from "./slider";
import { getCustomers } from "../../../../../utils/customer";

async function StoreReviews() {
  // fetching testimonials data
  const url = getStrapiUrl(`/store-reviews`);
  const { data } = await getData(url, ["testimonials"]);

  // find all customers
  const customer_ids = getValues(data, (value) =>
    Number(value.attributes.customer_id)
  );
  const customers = await getCustomers({ ids: customer_ids });

  const testimonials = mixArray(data, customers, (value1, value2) => {
    return {
      isOk: value1.attributes?.customer_id == value2.id,
      values: {
        id: value1.id,
        ...value1.attributes,
        customer: value2,
      },
    };
  });

  return <TestimonialsSlider testimonials={testimonials} />;
}

export default StoreReviews;
