import React , {useEffect} from "react"
import {makeStyles, Typography, Button, Container, CircularProgress, TextField, Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
    }
}));


const ProfileInformation = (props) => {
    const classes=useStyles();
    const {specializations, supporter_types, teams, employer, title, tags, prefMajors, prefMinors} = props

    function handleSubmit(){
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/1",
            {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                employer: "Test"
              })
            }
          )
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response)
              return response.json();
            } else {
              throw new Error("Server can't be reached!");
            }
          })
          .then(json => {
            //setOpen(false);
            //setOpenCreated(true);
          })
          .catch(error => {
            console.log(error);
          });
    }
    


    
    return (
        <Button
            margin="normal"
            form className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
        >
            Save
        </Button>
    );
}

export default ProfileInformation;