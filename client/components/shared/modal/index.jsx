import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

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
  overflow: "auto",
};

export default function GlobalModal({
  children,
  open,
  handleClose,
  dispatchable,
  style,
  close = true,
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
      <Box sx={{ ...defaultStyle, ...style }}>
        {close ? (
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 5,
              bgcolor: "background.offWhite",
            }}
            onClick={
              dispatchable
                ? () => {
                    dispatch(handleClose());
                  }
                : handleClose
            }
          >
            <Close />
          </IconButton>
        ) : (
          ""
        )}
        {children}
      </Box>
    </Modal>
  );
}
