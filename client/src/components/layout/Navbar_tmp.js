import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Media from "react-media";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#242249"
    /*["@media (min-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      backgroundColor: "#000"
    }*/
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

/*
  13190c
ff795e
c1ff75
242249
655fc9 */

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.root}>
        <Media query="(max-width: 699px)">
          {matches =>
            matches ? (
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            ) : (
              <Toolbar>
                <Grid item xs={2}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      color="inherit"
                      className={classes.grow}
                    >
                      O mnie
                    </Typography>
                    <Typography
                      variant="h5"
                      color="inherit"
                      className={classes.grow}
                    >
                      Projekty
                    </Typography>
                    <Typography
                      variant="h5"
                      color="inherit"
                      className={classes.grow}
                    >
                      Kontakt
                    </Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            )
          }
        </Media>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
