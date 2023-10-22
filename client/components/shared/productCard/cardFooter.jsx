"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CardActions, Button, Fab, Stack, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  addCart,
  isExist,
} from "../../../store/slices/productSlice";
import { useSnackbar } from "notistack";
import { FavoriteBorder } from "@mui/icons-material";

const defaultProps = {
  config: {
    size: "small",
    direction: "row",
    favoriteLg: true,
    favorite: true,
    quickView: false,
  },
};

function CardFooter({ data, config = defaultProps.config }) {
  const { direction, favoriteLg, size, favorite, quickView } = config;
  const disPatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  if (!data) return;

  if (!data.count) data.count = 1;

  function handleAddCart() {
    disPatch(addCart(data));
    enqueueSnackbar("product added to cart", {
      variant: "success",
    });
  }
  function handleAddFavorite() {
    disPatch(addFavorite(data));
    enqueueSnackbar("product added to favorite", { variant: "success" });
  }

  return (
    <CardActions sx={{ py: 1, px: 0 }}>
      <Stack direction="row">
        <Stack
          direction={direction}
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
              add to favorite
            </Button>
          )}
          {quickView && <Button sx={{ border: "none" }}>quick view</Button>}
          <Button
            variant="contained"
            endIcon={<ShoppingCartOutlinedIcon />}
            onClick={handleAddCart}
            sx={{ borderRadius: "0" }}
            size={size}
          >
            add to cart
          </Button>
        </Stack>
        {favorite && !favoriteLg && (
          <IconButton
            aria-label="favourite"
            onClick={handleAddFavorite}
            size={size}
          >
            <FavoriteBorder />
          </IconButton>
        )}
      </Stack>
    </CardActions>
  );
}

export default CardFooter;
