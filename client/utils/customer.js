import qs from "qs";
import { getStrapiUrl } from "./index";

export const getCustomer = async (id, query) => {
  const url = getStrapiUrl(`/users/${id}?${query}`);
  try {
    const data = await fetch(url, { cache: "no-store" });
    return await data.json();
  } catch (err) {
    throw new Error(err);
  }
};

const customerQuery = qs.stringify({
  populate: {
    avatar: {
      fields: ["alternativeText", "formats"],
    },
  },
  fields: ["firstName", "lastName"],
});

/**
 *
 * @param {Array} data array of testimonials
 * @returns {Array} testimonials with customer feild
 */
export async function addCustomer(data) {
  const customers = [];

  for (let i = 0; i < data.length; i++) {
    const customer = await getCustomer(
      data[i].attributes.customer_id,
      customerQuery
    );
    customers[customers.length] = {
      id: data[i].id,
      ...data[i].attributes,
      customer,
    };
  }
  return customers;
}
