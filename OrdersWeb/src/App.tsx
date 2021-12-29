import { QueryClientProvider, QueryClient } from "react-query";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themeConfig } from "../theme.config";
import Root from "./Root";

const muiPalette = themeConfig.palette;
const muiTypography = themeConfig.typography;

const theme = createTheme({
  palette: muiPalette,
  typography: muiTypography,
});

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider {...{ client }}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Root />
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
