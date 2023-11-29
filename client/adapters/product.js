const adapter = (product) => {
  const {
    name,
    slug,
    price,
    salePrice,
    discount,
    stockStatus,
    weight,
    ratingCount,
    avarageRating,
    images,
  } = product.attributes;

  return {
    id: product.id,
    name,
    slug,
    price,
    salePrice,
    discount,
    stockStatus,
    weight,
    ratingCount,
    avarageRating,
    images,
  };
};

const productAdapter = (products) => {
  return products.map((product) => adapter(product));
};

export default productAdapter;
