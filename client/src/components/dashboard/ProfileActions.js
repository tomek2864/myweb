import React from "react";
import { Link } from "react-router-dom";
import { Paper, Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({});

const ProfileActions = () => {
  return (
    <div>
      <Button
        component={Link}
        type="submit"
        variant="contained"
        color="primary"
        to="/edit-profile"
      >
        Edytuj profil
      </Button>
      <Button
        component={Link}
        type="submit"
        variant="contained"
        color="primary"
        to="/experience"
      >
        Wykształcenie
      </Button>
      <Button
        component={Link}
        type="submit"
        variant="contained"
        color="primary"
        to="/education"
      >
        Edukacja
      </Button>
    </div>
  );
};

export default ProfileActions;
