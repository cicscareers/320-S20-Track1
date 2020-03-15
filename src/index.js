import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

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
      main: "#000000"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
