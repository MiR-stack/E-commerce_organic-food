import qs from "qs";
import { getStrapiUrl } from "./index";
import { getData, getQuery, getValues } from "./utils";
import { MASTER_TAG } from "../constants";

export const getCustomer = async (id, query) => {
  const url = getStrapiUrl(`/users/${id}?${query}`);
  try {
    const data = await fetch(url, { cache: "no-store" });
    return await data.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const customerQuery = qs.stringify({
  populate: {
    avatar: {
      fields: ["alternativeText", "formats"],
    },
  },
  fields: ["firstName", "lastName"],
});

/*=============================================
=            getCustomers function            =
=============================================*/

/**
 * @typedef {object} testimonials
 * @property {object} data
 * @property {object} customeQuery
 */

/**
 *
 * @param {testimonials} props array of testimonials
 * @returns {Array} testimonials with customer feild
 */
export async function getCustomers({ ids, customeQuery }) {
  const defaultQuery = {
    populate: {
      avatar: {
        fields: ["alternativeText", "formats"],
      },
    },
    fields: ["firstName", "lastName"],
    filters: {
      id: {
        $in: ids,
      },
    },
  };

  const query = getQuery(defaultQuery, customeQuery);

  return await getData(`/users?${query}`, {
    authorization: process.env.NEXT_PUBLIC_APP_TOKEN,
    tags: [MASTER_TAG, "customers"],
  });
}

/*=====  End of getCustomers function  ======*/
