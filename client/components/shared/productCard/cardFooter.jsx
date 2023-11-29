"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  CardActions,
  Button,
  Fab,
  Stack,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  addCart,
  removeFavorite,
} from "../../../store/slices/productSlice";
import { useSnackbar } from "notistack";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { openQuickView } from "../../../store/slices/quickViewSlice";
import Subscribe from "./subscribe";

const defaultProps = {
  config: {
    size: "small",
    direction: "row",
    favoriteLg: true,
    favorite: true,
    quickView: false,
    shortTxt: false,
  },
};

function CardFooter({ data, config }) {
  config = { ...defaultProps.config, ...config };
  const { favoriteLg, size, favorite, quickView } = config;

  const { enqueueSnackbar } = useSnackbar();

  if (!data) return;

  if (!data.quantity) data.quantity = 1;

  const dispatch = useDispatch();

  function handleAddCart() {
    dispatch(addCart(data));
    enqueueSnackbar("product added to cart", {
      variant: "success",
    });
  }

  function handleAddFavorite() {
    const favoriteProduct = { ...data, quantity: 1 };
    dispatch(addFavorite(favoriteProduct));
    enqueueSnackbar("product added to favorite", { variant: "success" });
  }

  function handleRemoveFavorite() {
    dispatch(removeFavorite(data.id));
    enqueueSnackbar("product removed from favorite", { variant: "warning" });
  }

  function handleQuickView() {
    dispatch(openQuickView(data));
  }

  const products = useSelector((state) => state.products.favorites);

  const [exist, setExist] = useState(false);

  useEffect(() => {
    const isExist = products.find((product) => product.id === data.id);
    setExist(Boolean(isExist));
  }, [products]);
  const handleFavorite = (e) => {
    exist ? handleRemoveFavorite() : handleAddFavorite();
    setExist(e.target.checked);
  };

  return (
    <CardActions sx={{ py: 1, px: 0 }}>
      <Stack direction="row" alignItems={"center"}>
        {config.subscribe ? (
          <Subscribe />
        ) : (
          <Stack
            direction={"row"}
            sx={{
              border: "1px solid #016a70",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            {favorite && favoriteLg && (
              <Button
                onClick={handleAddFavorite}
                sx={{ border: "none" }}
                size={size}
              >
                add favorite
              </Button>
            )}
            {quickView && (
              <Button sx={{ border: "none" }} onClick={handleQuickView}>
                quick view
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleAddCart}
              sx={{ borderRadius: "0" }}
              size={size}
            >
              {config.shortTxt ? "" : "add to"} cart
            </Button>
          </Stack>
        )}
        {favorite && !favoriteLg && (
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={exist}
            onChange={handleFavorite}
          />
        )}
      </Stack>
    </CardActions>
  );
}

export default CardFooter;
