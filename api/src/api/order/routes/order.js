"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::order.order", {
  config: {
    create: {
      middlewares: ["global::customer"],
    },
    update: {
      middlewares: ["global::customer"],
    },
  },
});
