import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans Light",
    fontStyle: "normal",
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: "#881c1c"
    },
    secondary: {
      main: "#FFFFFF"
    },
    tertiary: {
      main: "#71b2c9"
    }
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);
