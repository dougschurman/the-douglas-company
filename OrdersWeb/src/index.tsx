import * as ReactDOM from "react-dom";
import App from "./App";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { themeConfig } from "../theme.config";
import { BrowserRouter } from "react-router-dom";

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
