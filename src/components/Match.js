import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
let list_of_all_supporters = [
{
  "name": "Jim",
  "picture": "Images/face.jpg",
  "type": "Professor"
},
{
  "name": "James",
  "picture": "Images/face.jpg",
  "type": "Professor"
},
{
  "name": "Jerry",
  "picture": "Images/face.jpg",
  "type": "Student"

},
{
  "name": "Jane",
  "picture": "Images/face.jpg",
  "type": "Alumni"
},
{
  "name": "Sally",
  "picture": "Images/face.jpg",
  "type": "Professor"
},
{
  "name": "Yuri",
  "picture": "Images/face.jpg",
  "type": "Student"
},
{
  "name": "Bob",
  "picture": "Images/face.jpg",
  "type": "Student"
}
];
let list_of_supporters = list_of_all_supporters;


function Match(){
  const [age, setAge] = React.useState('');
  const [search, setSearch] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const onChange = e => {
    let emp = [];
    for(let s of list_of_all_supporters){
      if(s.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1){
        emp.push(s);
      }
    }
    list_of_supporters = emp;
    console.log(list_of_supporters);
    setSearch(e.target.value.toLowerCase());
    // Not working dont know why?
    // list_of_supporters = list_of_all_supporters.filter(supporter => 
    //   supporter.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
  };


  const handleChange = event => {
    setAge(event.target.value);
    list_of_supporters = list_of_all_supporters.filter(supporter => supporter.type == event.target.value);
    console.log(event.target.value);

    
  };
  function SupporterList(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Grid container>
      <Grid item sm>
        <List>
        {list_of_supporters.map(value => {
          return(
          <SupporterList button>
            <ListItemText primary = {value.name} />
            <ListItemText secondary = {value.type} />
          </SupporterList>
            );})};
        </List>
      </Grid>

      <Grid item sm>

      <FormControl>
        <TextField id="firstName" label="First Name" value={search} onChange={onChange.bind(this)}/>
      </FormControl>
      <FormControl>
        <TextField id="lastName" label="Last Name" value={search} onChange={onChange.bind(this)}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="supporterType">Supporter Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange.bind(this)}
        >
          <MenuItem value={"Alumni"} >Alumni</MenuItem>
          <MenuItem value={"Professor"}>Professor</MenuItem>
          <MenuItem value={"Student"}>Student</MenuItem>
        </Select>
      </FormControl>
      </Grid>

    </Grid>
  );
}

export default Match;