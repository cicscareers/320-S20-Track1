import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Frutiger",
    fontStyle: "normal"
  },
  palette: {
    primary: {
      main: "#881c1c"
    },
    secondary: {
      main: "#FFFFFF"
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
