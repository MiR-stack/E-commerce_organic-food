import { amber, grey, deepOrange } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    primary: {
      main: "#016a70",
      light: "#80b5b8",
      dark: "#014043",
    },
    secondary: {
      main: "#FFFFDD",
      light: "#ffffe7",
      dark: "#ccccb1",
    },
    tertiary: {
      main: "#d2de32",
      light: "#e4eb84",
      dark: "#939b23",
    },
    background: {
      offWhite: grey[100],
    },
    mode,

    ...(mode === "dark" && {
      primary: {
        main: "#34888d",
        light: "#67a6a9",
        dark: "#016a70",
      },
      secondary: {
        main: "#ffffe0",
        light: "#fffff1",
        dark: "#ffffe0",
      },
      tertiary: {
        main: "#e4eb84",
        light: "#f2f5c2",
        dark: "#d7e147",
      },
      background: {
        offWhite: grey[900],
      },
    }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      hm: 800, //half medium
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default getDesignTokens;
