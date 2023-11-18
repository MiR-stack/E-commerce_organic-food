module.exports = () => {
  return async (ctx, next) => {
    const profileId = ctx.state.user?.profileId;

    if (profileId) ctx.request.body.data.customer_id = String(profileId);
    await next();
  };
};
