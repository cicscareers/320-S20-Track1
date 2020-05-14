import React from "react"
import {makeStyles, Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
    }
}));

const ProfileInformation = (props) => {
    const classes=useStyles();
    const {prefName,picture,pronouns,phoneNumber,linkedIn,bio} = props
    console.log(linkedIn)
    function handleSubmit(){
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/" + sessionStorage.getItem("id"),
            {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "preferred_name": prefName,
                "bio": bio,
                "picture" : picture,
                "pronouns": pronouns,
                "phone": phoneNumber,
                "links": [["LinkedIn",linkedIn]],
                "tags": [],
                "specializations": [],
                "notification_preferences": [],
                "major_preferences": [],
                "minor_preferences": [],
                "supporter_types": []
              })
            }
          )
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response)
              sessionStorage.setItem("image", picture);
              return response.json();
            } else {
              throw new Error("Server can't be reached!");
            }
          })
          .then(json => {
            window.location.reload()
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