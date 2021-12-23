import OrderPage from "./Components/OrderPage";
import { QueryClientProvider, QueryClient } from "react-query";
import {  createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themeConfig } from "../theme.config";

const muiPalette = themeConfig.palette;

const theme = createTheme({
  palette: muiPalette
});

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider {...{ client }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <OrderPage/>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
