import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridOverlay,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { orderTypes } from "./OrderPage";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { createTheme } from "@mui/material/styles";
import OrderDialog from "./OrderDialog";
import OrderDelete from "./OrderDelete";
import { Container, Typography } from "@mui/material";
import OrderGrid from "./OrderGrid";

const theme = createTheme();

interface IProps {
  ordersValues: orderTypes[];
  ordersToDelete: number[];
  setOrdersToDelete: (newState: number[]) => void;
  searchValue: string;
  setSearchValue: (newState: string) => void;
  refetchOrders: () => void;
}

export default function OrderHome(props: IProps) {
  const {
    ordersValues,
    ordersToDelete,
    setOrdersToDelete,
    searchValue,
    setSearchValue,
    refetchOrders,
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
          <OrderDialog />
          <OrderDelete {...{ ordersValues, ordersToDelete }} />
        </div>
      </div>
      <OrderGrid {...{ ordersValues, ordersToDelete, setOrdersToDelete }} />
    </Container>
  );
}
