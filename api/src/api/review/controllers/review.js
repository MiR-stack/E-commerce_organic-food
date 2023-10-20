"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review");

//TODO: implement create funtionality. only they can review who buy this product
