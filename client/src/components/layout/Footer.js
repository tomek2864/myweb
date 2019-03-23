import React, { Component } from "react";
import { Paper, Card, Tab, AppBar, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: "100%",
    margin: "auto",

    backgroundColor: theme.palette.primary.light,
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0
  },
  appBar: {
    padding: 5,
    top: "auto",
    bottom: 0,
    backgroundColor: "#fff"
  },
  appBarText: {
    color: "#000",
    textAlign: "center",
    fontFamily: ["Devonshire", "cursive"].join(","),
    fontSize: 18
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div position="fixed" color="primary" className={classes.root}>
        <AppBar className={classes.appBar}>
          <Typography className={classes.appBarText}>
            Project by Tomasz Sobczak
          </Typography>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
