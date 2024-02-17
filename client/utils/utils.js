import qs from "qs";
import { MASTER_TAG } from "../constants";

/*=============================================
=            get strapi url function            =
=============================================*/

export const getStrapiURL = (url) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

/*=====  End of get strapi url function  ======*/

/*=============================================
=            get data fuction            =
=============================================*/

/**
 * @typedef {object}  options
 * @property {'no-store' | 'no-cache'} cache
 * @property {string} authorization
 * @property {string[]} tags
 * @property {number} revalidate
 */

/**
 *
 * @param {options} url
 * @param {object} options
 * @returns
 */

export const getData = async (url, options) => {
  if (!options.authorization) {
    options.authorization = process.env.NEXT_PUBLIC_API_TOKEN;
  }

  url = getStrapiURL(url);

  let fetchOptions = {
    next: {
      revalidate: options.revalidate,
    },
  };

  if (options.authorization) {
    fetchOptions.headers = {
      Authorization: `Bearer ${options.authorization}`,
    };
  }

  if (options.cache) fetchOptions.cache = options.cache;

  if (options.tags)
    fetchOptions.next = {
      tags: options.tags,
    };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error("something went wrong", res.error?.name);
  }

  return res.json();
};

/*=====  End of get Data function  ======*/

/*=============================================
  =            getQuery function            =
  =============================================*/

/**
 *
 * @param defaultQuery base query
 * @param customQuery customize query
 * @returns query
 */

export const getQuery = (
  defaultQuery,
  customQuery,
  options = { removeDefault: false }
) => {
  const { object, removeDefault } = options;

  const {
    populate: defaultPopulate,
    fields: defaultFields,
    filters: defaultFilters,
    sort: defaultSort,
    pagination: defaultPagination,
  } = defaultQuery;

  if (!customQuery) {
    if (object) {
      return defaultQuery;
    } else {
      return qs.stringify(defaultQuery);
    }
  }

  if (removeDefault) {
    if (object) {
      return customQuery;
    } else {
      return qs.stringify(customQuery, { encodeValuesOnly: true });
    }
  }

  const {
    populate: customPopulate,
    fields: customFields,
    filters: customFilters,
    sort: customSort,
    pagination: customPagination,
  } = customQuery;

  let query = {};

  // * set fields

  if (defaultFields && customFields) {
    query.fields = [...defaultFields, ...customFields];
  } else {
    query.fields = defaultFields || customFields;
  }

  // * set  filters

  if (defaultFilters && customFilters) {
    query.filters = { ...defaultFilters, ...customFilters };
  } else {
    query.filters = defaultFilters || customFilters;
  }

  // * set  Sort

  if (defaultSort && customSort) {
    query.sort = [...defaultSort, ...customSort];
  } else {
    query.sort = defaultSort || customSort;
  }

  // * set  Pagination

  if (defaultPagination && customPagination) {
    query.pagination = { ...defaultPagination, ...customPagination };
  } else {
    query.pagination = defaultPagination || customPagination;
  }

  // * set populate

  if (defaultPopulate && customPopulate) {
    if (
      typeof defaultPopulate !== "string" &&
      Array.isArray(defaultPopulate) !== Array.isArray(customPopulate)
    ) {
      return console.error(
        "default populate and custom populate didn't matched. default populate is:",
        Array.isArray(defaultPopulate) ? "array" : "object"
      );
    }

    if (Array.isArray(defaultPopulate) && Array.isArray(customPopulate)) {
      query.populate = [...defaultPopulate, ...customPopulate];
    } else if (
      typeof defaultPopulate === "object" &&
      typeof customPopulate === "object"
    ) {
      query.populate = { ...defaultPopulate, ...customPopulate };
    }
  } else if (typeof defaultPopulate === "string" && customPopulate) {
    // TODO: this block is not working

    query.populate = customPopulate;
  } else {
    query.populate = defaultPopulate || customPopulate;
  }

  if (object) {
    return query;
  } else {
    return qs.stringify(query, { encodeValuesOnly: true });
  }
};

/*=====  End of getQuery function  ======*/

/*=============================================
=            get categories            =
=============================================*/

export const getCategories = async (variant) => {
  const variants = {
    short: {
      fields: ["name", "slug"],
    },
    home: {
      fields: ["name", "slug", "totalProduct"],
      populate: ["products", "image"],
    },
  };

  const query = getQuery(variants[variant]);
  return await getData(`/categories?${query}`, {
    tags: [MASTER_TAG, "category"],
  });
};

/*=====  End of get categories  ======*/

/*=============================================
=            getProperty function            =
=============================================*/

/**
 *
 * @param {Array} arr
 * @param {Function} cb
 */
export const getValues = (arr, cb) => {
  let values = [];

  const len = arr.length;
  for (let i = 0; i < len; i++) {
    values[values.length] = cb(arr[i]);
  }

  return values;
};

/*=====  End of getProperty function  ======*/

/*=============================================
=            mixArray function            =
=============================================*/

/**
 * @description it will help add one array of object to another array of object
 * @param {Array} defaultArr
 * @param {Array} addArr
 * @param {Function} cb
 */
export const mixArray = (defaultArr, addArr, cb) => {
  if (!Array.isArray(defaultArr) || !Array.isArray(addArr)) return;

  const defaultArrLen = defaultArr.length;
  const addArrLen = addArr.length;
  for (let i = 0; i < defaultArrLen; i++) {
    for (let j = 0; j < addArrLen; j++) {
      const { isOk, values } = cb(defaultArr[i], addArr[j]);

      if (isOk) {
        defaultArr[i] = values ? values : { ...defaultArr[i], ...addArr[j] };
        continue;
      }
    }
  }

  return defaultArr;
};

/*=====  End of mixArray function  ======*/
