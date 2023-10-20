module.exports = {
  afterCreate({ result }) {
    actions(result, "create");
  },
  afterDelete({ result }) {
    actions(result);
  },
  afterUpdate({ result }) {
    actions(result, "update");
  },
};

const actions = async (result, kind) => {
  const id = result.product_id;

  const product = await strapi.entityService.findOne(
    "api::product.product",
    id,
    {
      fields: ["ratingCount"],
      populate: { reviews: true },
    }
  );

  let ratingCount = product.ratingCount;

  if (kind !== "update") {
    kind === "create" ? ratingCount++ : ratingCount--;
  }

  let avarageRating;
  if (ratingCount < 1) {
    avarageRating = 0;
  } else {
    avarageRating =
      product.reviews.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0) / ratingCount;
  }

  strapi.entityService.update("api::product.product", id, {
    data: {
      ratingCount,
      avarageRating,
    },
  });
};
