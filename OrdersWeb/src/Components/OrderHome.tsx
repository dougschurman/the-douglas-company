import { orderTypes, filterFields } from "./OrderPage";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { createTheme } from "@mui/material/styles";
import OrderDialog from "./OrderDialog";
import OrderDelete from "./OrderDelete";
import Filter from "./Filter";
import { Container, Typography } from "@mui/material";
import OrderGrid from "./OrderGrid";

const theme = createTheme();

interface IProps {
  ordersValues: orderTypes[];
  ordersToDelete: number[];
  setOrdersToDelete: (newState: number[]) => void;
  setSearchValue: (newState: string) => void;
  refetchOrders: () => void;
  setFilterValue: (newState?: filterFields) => void;
}

export default function OrderHome(props: IProps) {
  const {
    ordersValues,
    ordersToDelete,
    setOrdersToDelete,
    setSearchValue,
    refetchOrders,
    setFilterValue
  } = props;

  const debounceSearch = useDebouncedCallback(async () => {
    refetchOrders();
  }, 300);
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
    debounceSearch();
  };

  return (
    <Container maxWidth="xl">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "8px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          type="text"
          onChange={handleChange}
          size="small"
          color="secondary"
        />
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Filter setFilterValue={setFilterValue}/>
          <OrderDialog />
          <OrderDelete {...{ ordersValues, ordersToDelete }} />
        </div>
      </div>
      <OrderGrid {...{ ordersValues, ordersToDelete, setOrdersToDelete }} />
    </Container>
  );
}
