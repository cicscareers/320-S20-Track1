import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, IconButton, Switch, MenuItem, Button, ButtonGroup, Menu, Link} from "@material-ui/core";
import Cookies from "universal-cookie";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    flexGrow: 1,
  },
  title: {
    marginLeft: "25%"
  },
  buttonGroup: {
    marginLeft: "15%",
    flexGrow : 1
  },
  button: {
    width: "30%",
  },
}));
const styles = {
  button: {
    width: 64, height: 64,
    padding: 0,
  },
  icon: {
    width: 64, height: 64,
  },
};
export default function MenuAppBar() {

  //Gets info from the cookies
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("firstName");
  const role = cookies.get("role");
  //Sets the styling
  const classes = useStyles();

  //In order to only show the toolbar when authorized
  const [auth, setAuth] = React.useState(token !== undefined);

  //To handle the drop down menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Function that handles log out by deleting the cookie and reloading
  function logout() {
    cookies.remove("email");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("role");
    cookies.remove("token");
    window.location.reload();
  }

  //First button is to link back to home. The rest is the drop down menu from the user icon, and handles the routing.
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h3" color="secondary" className={classes.title}>
              ReachOUT
          </Typography>
          <ButtonGroup variant="text" color="secondary" className={classes.buttonGroup}>
              <Button variant="text" href="/" className={classes.button}>Find A Supporter</Button>
              <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
              <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button>
          </ButtonGroup>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={styles.button}
                iconStyle={styles.icon}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose}>
                  <Link href="/account">
                    <Typography component="h6" variant="h6">
                      My Account
                    </Typography>
                  </Link>
                </MenuItem>

                {role==="Admin" && (
                  <MenuItem onClick={handleClose}>
                    <Link href="/admin-settings">
                      <Typography component="h6" variant="h6">
                        Admin Settings
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                {role==="Supporter" && (
                  <MenuItem onClick={handleClose}>
                    <Link href="/supporter-settings">
                      <Typography component="h6" variant="h6">
                        Supporter Settings
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem onClick={handleClose}>
                  <Link href="/feedback">
                    <Typography component="h6" variant="h6">
                      Feedback
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={logout}>
                  <Link href="/login">
                    <Typography component="h6" variant="h6">
                      Log Out
                    </Typography>
                  </Link>
                </MenuItem>

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
