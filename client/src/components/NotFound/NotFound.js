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
    height: 600
  },
  text: {
    marginTop: 200,
    fontSize: 56,
    fontFamily: ["Scope One", "serif"].join(",")
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.text} variant="h3">
            Przykro mi, podana strona nie istnieje...
          </Typography>
        </Paper>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
