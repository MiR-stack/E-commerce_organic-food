module.exports = ({ strapi }) => {
  return {
    async find(ctx) {
      try {
        const { id } = ctx.request.query;
        if (id) {
          const user = await strapi.plugins[
            "users-permissions"
          ].services.user.fetch(id);

          delete user.password;
          delete user.resetPasswordToken;
          delete user.confirmationToken;
          return user;
        } else {
          const users = await strapi.plugins[
            "users-permissions"
          ].services.user.fetchAll();

          return users;
        }
      } catch (err) {
        return err;
      }
    },
  };
};
