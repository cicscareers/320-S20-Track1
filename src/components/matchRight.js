import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Left from './matchLeft.js';

const useStyles = makeStyles(theme => ({
  formControl: {
  	flexDirection: 'row',
    margin: theme.spacing(1),
    minWidth: 3,
    border:10,
    padding: 4,
  },
  selectEmpty: {
    marginTop: theme.spacing(10),
  },
}));
const myInputLabel = styled(InputLabel)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});


export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = event => {

    setAge(event.target.value);
    
    Left.filter_list_by_type(event.target.value.type);
  };

  return (
  <div>
  <div>
    <div>
      <FormControl className={classes.formControl}>
        <TextField id="lastName" label="Last Name"/>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField id="lastName" label="Last Name"/>
      </FormControl>
    </div>

    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="supporterType">Supporter Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={"Alumni"}>Alumni</MenuItem>
          <MenuItem value={"Professor"}>Professor</MenuItem>
          <MenuItem value={"Student"}>Student</MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>

  </div>

    
  );
}