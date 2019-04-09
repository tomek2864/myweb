import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileArticles from "./ProfileArticles";
import { getArticlesByUserHandle } from "../../actions/articleActions";

import { withStyles } from "@material-ui/core/styles";
import { getProfileByHandle } from "../../actions/profileActions";
import { Card, LinearProgress } from "@material-ui/core";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: 80,
    marginBottom: 80,

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
    maxWidth: 1200,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#EEE"
  },
  title: {
    fontSize: 14,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
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
    const { articles } = this.props.article;
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
          {/* <Button href="/">Powrót do profili</Button> */}
          <ProfileHeader profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          <ProfileArticles articles={articles} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Card className={classes.card}>{profileContent}</Card>
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
