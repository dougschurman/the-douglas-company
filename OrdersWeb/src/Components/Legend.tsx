import { Stack, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

export default function Legend() {
  const classes = useStyles();
  return (
    <>
      <Stack
        direction="row"
        sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}
      >
        <div className={classes.legendItem}>
          <div
            className={classes.circle}
            style={{ backgroundColor: "#0571dd" }}
          >
            {" "}
          </div>
          <Typography>Standard</Typography>
        </div>
        <div className={classes.legendItem}>
          <div
            className={classes.circle}
            style={{ backgroundColor: "#59FFA0" }}
          >
            {" "}
          </div>
          <Typography>Purchase</Typography>
        </div>
        <div className={classes.legendItem}>
          <div
            className={classes.circle}
            style={{ backgroundColor: "#131B23" }}
          >
            {" "}
          </div>
          <Typography>Return</Typography>
        </div>
      </Stack>
      <Stack
        direction="row"
        sx={{ mb: 1, alignItems: "center", justifyContent: "space-evenly" }}
      >
        <div className={classes.legendItem}>
          <div
            className={classes.circle}
            style={{ backgroundColor: "#898980" }}
          >
            {" "}
          </div>
          <Typography>Sale</Typography>
        </div>
        <div className={classes.legendItem}>
          <div
            className={classes.circle}
            style={{ backgroundColor: "#DAB6FC" }}
          >
            {" "}
          </div>
          <Typography>Transfer</Typography>
        </div>
      </Stack>
    </>
  );
}

const useStyles = makeStyles({
  circle: {
    height: "12px",
    width: "12px",
    borderRadius: "50%",
    marginRight: "2px",
  },
  legendItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
