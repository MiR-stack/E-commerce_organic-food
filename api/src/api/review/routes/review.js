"use strict";

/**
 * review router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::review.review", {
  config: {
    create: {
      middlewares: ["global::customer"],
    },
    update: {
      middlewares: ["global::customer"],
    },
  },
});
