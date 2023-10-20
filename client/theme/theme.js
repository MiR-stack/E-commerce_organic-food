import { createTheme, responsiveFontSizes } from "@mui/material";
import getDesignToken from "./mode";

let theme = createTheme(getDesignToken());

theme = responsiveFontSizes(theme);

export default theme;
