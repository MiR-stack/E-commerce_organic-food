module.exports = {
  async afterCreate({ result: { id, customer_id } }) {
    id = String(id);
    try {
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        customer_id,
        {
          data: {
            profileId: id,
            profile: {
              connect: [id],
            },
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },
};
