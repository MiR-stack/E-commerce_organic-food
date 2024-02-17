"use client";
import Modal from "../../shared/modal";
import {
  handleClose,
  handleOpen,
  handleRoute,
  handleToken,
} from "../../../store/slices/authSlice";
import Register from "./register";
import Login from "./login";
import { IconButton, Box, Stack, Button, Divider, Avatar } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import CustomMenu from "../navbar/menus/CustomMenu";
import useMenu from "../../../hooks/useMenu";
import CustomAvater from "../../utils/avatar";
import { handleUser } from "../../../store/slices/userSlice";
import { useFindMeMutation } from "../../../store/apis/authentication";
import { useEffect } from "react";

function AuthModal({ modal, component }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const pathName = usePathname();

  const handleProvider = async (provider) => {
    router.push(`${process.env.NEXT_PUBLIC_STRAPI_URL}/connect/${provider}`);
    handleClose();
    dispatch(handleRoute(pathName));
  };
  return (
    <Modal
      open={modal}
      handleClose={handleClose}
      dispatchable={true}
      style={{ pt: 2 }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          pt: 3,
        }}
      ></Box>
      <Stack alignItems={"center"} gap={1}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={() => handleProvider("google")}
        >
          sign in with google
        </Button>

        <Divider>or</Divider>
        {component === "login" ? <Login /> : <Register />}
      </Stack>
    </Modal>
  );
}

function User({ logoutOptions, loginOptions }) {
  const { modal, component, token } = useSelector(
    (state) => state.authentication
  );
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { open, anchorEl, handleClick, handleClose } = useMenu();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(handleUser({ isLoggedIn: false, user: null }));
    dispatch(handleToken(""));
  };

  loginOptions.forEach((option) => {
    if (option.label === "login") {
      option.onClick = handleOpen("login");
      option.dispatchable = true;
    } else if (option.label === "register") {
      option.onClick = handleOpen("register");
      option.dispatchable = true;
    }
  });
  logoutOptions.forEach((option) => {
    if (option.label === "logout") {
      option.onClick = handleLogout;
    }
  });

  const [findMe] = useFindMeMutation();

  useEffect(() => {
    if (!isLoggedIn && token) {
      async function getUser() {
        const user = await findMe(token);
        dispatch(handleUser({ isLoggedIn: true, user: user.data }));
      }
      getUser();
    }
  }, [token, isLoggedIn]);

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        sx={{ display: { xs: "none", sm: "inline-block" } }}
        onClick={handleClick}
      >
        <CustomAvater
          avatar={user?.avatar ? { data: { attributes: user.avatar } } : ""}
          name={user?.firstName}
          styles={{ height: 40, width: 40 }}
          config={{ name: "sm" }}
        />
      </IconButton>
      <AuthModal modal={modal} component={component} />
      <CustomMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        links={isLoggedIn ? logoutOptions : loginOptions}
      />
    </div>
  );
}

export default User;
