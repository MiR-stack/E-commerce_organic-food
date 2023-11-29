const styles = {
  width: { md: 800, xs: "90%" },
  //   height: { md: 420, xs: "unset" },
  borderRadius: "10px",
  p: { xs: 2, md: 4 },
  maxHeight: "90%",
};

function useQuickView(data) {
  const {
    images,
    id,
    name,
    thumbnail,
    avarageRating,
    stockStatus,
    weight,
    salePrice,
    price,
  } = data;

  const quickViewData = {
    images: {
      default: { id, images },
    },
    attributes: {
      id,
      thumbnail,
      name,
      avarageRating,
      stockStatus,
      weight,
      salePrice,
      price,
    },
  };

  return { quickViewData, styles };
}

export default useQuickView;
