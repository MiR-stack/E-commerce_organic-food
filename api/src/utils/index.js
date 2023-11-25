const skuGenarator = (color, size, price) => {
  if (!color || !size || !price) return "";
  return `${color.slice(0, 2)}${price}${size.slice(0, 2)}`.toUpperCase();
};

/**
 *
 * @param {Array} data
 * @returns {Promise}  array of newly added customers
 */
const addCustomers = async (data) => {
  // get customers ids
  const customerIds = data.reduce((acc, cur) => {
    acc[acc.length] = cur.attributes.customer_id;
    return acc;
  }, []);

  // get customers
  const customers = await strapi.entityService.findMany(
    "plugin::users-permissions.user",
    {
      populate: ["avatar"],
      fields: ["firstName", "lastName"],
      filters: {
        id: {
          $in: customerIds,
        },
      },
    }
  );

  // add customers in data
  const len = customers.length;
  const newData = data.map((item) => {
    const { customer_id } = item.attributes;
    for (let i = 0; i < len; i++) {
      if (customer_id == customers[i].id) {
        item.attributes.customer = customers[i];
        break;
      }
    }
    return item;
  });

  return newData;
};

module.exports = { skuGenarator, addCustomers };
