"use client";

import { Box, IconButton, Badge, Avatar } from "@mui/material";
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import useDrawer from "../../shared/drawer/useDrawer";
import ProductsDrawer from "./drawer/productsDrawer";
import { useSelector } from "react-redux";
import { handleQuantity } from "../../../utils";
import User from "../authentication";

function RightSideIcons({ loginOptions, logoutOptions }) {
  const { open: cartOpen, handleDrawerToggle: handleCartDrawerToggle } =
    useDrawer();
  const {
    open: favouriteOpen,
    handleDrawerToggle: handleFavouriteDrawerToggle,
  } = useDrawer();

  const { carts: cartItems, favorites: favouriteItmes } = useSelector(
    (state) => state.products
  );
  const cartQuantity = handleQuantity(cartItems);
  const favouriteQuantity = handleQuantity(favouriteItmes);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        fontSize: { xs: 12, sm: 16, md: 25, lg: 30 },
      }}
    >
      <IconButton
        size="large"
        aria-label="favourite items"
        color="inherit"
        onClick={handleFavouriteDrawerToggle}
      >
        <Badge badgeContent={favouriteQuantity} max={99} color="error">
          <FavoriteBorderOutlined
            sx={{ fontSize: { xs: 20, sm: 25, lg: 30 } }}
          />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show cart items"
        color="inherit"
        onClick={handleCartDrawerToggle}
      >
        <Badge badgeContent={cartQuantity} max={99} color="error">
          <ShoppingCartOutlined sx={{ fontSize: { xs: 20, sm: 25, lg: 30 } }} />
        </Badge>
      </IconButton>

      <User loginOptions={loginOptions} logoutOptions={logoutOptions} />

      <ProductsDrawer
        title={"Cart Items"}
        open={cartOpen}
        products={cartItems}
        quantity={cartQuantity}
        handleDrawerToggle={handleCartDrawerToggle}
        type={"cart"}
      />
      <ProductsDrawer
        title={"Favourite Items"}
        open={favouriteOpen}
        products={favouriteItmes}
        quantity={favouriteQuantity}
        handleDrawerToggle={handleFavouriteDrawerToggle}
        type={"favourite"}
      />
    </Box>
  );
}

export default RightSideIcons;
