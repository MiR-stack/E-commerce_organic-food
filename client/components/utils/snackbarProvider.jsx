"use client";

import { SnackbarProvider as Provider } from "notistack";

function SnackbarProvider({ children }) {
  return <Provider maxSnack={3}>{children}</Provider>;
}

export default SnackbarProvider;
