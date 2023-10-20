"use client";
import Modal from "../../shared/modal";
import { handleClose } from "../../../store/slices/authSlice";
import Register from "./register";
import Login from "./login";
import { IconButton, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";

function AuthModal({ modal, component }) {
  const dispatch = useDispatch();
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
        }}
      >
        <IconButton onClick={() => dispatch(handleClose())}>
          <Close />
        </IconButton>
      </Box>
      {component === "login" ? <Login /> : <Register />}
    </Modal>
  );
}

export default AuthModal;
