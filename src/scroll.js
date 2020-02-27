import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="King Codras" {...a11yProps(0)} />
          <Tab label="Sean Powell" {...a11yProps(1)} />
          <Tab label="Kyle O'Leary" {...a11yProps(2)} />
          <Tab label="Rajan Muralidharan" {...a11yProps(3)} />
          <Tab label="Michael Gadbois" {...a11yProps(4)} />
          <Tab label="Noah Brinton" {...a11yProps(5)} />
          <Tab label="Chinmay Patil" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Our Team
      </TabPanel>
      <TabPanel value={value} index={1}>
        Integration Liaison
      </TabPanel>
      <TabPanel value={value} index={2}>
        Customer Liaison
      </TabPanel>
      <TabPanel value={value} index={3}>
        Software Developer
      </TabPanel>
      <TabPanel value={value} index={4}>
        Secretary
      </TabPanel>
      <TabPanel value={value} index={5}>
        Team Leader
      </TabPanel>
      <TabPanel value={value} index={6}>
        Project Manager
      </TabPanel>
    </div>
  );
}