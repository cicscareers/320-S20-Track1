import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Avatar, Toolbar, Typography, MenuItem, Button, Menu, Link,Dialog} from "@material-ui/core";
import Cookies from "universal-cookie";
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
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
  logo: {
    color: "#881c1c",
    fontSize: "255%",
    borderRadius: "40em",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
  },
  button: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    marginLeft: "1%",
    color: '#881c1c',
    fontSize: '120%',
    borderRadius: "40em",
    "&:hover": {
      backgroundColor: "#881c1c",
      color: "#FFF",
    },
  },
  pictureButton: {
    marginLeft: "1%",
    borderRadius: "100em",
    "&:hover": {
      backgroundColor: "#881c1c",
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


export default function MenuAppBar(props) {

  const [PossibleRoles,SetPossibleRoles] = React.useState([]);
  //Gets info from the cookies
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("firstName");
  
  var role = cookies.get("role");

  const id = cookies.get("id");
  //Sets the styling
  const classes = useStyles();

  //In order to only show the toolbar when authorized
  const [auth, setAuth] = React.useState(token !== undefined);

  //To handle the drop down menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = React.useState(false);

  useEffect(() => {
    fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/' + id + '/role')
            .then(res => res.json())
            .then(json => {
            
              SetPossibleRoles(['student','supporter', 'admin']);
            })
            .catch(error => {
                console.log(error);
                console.log("No Supporters Found");
            });
    }, [])
   
    
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
   if(role.toLowerCase()==PossibleRoles[0]){
     return(<div style={{width:'40%',float:'right'}}><Button variant="text" href="/match" className={classes.button}>Find A Supporter</Button>
     <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
     <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button></div>);

   }
  
    return(<div style={{width:'300px',float:'right'}}>>
    <Button variant="text" href="/appointments" className={classes.button}>Appointments</Button>
    <Button variant="text" href="/FAQ" className={classes.button}>FAQ</Button></div>);
    
  

 }
//  alert(PossibleRoles);
//   const RoleNameStudent=PossibleRoles[0].charAt(0).toUpperCase() + PossibleRoles[0].slice(1);
//   const RoleNameSupporter=PossibleRoles[1].charAt(0).toUpperCase() + PossibleRoles[1].slice(1);
//   const RoleNameAdmin=PossibleRoles[2].charAt(0).toUpperCase() + PossibleRoles[2].slice(1);
 const SwitchUserHandle= event =>{
  if(event.currentTarget.id=='student'){
    cookies.set('role',"Student");
  }
  else{
  cookies.set('role',event.currentTarget.id);
  }
  if(cookies.get('role')=='Student'){
    window.location.reload('/');
  }
 window.location.reload('/appointments');
  
 }
 function renderRolesInModal(){
  let RenderRoles=[];

  
  if(PossibleRoles.length==1){
    RenderRoles=(<h2>Sorry, You just have 1 role.</h2>);
  }
  else{
    
    for(var i=0;i<PossibleRoles.length;i++){
      var RoleName='';
      RoleName=PossibleRoles[i].charAt(0).toUpperCase() + PossibleRoles[i].slice(1);
     
      if(PossibleRoles[i]==role.toLowerCase()){
        continue;
      }
    
      
      RenderRoles.push((<Button key={i} className={classes.button}
      id={PossibleRoles[i]}
      
       
        color="primary"
        onClick={SwitchUserHandle}
        style={{marginLeft:'10px',marginRight:'10px'}}
      >
        {RoleName}
       </Button>
     ));
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
         {role.toLowerCase()==PossibleRoles[0] &&<Button variant="text" href="/" className={classes.button}>Find A Supporter</Button>}
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
      {(role===PossibleRoles[1]||role===PossibleRoles[2])  && (
      <MenuItem onClick={handleClose}>
        <Link href="/supporter-settings">
          <Typography component="h6" variant="h6">
            Supporter Settings
          </Typography>
        </Link>
      </MenuItem>
    )}
    
 
  {(PossibleRoles.length!=1)&&(<MenuItem onClick={handleModalOpen}>
  <Link >
      <Typography component="h6" variant="h6">
        Switch User
      </Typography>
      </Link>
  </MenuItem>)}
  {/* <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={openModal}>
  </Dialog> */}
   {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Which role do you want to choose?</h2>
      <p id="transition-modal-description" style={{textAlign:'center'}}>{renderRolesInModal()}</p>
          </div>
        </Fade>
      </Modal> */}
       <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Which role do you want to choose?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Given below are the list of the roles that you have been registered as. Select the role you want to switch to.
          </DialogContentText>
          <div style={{textAlign:'center'}}>
          {renderRolesInModal()}
          </div>
        </DialogContent>
        <DialogActions>
          
          <Button className={classes.button} onClick={handleModalClose} >
            Close
          </Button>
        </DialogActions>
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
