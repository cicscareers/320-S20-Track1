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
    const {specializations, office, teams, employer, title, tags, prefMajors, prefMinors, specializations_json} = props

    var arr=[]
    var ar=[]
    for(let i=0;i<specializations.length;i++){
      if(!specializations_json[specializations[i]]){
        ar=[specializations[i], 30, 1]
        arr.push(ar)
      } else {
        var dur=specializations_json[i].duration
        var max=specializations_json[i].max_students
        ar = [specializations[i], dur, max]
        arr.push(ar)
      }
    }

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
                "title":title,
                "employer": employer,
                "team_name":teams,
                "office": office,
                "links": [],
                "notification_preferences": [],
                "tags": tags,
                "major_preferences": prefMajors,
                "minor_preferences": prefMinors,
                "supporter_types": [],
                "specializations" : arr
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