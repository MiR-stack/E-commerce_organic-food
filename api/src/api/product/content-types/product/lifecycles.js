const { skuGenarator } = require("../../../../utils");

module.exports = {
  beforeCreate(event) {
    beforeActions(event, "create");
  },
  beforeUpdate(event) {
    beforeActions(event, "update");
  },
};

const beforeActions = async (event, action) => {
  let {
    data: { name, slug, price, salePrice, discount },
  } = event.params;

  if (!name) return;

  // set slug and permalink
  if (!slug) {
    slug = name.toLowerCase().split(" ").join("-");
    event.params.data.slug = slug;
  }
  event.params.data.permalink = `${process.env.CLIENT_URL}/products/${slug}`;

  // set discount
  if (discount) {
    salePrice = price - (price * discount) / 100;
  } else if (!salePrice || salePrice > price || salePrice < 0) {
    salePrice = price;
  }
  event.params.data.salePrice = salePrice;
  event.params.data.discount = 100 - (salePrice / price) * 100;

  const ctx = strapi.requestContext.get();

  const { color, size } = ctx.request.body.attributes;

  event.params.data.sku = skuGenarator(color, size, 20);
};

// async function AfterActions({ result: { prices } }) {
//   if (!prices) return;
//   let { price, salePrice, discount } = prices;
//   if (discount) {
//     salePrice = price - (price * discount) / 100;
//   } else if (!salePrice || salePrice > price || salePrice < 0) {
//     salePrice = price;
//   }

//   discount = 100 - (salePrice / price) * 100;

//   await strapi.entityService.update("product.price", prices.id, {
//     data: { price, salePrice, discount },
//   });
// }
