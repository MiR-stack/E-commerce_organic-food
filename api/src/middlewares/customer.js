module.exports = () => {
  return async (ctx, next) => {
    const customer_id = ctx.state.user?.id;

    if (customer_id) ctx.request.body.data.customer_id = String(customer_id);
    await next();
  };
};
