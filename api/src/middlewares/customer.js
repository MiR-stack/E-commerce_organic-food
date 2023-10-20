module.exports = () => {
  return async (ctx, next) => {
    const id = ctx.state.user.id;

    ctx.request.body.data.customer_id = String(id);
    ctx.request.body.data.customer = id;

    await next();
  };
};
