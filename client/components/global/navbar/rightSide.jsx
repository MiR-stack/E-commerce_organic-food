"use client";

import { Box, IconButton, Badge, Avatar } from "@mui/material";
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import useMenu from "../../../hooks/useMenu";
import CustomMenu from "./menus/CustomMenu";
import useDrawer from "./drawer/useDrawer";
import ProductsDrawer from "./drawer/productsDrawer";
import { useDispatch, useSelector } from "react-redux";
import { handleCounter } from "../../../utils";
import { handleOpen, handleUser } from "../../../store/slices/authSlice";
import AuthModal from "../authentication";
import { useFindMeQuery } from "../../../store/apis/authentication";
import { useEffect } from "react";

function RightSideIcons({ loginOptions, logoutOptions }) {
  const dispatch = useDispatch();
  const { open, anchorEl, handleClick, handleClose } = useMenu();
  const { open: cartOpen, handleDrawerToggle: handleCartDrawerToggle } =
    useDrawer();
  const {
    open: favouriteOpen,
    handleDrawerToggle: handleFavouriteDrawerToggle,
  } = useDrawer();

  const { carts: cartItems, favorites: favouriteItmes } = useSelector(
    (state) => state.products
  );
  const cartItemsCount = handleCounter(cartItems);
  const favouriteItemsCount = handleCounter(favouriteItmes);

  const { modal, component, isLoggedIn, token } = useSelector(
    (state) => state.authentication
  );
  logoutOptions.forEach((option) => {
    if (option.label === "log in") {
      option.onClick = handleOpen("login");
      option.dispatchable = true;
    } else if (option.label === "register") {
      option.onClick = handleOpen("register");
      option.dispatchable = true;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(handleUser({ isLoggedIn: false, user: null }));
  };
  loginOptions.forEach((option) => {
    if (option.label === "logout") {
      option.onClick = handleLogout;
    }
  });

  const { data } = useFindMeQuery(token);
  useEffect(() => {
    if (data) {
      dispatch(
        handleUser({
          isLoggedIn: true,
          user: data,
        })
      );
    }
  }, [data]);

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
        <Badge badgeContent={favouriteItemsCount} max={99} color="error">
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
        <Badge badgeContent={cartItemsCount} max={99} color="error">
          <ShoppingCartOutlined sx={{ fontSize: { xs: 20, sm: 25, lg: 30 } }} />
        </Badge>
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        sx={{ display: { xs: "none", sm: "inline-block" } }}
        onClick={handleClick}
      >
        <Avatar sx={{ height: 40, width: 40 }} />
      </IconButton>

      <CustomMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        links={isLoggedIn ? loginOptions : logoutOptions}
      />
      <ProductsDrawer
        title={"Cart Items"}
        open={cartOpen}
        products={cartItems}
        count={cartItemsCount}
        handleDrawerToggle={handleCartDrawerToggle}
        type={"cart"}
      />
      <ProductsDrawer
        title={"Favourite Items"}
        open={favouriteOpen}
        products={favouriteItmes}
        count={favouriteItemsCount}
        handleDrawerToggle={handleFavouriteDrawerToggle}
        type={"favourite"}
      />
      <AuthModal modal={modal} component={component} />
    </Box>
  );
}

export default RightSideIcons;
