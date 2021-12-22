import * as ReactDOM from "react-dom";
import App from './App';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { themeConfig } from "../theme.config";


const muiPalette = themeConfig.palette;
const muiTypography = themeConfig.typography;

const theme = responsiveFontSizes(
  createTheme({
    palette: muiPalette,
    typography: muiTypography,
  })
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>,
  document.getElementById('mountNode')
);

