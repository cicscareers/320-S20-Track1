import React from 'react';
import {Button, Grid, makeStyles, Fab, Typography} from '@material-ui/core';
import BlockSettings from './BlockSettings.js';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(1) * 3,
        right: theme.spacing(1) * 4,
    },
  }));

const BlockCard = (props) => {
    const {settings} = props
    const classes=useStyles()

    const getTypeCard = (typeObj, settings) => {
        return <BlockSettings {...typeObj} settings={settings}/>;
    };

    console.log("hello from block settings")
    console.log(settings)
    console.log("***********************")

    return (
        <div>  
            <Grid direction="column" container>
                <Grid item xs={12}>
                    {settings.appointment_type_info.map(typeObj => getTypeCard(typeObj))}
                </Grid>
                <Grid item xs={1}>
                <Button variant="contained" color="primary" className={classes.fab}>
                    <Typography variant="h6">
                        Save Settings
                    </Typography>
                </Button>
                </Grid>
            </Grid>
        </div>
    );
}
	
export default BlockCard;