import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Auth, Amplify } from "aws-amplify";
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const role = cookies.get('role')
var primary_color="#881c1c"
if (role==='supporter'){
  primary_color="#003b5c"
}else if (role==='admin'){
  primary_color="#41273b"
}
console.log(primary_color)

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans Light',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    //type: 'dark',
    primary: {
      main: primary_color,
    },
    secondary: {
      main: "#FFFFFF",
    }
  },
});

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-2',
    userPoolId: 'us-east-2_TOeWJwIy0',
    userPoolWebClientId: '7phnpqt6kfvfr9apoelke4hhm1'
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
