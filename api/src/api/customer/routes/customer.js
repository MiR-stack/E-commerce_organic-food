module.exports = {
  routes: [
    {
      method: "GET",
      path: "/customers",
      handler: "customer.find",
    },
  ],
};
