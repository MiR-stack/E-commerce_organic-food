module.exports = ({ strapi }) => {
  return {
    async find(ctx) {
      try {
        console.log(ctx.request.query);

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

          // users = users.map((user) => {
          //   delete user.password;
          //   delete user.resetPasswordToken;
          //   delete user.confirmationToken;
          //   return user;
          // });

          return users;
        }
      } catch (err) {
        console.log("this is error", err);
        return err;
      }
    },
  };
};
