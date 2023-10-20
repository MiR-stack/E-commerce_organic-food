"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::category.category", () => ({
  async find(ctx) {
    let { data, meta } = await super.find(ctx);

    console.log(data);

    data = data.map((item) => {
      let products = item.attributes.products;
      if (products) {
        item.attributes.totalProduct = products.data.length;
      }
      return item;
    });
    return { data, meta };
  },
}));
