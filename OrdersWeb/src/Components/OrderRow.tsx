import { Checkbox, Chip, Grid, Paper } from "@mui/material";
import { orderTypes } from "./OrderPage";
import * as moment from "moment";

interface IProps {
  order: orderTypes;
  ordersToDelete: number[];
  setOrdersToDelete: (newState: number[]) => void;
}

export default function OrderRow(props: IProps) {
  const { order, ordersToDelete, setOrdersToDelete } = props;

  const handleChecking = (order: orderTypes, checked: boolean) => {
    if (checked) {
      setOrdersToDelete([...ordersToDelete, order.orderID]);
    } else {
      setOrdersToDelete(ordersToDelete.filter((o) => o !== order.orderID));
    }
  };

  return (
    <Paper variant="outlined" sx={{ mb: 1, p: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Checkbox
            size="small"
            color="secondary"
            onChange={(e, checked) => handleChecking(order, checked)}
          />
        </Grid>
        <Grid item xs={1}>
          {props.order.orderID}
        </Grid>
        <Grid item xs={3}>
          {props.order.customerName}
        </Grid>
        <Grid item xs={3}>
          <Chip
            label={props.order.orderType.replace(/([a-z](?=[A-Z]))/g, "$1 ")}
            color="secondary"
            sx={{ minWidth: "120px", textAlign: "center" }}
          />
        </Grid>
        <Grid item xs={2}>
          {props.order.createdByUserName}
        </Grid>
        <Grid item xs={2}>
          {moment(props.order.createdDate).format("MM/DD/YYYY")}
        </Grid>
      </Grid>
    </Paper>
  );
}
