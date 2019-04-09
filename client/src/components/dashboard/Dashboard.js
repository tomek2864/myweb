import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getArticle } from "../../actions/articleActions";
import ProfileActions from "../dashboard/ProfileActions";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  LinearProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";

import Experience from "./Experience";
import Education from "./Education";
import Articles from "./Articles";

const styles = {
  card: {
    maxWidth: 1200,
    marginBottom: 25,
    marginTop: 70,
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
    marginRight: "auto",
    padding: 16
  },
  contentCard: {
    margin: 25
  }
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getArticle();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { articles, loading_art } = this.props.article;
    let dashContent, articleContent;
    const articlesUser = [];

    if (profile === null || loading || articles === null || loading_art) {
      dashContent = <LinearProgress />; //<Spinner />;
    } else {
      //Sprawdzenie czy zalogowany uzytkownik ma utworzony profil
      if (Object.keys(profile).length > 0) {
        for (var i = 0; i < articles.length; i++) {
          if (articles[i].user === profile.user._id) {
            articlesUser[i] = articles[i];
          }
        }
        dashContent = (
          <div>
            <p>
              Witaj <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.onDeleteClick}
            >
              Usuń konto
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </div>
        );
        if (Object.keys(articlesUser).length > 0) {
          articleContent = (
            <div>
              <Articles article={articlesUser} />
            </div>
          );
        } else {
          articleContent = (
            <div>
              <p>Brak artykułów</p>
            </div>
          );
        }
      } else {
        //Uzytkownik nie posiada profilu
        dashContent = (
          <div>
            <p>Witaj {user.name}</p>
            <p>Utwórz swój profil.</p>
            <CardActions>
              <Button
                className={classes.button}
                component={Link}
                size="small"
                to="/create-profile"
              >
                Utworz profil
              </Button>
            </CardActions>
          </div>
        );
      }
    }

    return (
      <Card className={classes.card}>
        <CardContent className={classes.contentCard}>
          <h1>Panel sterowania</h1>
          {dashContent}
          {articleContent}
        </CardContent>
      </Card>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  article: state.article,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getArticle }
)(withStyles(styles)(Dashboard));
