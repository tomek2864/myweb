import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

const styles = {
  card: {
    maxWidth: 1000,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto"
  }
};

class ProfileItem extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span> zatrudniony w firmie {profile.company}</span>
            )}
          </p>
          <Link to={`/profile/${profile.handle}`}>Wyświetl profil</Link>
        </CardContent>
      </Card>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileItem);
