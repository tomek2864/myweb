import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core/";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: "center",
    height: 600,
    [theme.breakpoints.down("lg")]: {
      height: 400
    },
    [theme.breakpoints.down("sm")]: {
      height: 300
    }
  },
  text: {
    marginTop: 200,
    fontSize: 56,
    fontFamily: ["Scope One", "serif"].join(","),
    [theme.breakpoints.down("lg")]: {
      marginTop: 90,
      fontSize: 46
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 42
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30
    }
  }
});

class Hello extends Component {
  render() {
    const { classes } = this.props;
    return (
      <section id="hello">
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.text} variant="h3">
            Witaj! <br />
            Nazywam się Tomasz Sobczak
            <br />
            Zajmuje się elektroniką <br />
            oraz tworzeniem oprogramowania.
          </Typography>
        </Paper>
      </section>
    );
  }
}

Hello.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hello);
