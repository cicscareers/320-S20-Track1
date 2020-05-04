import React from 'react';
import {Card, Typography, CardContent, CardActions, makeStyles, Grid, Select, Input, MenuItem, FormControl, InputLabel, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
      padding: 4
    },
    button: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    leftInput: {
      paddingRight: theme.spacing(6),
    }
}));

function assertInt(num){
    return Number.isInteger(num)
}

const BlockCard = (props) => {
  const classes = useStyles()
  const {specialization_type, duration, max_students, settings} = props
  const [length, setLength]=React.useState(duration)
  const [max, setMax]=React.useState(max_students)
  console.log("settings")
  console.log(settings)

  const [specialization_json, setSpecialization_json]=React.useState(settings ? settings.appointment_type_info : null)
  console.log("specialization json")
  console.log(specialization_json)
  const [json_to_array, setjson_to_array]=React.useState(extractSpecializationTypesArray(specialization_json))

  console.log("json to array")
  console.log(json_to_array)
  console.log("*****************")

  function extractSpecializationTypesArray(spec){
    var arr=[]
    if(!spec){
        return arr
    }
    for(let i=0;i<spec.length;i++){
        var ar=[]
        ar.push(spec[i]["specialization_type"])
        ar.push(spec[i]["duration"])
        ar.push(spec[i]["max_students"])
        arr.push(ar)
    }
    //console.log(arr)
    return arr
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
            "links": [],
            "tags": [],
            "specializations": json_to_array,
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

  function handleSetLength(e){
    setLength(e.target.value)
    for(let i=0;i<json_to_array.length;i++){
      if(json_to_array[i][0]===specialization_type){
        json_to_array[i][1]=parseInt(e.target.value)
      }
    }
    console.log(json_to_array)
  }

  function handleSetMax(e){
    setMax(e.target.value)
    for(let i=0;i<json_to_array.length;i++){
      if(json_to_array[i][0]===specialization_type){
        json_to_array[i][2]=e.target.value
      }
    }
    console.log(json_to_array)
  }

  return (
    <div>
        <Card className={classes.content}>
          <CardContent>
            <Typography align="center"><b>Appointment Block Type: </b>{specialization_type}</Typography>
              <br/>
              <Grid container>
                <Grid item xs={6} className={classes.leftInput}>
                  
                  <FormControl fullWidth>
                    <InputLabel fullWidth>Appointment Duration</InputLabel>
                    <Select
                      value={length}
                      onChange={handleSetLength}
                      input={<Input />}
                      fullWidth
                    >
                      {["15","30","45","60","75","90","105","120"].map((number) => (
                        <MenuItem value={number}>{number}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel fullWidth>Maximum Number of Students</InputLabel>
                    <Select
                      value={max}
                      onChange={handleSetMax}
                      input={<Input />}
                      fullWidth
                    >
                      {["1","2","3","4","5","6","7","8","9","10"].map((number) => (
                        <MenuItem value={number}>{number}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
          </CardContent>
            
            <CardActions>
              <Button onClick={handleSubmit}>
                Confirm changes for block
              </Button>
            </CardActions>
        </Card>
        <br/>
    </div>
    );
}
	
export default BlockCard;