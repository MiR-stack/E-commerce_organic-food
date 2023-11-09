const adapter = (variation) => {
  const {
    shortDescription,
    description,
    permalink,
    price,
    salePric,
    discount,
    stockQuantity,
    variationName,
  } = variation.attributes;
  return {
    id: variation.id,
    shortDescription,
    description,
    permalink,
    price,
    salePric,
    discount,
    stockQuantity,
    variationName,
  };
};

const variationsAdapter = (variations) => {
  return variations.map((variation) => adapter(variation));
};
export default variationsAdapter;
