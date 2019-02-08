import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileArticles from "./ProfileArticles";
import { getArticlesByUserHandle } from "../../actions/articleActions";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { getProfileByHandle } from "../../actions/profileActions";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Paper
} from "@material-ui/core";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(1800 + theme.spacing.unit * 3 * 2)]: {
      width: 1800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit, // pomiedzy kolejnymi Paper
    marginBottom: theme.spacing.unit,
    display: "block",
    //flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 3}px` //up left-right down
  },
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
});

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getArticlesByUserHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;
    const { articles, loading_art } = this.props.article;
    let profileContent;

    if (
      profile === null ||
      loading ||
      this.props.article.loading ||
      articles === null
    ) {
      profileContent = <LinearProgress />;
    } else {
      profileContent = (
        <div>
          <Link to="/profiles">Powrót do profili</Link>
          <ProfileHeader profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          <ProfileAbout />
          <ProfileArticles articles={articles} />
          <ProfileGithub />
        </div>
      );
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardContent>{profileContent}</CardContent>
            </Card>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticlesByUserHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  article: state.article
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getArticlesByUserHandle }
)(withStyles(styles)(Profile));
