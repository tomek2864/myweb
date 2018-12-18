import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, MenuItem, Button, Icon } from "@material-ui/core/";
import { Link } from "react-router-dom";
import classNames from "classnames";

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
            Nazywam się Tomasz Sobczak
            <br />
            <Button
              href="https://www.linkedin.com/in/tomaszsobczak7/"
              style={{
                backgroundColor: "#5cb85c",
                color: "black"
              }}
            >
              <i
                component={Link}
                target="_blank"
                className="fab fa-linkedin "
              />
            </Button>
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
