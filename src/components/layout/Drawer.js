import { Menu } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
  }
}));

const DrawerComponent = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {props.routes.map(route => {
            return (
              <div key={route.route}>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to={route.route} className={classes.link}>{route.text}</Link>
                  </ListItemText>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Drawer>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: 'white' }}>
          <Menu />
        </IconButton>
      </div>
    </>
  );
}
export default DrawerComponent;
