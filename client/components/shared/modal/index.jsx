import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  ourtline: "none",
};

export default function GlobalModal({
  children,
  open,
  handleClose,
  dispatchable,
  style,
}) {
  const dispatch = useDispatch();

  return (
    <Modal
      open={open}
      onClose={
        dispatchable
          ? () => {
              dispatch(handleClose());
            }
          : handleClose
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...defaultStyle, ...style }}>{children}</Box>
    </Modal>
  );
}
