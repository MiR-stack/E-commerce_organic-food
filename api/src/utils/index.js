const skuGenarator = (color, size, price) => {
  if (!color || !size || !price) return "";
  return `${color.slice(0, 2)}${price}${size.slice(0, 2)}`.toUpperCase();
};

const customer = (ctx) => {};

module.exports = { skuGenarator };
