import * as React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout } from "store";

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.ul}>
        {links.map(({ title, route }, index) => (
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            key={index}
            to={route}
          >
            <ListItem button key={index}>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            dispatch(setLogout(""));
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          style={{ color: "#8493ae" }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={"right"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </>
    </div>
  );
}

const links = [
  { title: "Patients", route: "/dashboard" },
  { title: "Tests", route: "/tests" },
  { title: "Consumables", route: "/consumables" },
  { title: "Bookings", route: "/bookings" },
];

const useStyles = makeStyles({
  ul: {
    marginTop: "50px !important",
  },
});
