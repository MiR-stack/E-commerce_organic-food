module.exports = {
  afterCreate: async ({ result }) => {
    const entity = await findProductIds(result);

    setData(entity, (product) => {
      return {
        stockQuantity: product.stockQuantity - 1,
        stockStatus: product.stockQuantity - 1 < 1 ? "stock out" : "available",
      };
    });
  },

  afterUpdate: async ({ result }) => {
    const status = result.status;

    if (
      status !== "pending" ||
      status !== "processing" ||
      status !== "on-hold"
    ) {
      const entity = await findProductIds(result);

      if (status === "complete") {
        setData(entity, (product) => {
          return {
            totalSales: product.totalSales + 1,
          };
        });
      } else if (status === "refunded") {
        setData(entity, (product) => {
          return {
            totalSales: product.totalSales - 1,
            stockQuantity: product.stockQuantity + 1,
          };
        });
      } else {
        setData(entity, (product) => {
          return {
            stockQuantity: product.stockQuantity + 1,
          };
        });
      }
    }
  },
};

const findProductIds = (result) => {
  const id = result.id;

  return strapi.entityService.findOne("api::order.order", id, {
    populate: {
      products: true,
    },
  });
};

const setData = (entity, cb) => {
  entity.products.forEach((product) => {
    strapi.entityService.update("api::product.product", product.id, {
      data: cb(product),
    });
  });
};
