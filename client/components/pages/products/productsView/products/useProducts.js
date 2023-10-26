import { useEffect, useState } from "react";
import useDynamicUrl from "../../../../../hooks/useDynamicUrl";
import { useGetProductsQuery } from "../../../../../store/apis/products";
import qs from "qs";
import { useMediaQuery } from "@mui/material";

function useProducts(layout) {
  const { setRouter, searchParams } = useDynamicUrl();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const handlePage = (_event, value) => setPage(value);

  useEffect(() => {
    setRouter("page", page);
  }, [page]);

  const paramsKeys = ["s", "category", "min", "max", "status", "sort"];
  const params = paramsKeys.reduce((acc, cur) => {
    acc[cur] = searchParams.get(cur) || "";
    return acc;
  }, {});

  const categories = strToArray(params.category, (value) => ({
    slug: { $eq: value },
  }));
  const status = strToArray(params.status, (value) => ({
    stockStatus: { $eq: value },
  }));

  const mdDownMedia = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const url = qs.stringify(
    {
      populate: ["images"],
      filters: {
        name: {
          $containsi: params.s,
        },
        category: {
          $or: categories,
        },
        $and: [
          {
            salePrice: { $gte: params.min || 0 },
          },
          {
            salePrice: { $lte: params.max || 100 },
          },
          {
            $or: status,
          },
        ],
      },
      fields: [
        "name",
        "slug",
        "avarageRating",
        "salePrice",
        "price",
        "discount",
        "stockQuantity",
        "stockStatus",
      ],
      sort: [`salePrice:${params.sort || "asc"}`],
      pagination: {
        page: page,
        pageSize: mdDownMedia ? 8 : 9,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data, isLoading } = useGetProductsQuery(url);
  const productsData = data?.data.map((item) => {
    return {
      id: item.id,
      ...item.attributes,
    };
  });

  const match = useMediaQuery("(max-width:500px)");
  const smMedia = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const productCardConfig = {
    mediaHeight: smMedia ? 120 : 150,
    mediaWidth: layout === "grid" ? "100%" : match ? "35%" : 200,
    direction: layout === "grid" ? "block" : "flex",
    size: "small",
    favorite: true,
    favoriteLg: layout === "grid" ? false : !smMedia,
    shortTxt: smMedia,
  };

  const GridProps =
    layout === "grid"
      ? {
          md: 4,
          xs: 6,
        }
      : { xs: 12 };

  return {
    handlePage,
    data,
    productCardConfig,
    GridProps,
    isLoading,
    productsData,
    page,
  };
}

export default useProducts;

const strToArray = (str, cb) => {
  return str.split(",").reduce((acc, cur) => {
    if (cur) {
      acc.push(cb(cur));
    }
    return acc;
  }, []);
};
