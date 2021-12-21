import OrderPage from "./Components/OrderPage";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider {...{ client }}>
        <OrderPage/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
