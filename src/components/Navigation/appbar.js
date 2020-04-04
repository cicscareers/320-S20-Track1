import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import { Menu, Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Cookies from "universal-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    //marginRight: theme.spacing(6),
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
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
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("firstName");
  const role = cookies.get("role");
  const classes = useStyles();
  const [auth, setAuth] = React.useState(token !== undefined);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    cookies.remove("email");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("role");
    cookies.remove("token");
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            type="submit"
            href="/match"
            className={classes.menuButton}
            align = "left"
          >
          <Typography component="h1" variant="h3" color="secondary">
            ReachOUT
          </Typography>
          </Button>
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
                    <Link href="/admin/settings">
                      <Typography component="h6" variant="h6">
                        Admin Settings
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                {role==="Supporter" && (
                  <MenuItem onClick={handleClose}>
                    <Link href="/supporter/settings">
                      <Typography component="h6" variant="h6">
                        Supporter Settings
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem onClick={handleClose}>
                  <Link href="/appointments">
                    <Typography component="h6" variant="h6">
                      Upcoming Appointments
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