import { List, ListItem } from "@mui/material";
import { orderTypes } from "./OrderPage";
import OrderRow from "./OrderRow";
import makeStyles from "@mui/styles/makeStyles";

interface IProps {
  ordersValues: orderTypes[];
  ordersToDelete: number[];
  setOrdersToDelete: (newState: number[]) => void;
}

export default function OrderGrid(props: IProps) {
  const { ordersValues, ordersToDelete, setOrdersToDelete } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.ordersValues.map((row, i) => (
        <OrderRow
          key={i}
          order={row}
          {...{ ordersToDelete, setOrdersToDelete }}
        />
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "calc(100vh - 160px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "rgba(0, 0, 0, 0.2)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
  },
});
