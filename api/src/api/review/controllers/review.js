"use strict";

const { addCustomers } = require("../../../utils");

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

//TODO: implement create funtionality. only they can review who buy this product
module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body.data;
    const profileId = ctx.state.user?.profileId;

    const res = await strapi.entityService.create("api::review.review", {
      data: {
        ...data,
        publishedAt: Date.now(),
        profile: {
          connect: [profileId],
        },
        product: {
          connect: [data.product_id],
        },
      },
    });
    return res;
  },

  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const reviews = await addCustomers(data);

    return { data: reviews, meta };
  },
}));
