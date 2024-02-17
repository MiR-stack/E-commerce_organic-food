/*=============================================
=            getProduct function            =
=============================================*/

import { getData, getQuery } from "./utils";

/**
 *
 * @param {String} prefix  prefix can be singular or plural like product or products
 * @param {String} kind there is many predefined kind feautured,latest and defaults
 * @return {Promise}
 */
export const getProduct = async (prefix, kind, customQuery) => {
  const queries = {
    default: {
      populate: ["images"],
      fields: [
        "name",
        "avarageRating",
        "ratingCount",
        "slug",
        "price",
        "salePrice",
        "discount",
      ],
    },
    featured: {
      filters: {
        featured: {
          $eq: true,
        },
      },
      fields: [
        "name",
        "avarageRating",
        "ratingCount",
        "shortDescription",
        "slug",
        "price",
        "salePrice",
        "discount",
      ],
      pagination: {
        limit: 6,
      },
    },
    latest: {
      sort: ["createdAt:desc"],
      pagination: {
        limit: 9,
      },
    },
  };

  const defaultQuery = getQuery(queries.default, queries[kind], {
    object: true,
  });
  const query = getQuery(defaultQuery, customQuery);

  return getData(`/${prefix}?${query}`, { cache: "no-store" });
};

/*=====  End of getProduct function  ======*/
