import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Avatar, Toolbar, Typography, MenuItem, Button, Menu, Link,Dialog} from "@material-ui/core";
import Cookies from "universal-cookie";
import Roles from'./role.json';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
      }, 
    }, 
  }, 
  menuButton: {
    flexGrow: 1,
  },
  bar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: 80,
  },
  logo:{
    color: '#881c1c',
    fontSize: '255%',
    borderRadius: "40em",
    '&:hover': {
      backgroundColor: '#FFFFFF',
    }
  },
  button: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: "1%",
    color: '#881c1c',
    fontSize: '120%',
    borderRadius: "40em",
    '&:hover': {
      backgroundColor: '#881c1c',
      color: '#FFF'
    }
  },
  pictureButton: {
    marginLeft: "1%",
    borderRadius: "100em",
    '&:hover': {
          backgroundColor: '#881c1c',
        },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  spacer: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const PossibleRoles=["Student","Supporter","Admin"];
export default function MenuAppBar() {

  //Gets info from the cookies
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("firstName");
  
  var role = cookies.get("role");
  //Sets the styling
  const classes = useStyles();

  //In order to only show the toolbar when authorized
  const [auth, setAuth] = React.useState(token !== undefined);

  //To handle the drop down menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
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
 function renderNavBarButtonsBasedOnRole(){
   let RenderButtons=[];
   if(role==PossibleRoles[0]){
     return(<div style={{width:'40%',float:'right'}}><Button variant="text" href="/" className={classes.button}>Find A Supporter</Button>
     <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
     <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button></div>);

   }
  
    return(<div style={{width:'300px',float:'right'}}>>
    <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
    <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button></div>);
    
  

 }
 const SwitchUserHandle= event =>{
  
  cookies.set('role',event.currentTarget.id);
 
  window.location.reload();
 }
 function renderRolesInModal(){
  let RenderRoles=[];
  var RolesList=Roles[0];
  if(RolesList.roles.length==1){
    RenderRoles=(<h2>Sorry, You just have 1 role.</h2>);
  }
  else{

    for(var i=0;i<RolesList.roles.length;i++){
      if(RolesList.roles[i]==role){
        continue;
      }
      RenderRoles.push((<Chip
      id={RolesList.roles[i]}
       
        label={RolesList.roles[i]}
        clickable
        color="primary"
        onClick={SwitchUserHandle}
        
      />));
    }
  }
return RenderRoles;
}
  //First button is to link back to home. The rest is the drop down menu from the user icon, and handles the routing.
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.bar}>
        <Toolbar>
          <Button href="/match" className={classes.logo}>
             ReachOUT
          </Button>
          <Typography className={classes.spacer}>
          </Typography>
         {role==PossibleRoles[0] &&<Button variant="text" href="/" className={classes.button}>Find A Supporter</Button>}
          <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
     <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button>
          <Button className={classes.pictureButton} onClick={handleMenu}>
            <Avatar alt={name} 
              src="https://www.cics.umass.edu/sites/default/files/styles/people_individual/public/headshots/img_4695_copy.jpg?itok=jwwJF0KP"
              className={classes.large}>
            </Avatar>
          </Button>
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

    {role===PossibleRoles[2] && (
      <MenuItem onClick={handleClose}>
        <Link href="/admin-settings">
          <Typography component="h6" variant="h6">
            Admin Settings
          </Typography>
        </Link>
      </MenuItem>
    )}
      {role===PossibleRoles[2] && (
      <MenuItem onClick={handleClose}>
        <Link href="/supporter-settings">
          <Typography component="h6" variant="h6">
            Supporter Settings
          </Typography>
        </Link>
      </MenuItem>
    )}
    
 
  <MenuItem onClick={handleModalOpen}>
    
      <Typography component="h6" variant="h6">
        Switch User
      </Typography>
  </MenuItem>
  <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={openModal}>
    
  </Dialog>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
