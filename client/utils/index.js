import qs from "qs";
import { getProduct } from "./product";
import {
  getStrapiURL,
  getCategories,
  getQuery,
  getValues,
  mixArray,
} from "./utils";

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
  const url = getStrapiURL(`/global?${query}`);

  return (await fetch(url, { next: { tags: ["global"] } })).json();
};

export const getBanner = async (page) => {
  const url = getStrapiURL(`/banners?filters[for][$eq]=${page}&populate=*`);
  const res = await getData(url, ["banner"]);
  let { bgImage, name, breadcrumb } = res.data[0].attributes;
  const { srcs, alt } = getFormatedImage(bgImage);

  return { name, srcs, alt, breadcrumb };
};

export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}${url}`;
}

/**
 *
 * @param {string} query
 * @param {{tags:Array,cache:('no-store'|'no-cache')}} options
 * @returns
 */
export const getBlogs = async (query, { tags, cache, token }) => {
  const url = getStrapiURL(`/blogs?${query}`);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token || process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
    cache: cache ? "default" : "no-store",
    next: {
      tags: tags,
    },
  });

  return await res.json();
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

/**
 *
 * @param {string} content
 * @returns {number} reading time
 */
export const readingTimeCounter = (content) => {
  const wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
  const readingTime = Math.floor(wordCount / 228) + 1;

  return readingTime;
};

/**
 *
 * fetch for data from same category like related blogs or related products
 * @param {[Object]} items
 * @param {string} slug
 * @param {Object} query
 * @param {string} category
 * @param {string} prefix
 * @param {number} itemLimit
 * @returns {[Object]}
 */

export const getRelatedItems = async (
  items,
  slug,
  query,
  category,
  prefix,
  itemLimit
) => {
  if (items.length > itemLimit) items;

  // get all slugs
  // slugs will be used in query for avoid blog duplication
  const slugs = items.reduce(
    (acc, cur) => {
      acc.push(cur.attributes.slug);
      return acc;
    },
    [slug]
  );

  // creating query
  const itemsQuery = qs.stringify({
    populate: ["category"],
    filters: {
      category: {
        slug: {
          $eq: category,
        },
      },
      slug: {
        $ne: slugs,
      },
    },
    pagination: {
      limit: itemLimit - items.length,
    },
    ...query,
  });

  // get full url
  const url = getStrapiURL(`/${prefix}?${itemsQuery}`);

  // fetch data
  const data = await getData(url, [prefix, slug]);

  items = [...items, ...data.data];

  return items;
};

export {
  getProduct,
  getStrapiURL as getStrapiUrl,
  getCategories,
  getQuery,
  getValues,
  mixArray,
};
