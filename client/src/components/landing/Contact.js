import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core/";
import { Paper } from "@material-ui/core";
import posed from "react-pose";

const ContactIcon = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    backgroundColor: "#fff"
  },
  hover: {
    scale: 1.2,
    backgroundColor: "#fff"
  },
  press: {
    scale: 1.1
  }
});

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: "center"
  },
  text: {
    marginTop: 200,
    fontSize: 56,
    fontFamily: ["Scope One", "serif"].join(",")
  },
  logoLinkedIn: {
    fontSize: 120,
    display: "center"
  },
  icons: {
    textAlign: "center"
  },
  textTitle: {
    fontSize: 56,
    fontFamily: ["Scope One", "serif"].join(","),
    marginTop: 80
  },
  box: {
    margin: 25,
    display: "inline-block",
    cursor: "default",
    "&:hover": {
      cursor: "pointer"
    },
    marginBottom: 100
  }
});

class Contact extends Component {
  render() {
    const { classes } = this.props;
    const email = "tomek2864@gmail.com";
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.textTitle}>
            Zapraszam do kontaktu:
          </Typography>
          <div className={classes.icons}>
            <ContactIcon className={classes.box}>
              <Typography className={classes.logoLinkedIn}>
                <i
                  component={Link}
                  target="_blank"
                  className={"fab fa-linkedin-in"}
                />
              </Typography>
            </ContactIcon>
            <ContactIcon className={classes.box}>
              <Typography className={classes.logoLinkedIn}>
                <i
                  component={Link}
                  target="_blank"
                  className={"far fa-envelope"}
                />
              </Typography>
            </ContactIcon>
          </div>
        </Paper>
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);
