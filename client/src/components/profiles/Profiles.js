import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

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

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { classes } = this.props;
    const { profiles, loading } = this.props.profile;
    let profileContent;

    if (profiles === null || loading) {
      profileContent = <LinearProgress />;
    } else {
      if (profiles.length > 0) {
        profileContent = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileContent = <h4>Nie znaleziono takiego profilu.</h4>;
      }
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <h1>Dashboard</h1>
          {profileContent}
        </CardContent>
      </Card>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(withStyles(styles)(Profiles));
