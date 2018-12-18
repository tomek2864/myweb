import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const styles = {
  card: {
    maxWidth: 400,
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

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashContent;
    if (profile === null || loading) {
      dashContent = <Spinner />;
    } else {
      //Sprawdzenie czy zalogowany uzytkownik ma utworzony profil
      if (Object.keys(profile).length > 0) {
        dashContent = <h4>TODO: Wuświetlanie profiu</h4>;
      } else {
        //Uzytkownik nie posiada profilu
        dashContent = (
          <div>
            <p>Witaj {user.name}</p>
            <p>Utwórz swój profil.</p>
            <CardActions>
              <Button className={classes.button} size="small">
                Utworz profil
              </Button>
            </CardActions>
          </div>
        );
      }
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <h1>Dashboard</h1>
          {dashContent}
        </CardContent>
      </Card>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(Dashboard));
