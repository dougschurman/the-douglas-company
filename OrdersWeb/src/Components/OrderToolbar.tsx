import {
  AppBar,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import * as React from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";

interface IProps {
  title: string;
  icon: JSX.Element;
}

export default function OrderToolbar(props: IProps) {
  const { title, icon } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <div style={{ marginBottom: "8px" }}>
      <AppBar position="static" color="secondary" elevation={2}>
        <Toolbar variant="dense">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "75px",
                justifyContent: "space-between",
              }}
            >
              {icon}
              <Typography>{title}</Typography>
            </div>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              The Douglas Company
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              {...{ open, anchorEl }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={() => setAnchorEl(null)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "150px",
                }}
              >
                <div
                  style={{
                    padding: "24px",
                    width: "120px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onClick={() => (window.location.href = "/")}
                >
                  <BusinessCenterIcon />
                  Home
                </div>
                <div
                  style={{
                    padding: "24px",
                    width: "126px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onClick={() => (window.location.href = "/details")}
                >
                  <AssessmentIcon />
                  Details
                </div>
              </div>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
