module.exports = {
  beforeCreate(event) {
    beforeActions(event);
  },
  beforeUpdate(event) {
    beforeActions(event);
  },
};

const beforeActions = (event) => {
  const { title, slug } = event.params.data;

  const newSlug = title?.trim().toLowerCase().split(" ").join("_");
  event.params.data.slug = slug || newSlug;
  event.params.data.permalink = `${process.env.CLIENT_URL}/products/${
    slug || newSlug
  }`;
};
