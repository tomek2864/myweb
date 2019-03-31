import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4f4a75",
      main: "#242249",
      dark: "#000022"
    },
    secondary: {
      light: "#ffc947",
      main: "#ff9800",
      dark: "#c66900"
    }
  },
  status: {
    danger: "orange"
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
