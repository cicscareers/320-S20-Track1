import React from "react";
import {AppBar, Drawer, CssBaseline, Typography} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
import classes from "./SupporterSettingsStyles";



const SupporterSettings = (props) => {
  
return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
        <Menu/>
    </AppBar>
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
        paper: classes.drawerPaper,
        }}
    > 
        <Typography>Test</Typography>
    </Drawer>
    <main className={classes.content}>
        <Typography>Test</Typography>
    </main>
    </div>
);
}

export default SupporterSettings;
