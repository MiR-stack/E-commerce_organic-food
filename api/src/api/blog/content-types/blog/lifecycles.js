module.exports = {
  beforeCreate(event) {
    beforeActions(event);
  },
  beforeUpdate(event) {
    beforeActions(event);
  },
};

const beforeActions = (event) => {
  let { title, slug } = event.params.data;

  title = title.replace(/[^a-zA-Z0-9 ]/g, "");
  slug = slug?.replace(/[^a-zA-Z0-9 ]/g, "-");

  const newSlug = title?.trim().toLowerCase().split(" ").join("-");
  event.params.data.slug = slug || newSlug;
  event.params.data.permalink = `${process.env.CLIENT_URL}/blogs/${
    slug || newSlug
  }`;
};
