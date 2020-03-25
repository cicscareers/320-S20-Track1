import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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
const useStyles = makeStyles(theme => ({
  root: {
    width: '20%',
    maxWidth: 100,
    backgroundColor: theme.palette.background.paper,
  },
}));

function filter_list_by_type(type){

  list_of_supporters = list_of_all_supporters.filter(function (e){
    
    return e.type == type;});

}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleSelect() {
  return (
    <List component="nav" aria-label="main mailbox folders">
      {list_of_supporters.map(value => {
        return(
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary = {value.name} />
          <ListItemText secondary = {value.type} />
        </ListItem>
        );
      })};
      </List>
  );
}
