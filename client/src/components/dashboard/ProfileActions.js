import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    marginRight: 16,
    marginBottom: 16
  }
});

class ProfileActions extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          component={Link}
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          to="/edit-profile"
        >
          Edytuj profil
        </Button>
        <Button
          component={Link}
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          to="/create-experience"
        >
          Dodaj nowe wykształcenie
        </Button>
        <Button
          component={Link}
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          to="/create-education"
        >
          Dodaj nowa edukacja
        </Button>
      </div>
    );
  }
}

ProfileActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileActions);
