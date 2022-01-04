import { Route, Routes } from "react-router-dom";
import OrderPage from "./Components/OrderPage";
import OrderDetails from "./Components/OrderDetails";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<OrderPage />} />
      <Route path="/details" element={<OrderDetails />} />
    </Routes>
  );
}
