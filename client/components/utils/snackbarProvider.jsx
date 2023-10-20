"use client";

import { SnackbarProvider as Provider } from "notistack";

import React from "react";

function SnackbarProvider({ children }) {
  return <Provider maxSnack={3}>{children}</Provider>;
}

export default SnackbarProvider;
