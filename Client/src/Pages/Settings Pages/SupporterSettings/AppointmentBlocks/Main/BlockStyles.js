import {makeStyles} from '@material-ui/core';

const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(1) * 3,
      right: theme.spacing(1) * 4,
    },
    spacer: {
      flexGrow: 1,
    },
    calendarView: {
    },
    blockList: {
    }
  }));

  export default useStyles;