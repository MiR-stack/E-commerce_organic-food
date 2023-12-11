import qs from "qs";

export const getStrapiUrl = (url) => {
  return `${process.env.STRAPI_URL}${url}`;
};

/**
 *
 * @param {String} url
 * @param {[String]} tags
 * @param {Boolean} noCach
 * @returns {Array}
 */
export const getData = async (url, tags, noCach) => {
  const res = await fetch(url, {
    cache: noCach ? "no-store" : "default",
    next: { tags },
  });

  if (!res.ok) {
    throw new Error("unable to fetch");
  }

  return res.json();
};

export const getGlobalData = async () => {
  const query = qs.stringify({
    populate: {
      navbar: {
        populate: "*",
      },
      footer: {
        populate: "*",
      },
      footer_links: {
        populate: "*",
      },
    },
  });
  const url = getStrapiUrl(`/global?${query}`);

  return (await fetch(url, { next: { tags: ["global"] } })).json();
};

export const getBanner = async (page) => {
  const url = getStrapiUrl(`/banners?filters[for][$eq]=${page}&populate=*`);
  const res = await getData(url, ["banner"]);
  let { bgImage, name, breadcrumb } = res.data[0].attributes;
  const { srcs, alt } = getFormatedImage(bgImage);

  return { name, srcs, alt, breadcrumb };
};

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

  const url = getStrapiUrl(`/categories?${qs.stringify(variants[variant])}`);
  return await getData(url, ["category"]);
};

export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${url}`;
}

/**
 *
 * @param {String} prefix  prefix can be singular or plural like product or products
 * @param {String} kind there is many predefined kind feautured,latest and defaults
 * @return {Promise}
 */
export const GetProduct = async (prefix, kind) => {
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

  const url = getStrapiUrl(
    `/${prefix}?${qs.stringify({ ...queries.default, ...queries[kind] })}`
  );

  try {
    const data = await fetch(url, { cache: "no-store" });
    return data.json();
  } catch (e) {
    throw new Error(e);
  }
};

export const getBlogs = async (query, { tags, cache }) => {
  const url = getStrapiUrl(`/blogs?${query}`);

  try {
    return await getData(url, tags, cache);
  } catch (err) {
    throw new Error(err);
  }
};

export const getFormatedImage = (image) => {
  const {
    formats: { large, small, medium, thumbnail },
    url,
    alternativeText,
  } = image.data.attributes;
  const srcs = {
    large: getStrapiMedia(large.url),
    small: getStrapiMedia(small.url),
    medium: getStrapiMedia(medium.url),
    thumbnail: getStrapiMedia(thumbnail.url),
    main: getStrapiMedia(url),
  };

  return { srcs, alt: alternativeText };
};

export const handleQuantity = (items) => {
  return items.reduce((acc, cur) => {
    acc += cur.quantity;
    return acc;
  }, 0);
};

/**
 *
 * @param {Object} data
 * @return {Object}
 */
export const initFormValue = (data) => {
  return Object.keys(data).reduce((acc, cur) => {
    acc[cur] = data[cur].value;

    return acc;
  }, {});
};

/**
 *
 * @param {Object} data
 * @return {Array}
 */

export const objectToFormData = (data) => {
  return Object.keys(data).map((fieldName) => {
    return {
      name: fieldName,
      ...data[fieldName],
    };
  });
};

/**
 *
 * @param {Array} arr
 * @param {Function} cb
 */
export const isExist = (arr, cb) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (cb(arr[i])) {
      return true;
    }
  }
  return false;
};
