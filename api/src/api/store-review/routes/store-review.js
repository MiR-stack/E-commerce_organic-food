"use strict";

/**
 * store-review router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::store-review.store-review", {
  config: {
    create: {
      middlewares: ["global::customer"],
    },
    update: {
      middlewares: ["global::customer"],
    },
  },
});
