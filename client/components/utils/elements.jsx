import { Stack, styled } from "@mui/material";

const CustomStack = styled("div")(
  ({ gap, alignItems, direction, justifyContent }) => ({
    display: "flex",
    flexDirection: direction,
    alignItems: alignItems || "center",
    gap: gap || "10px",
    justifyContent: justifyContent || "flex-start",
  })
);
export { CustomStack };
