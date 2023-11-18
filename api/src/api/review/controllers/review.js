"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

//TODO: implement create funtionality. only they can review who buy this product
module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body.data;
    const res = await strapi.entityService.create("api::review.review", {
      data: {
        ...data,
        publishedAt: Date.now(),
        profile: {
          connect: [data.customer_id],
        },
        product: {
          connect: [data.product_id],
        },
      },
    });
    return res;
  },
}));
