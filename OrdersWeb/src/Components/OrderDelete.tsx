import {
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React = require("react");
import { useQueryClient } from "react-query";

interface IProps {
  ordersToDelete: number[];
}

const theme = createTheme();

export default function OrderDelete(props: IProps) {
  const { ordersToDelete } = props;
  const queryCache = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .delete("http://www.dougschurman.com/Order", { data: ordersToDelete })
      .then((response: any) => {
        queryCache.invalidateQueries("orders");
        //when done
        handleClose();
      })
      .catch((error: any) => {
        console.error("Something went wrong!", error);
      });
  };

  return (
    <div>
      <Button
        disabled={props.ordersToDelete?.length === 0}
        variant="contained"
        sx={{
          bgcolor: "secondary.main",
          color: "secondary.constrastText",
          ":hover": { backgroundColor: "secondary.dark" },
          marginLeft: "12px",
        }}
        onClick={handleClickOpen}
      >
        <Typography>Delete Orders</Typography>
      </Button>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography>Delete Orders?</Typography>
        </DialogTitle>
        <DialogContent>
          <List style={{ maxHeight: "200px", overflow: "auto" }}>
            {ordersToDelete.map((order) => {
              return (
                <ListItem>
                  <Typography>{order}</Typography>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            <Typography>Cancel</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.constrastText",
              ":hover": { backgroundColor: "secondary.dark" },
            }}
            onClick={handleSubmit}
          >
            <Typography>Confirm</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
