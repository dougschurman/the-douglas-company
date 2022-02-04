import { Checkbox, Chip, Grid, Paper } from "@mui/material";
import { orderTypes } from "./OrderPage";
import * as moment from "moment";

interface IProps {
  order: orderTypes;
  ordersToDelete: number[];
  setOrdersToDelete: (newState: number[]) => void;
}

export function getColor(type: string) {
  switch (type) {
    case "Standard":
      return "#0571dd";
    case "PurchaseOrder":
      return "#59FFA0";
    case "ReturnOrder":
      return "#131B23";
    case "SaleOrder":
      return "#898980";
    case "TransferOrder":
      return "#DAB6FC";
  }
}

export default function OrderRow(props: IProps) {
  const { order, ordersToDelete, setOrdersToDelete } = props;
  const typeColor = getColor(props.order.orderType);

  const handleChecking = (order: orderTypes, checked: boolean) => {
    if (checked) {
      setOrdersToDelete([...ordersToDelete, order.orderID]);
      console.log(ordersToDelete);
    } else {
      setOrdersToDelete(ordersToDelete.filter((o) => o !== order.orderID));
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{ mb: 1, p: 2, borderLeft: `6px solid ${typeColor}` }}
    >
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Checkbox
            size="small"
            color="secondary"
            onChange={(e, checked) => handleChecking(order, checked)}
            checked={ordersToDelete.includes(order.orderID)}
          />
        </Grid>
        <Grid container item xs={1} justifyContent={"center"}>
          {props.order.orderID}
        </Grid>
        <Grid container item xs={6}>
          <Grid container item xs={12} md={6} justifyContent={"center"}>
            {props.order.customerName}
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            justifyContent={"center"}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Chip
              label={props.order.orderType.replace(/([a-z](?=[A-Z]))/g, "$1 ")}
              sx={{
                minWidth: "120px",
                textAlign: "center",
                backgroundColor: typeColor,
                color: "#fff",
              }}
            />
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <Grid container item xs={12} md={6} justifyContent={"center"}>
            {props.order.createdByUserName}
          </Grid>
          <Grid item xs={12} md={6}>
            {moment(props.order.createdDate).format("MM/DD/YYYY")}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
