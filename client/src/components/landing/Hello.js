import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: "center",
    height: 400
  },
  text: {
    marginTop: 100,
    fontFamily: ["Mukta Mahee", "sans-serif"].join(",")
  }
});

class Hello extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.text} variant="h3">
            Witaj! <br />
            Nazywam się Tomasz Sobczak{" "}
            <i
              className="fab fa-linkedin "
              component={Link}
              path="https://www.linkedin.com/in/tomaszsobczak7/"
            />
            <br />
            Zajmuje się elektroniką <br />
            oraz tworzeniem oprogramowania.
          </Typography>
        </Paper>
      </div>
    );
  }
}

Hello.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hello);
