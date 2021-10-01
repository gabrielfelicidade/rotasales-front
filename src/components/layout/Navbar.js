import { AppBar, CssBaseline, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const routes = [
    {
      route: "/home",
      text: "Página Inicial"
    },
    {
      route: "/sales",
      text: "Minhas Vendas"
    }
  ];

  return (
    <AppBar position="static" color="primary">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          RotaSales
        </Typography>
        {isMobile ? (
          <DrawerComponent routes={routes} />
        ) : (
          <div className={classes.navlinks}>
            {routes.map(route => {
              return (
                <Link to={route.route} style={{ textDecoration: 'none', margin: '0 15px' }} key={route.route}>
                  <Button variant="contained" disableElevation>{route.text}</Button>
                </Link>
              );
            })}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
