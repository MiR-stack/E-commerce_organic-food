"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", () => ({
  async create(ctx) {
    const profileId = ctx.state.user.profileId;

    ctx.request.body.data.profile = { connect: [profileId] };

    const res = await super.create(ctx);

    return res;
  },
}));
