import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Fab} from '@material-ui/core';
import useStyles from "./BlockStyles.js"
import BlockCard from '../BlockCards/BlockCards.js'
import BlockList from '../Blocks.js'
import AddIcon from '@material-ui/icons/Add';



const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [isLoaded, setLoaded] = React.useState(true);
  useEffect(() => {
    
    }, [])

  
  //Creates a new supporter card a supporter
  
  const getBlockCard = (blockObj, s) => {
    return <BlockCard {...blockObj}/>;
  };

  const uniqueBlocksDict={}
  
  function populateUniqueBlocks(){
    for(let i =0;i<BlockList.length;i++){
      var curr=BlockList[i]
      BlockList.splice(i,i+1)
      if(!uniqueBlocksDict[curr.recurring_id]){
        BlockList.unshift(curr)
        uniqueBlocksDict[curr.recurring_id]=curr.recurring_id
      }
    }
  }

  populateUniqueBlocks()


  if(!isLoaded){
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    )
  }

  //If the API is loaded, show the matching page
  else{
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          {BlockList.map(blockObj => getBlockCard(blockObj))}
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </main>
      </div>
    );
  }
}

export default ResponsiveDrawer;
