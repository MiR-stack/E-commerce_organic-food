"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async afterCreate({ result }) {
        await strapi.query("api::profile.profile").create({
          data: {
            name: `${result.firstName} ${result.lastName}`,
            customer_id: result.id,
            publishedAt: Date.now(),
          },
        });
      },
    });

    await strapi
      .service("plugin::users-permissions.providers-registry")
      .register(`google`, ({ purest }) => async ({ query }) => {
        const google = purest({ provider: "google" });

        const res = await google
          .get("https://www.googleapis.com/oauth2/v3/userinfo")
          .auth(query.access_token)
          .request();

        const { body } = res;

        return {
          email: body.email,
          firstName: body.given_name,
          lastName: body.family_name,
          provider: "google",
          username: body.email.split("@")[0],
        };
      });
  },
};
