import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4A6572",
      main: "#344955",
      dark: "#232F34"
    },
    secondary: {
      main: "#F9AA33"
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
