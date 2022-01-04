import * as ReactDOM from "react-dom";
import App from "./App";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { themeConfig } from "../theme.config";
import { BrowserRouter } from "react-router-dom";

declare global {
  interface Window {
    __BASENAME__: string;
    __APP_VERSION__: string;
    __APP_ENVIRONMENT__: string;
  }
}

const basename = window.__BASENAME__;
const version = window.__APP_VERSION__;
const environment = window.__APP_ENVIRONMENT__;

delete window.__APP_ENVIRONMENT__;

const muiPalette = themeConfig.palette;
const muiTypography = themeConfig.typography;

const theme = responsiveFontSizes(
  createTheme({
    palette: muiPalette,
    typography: muiTypography,
  })
);

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("mountNode")
);
