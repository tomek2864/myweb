import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  contentCard: {
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  typograhyTitle: {
    textAlign: "center",
    fontSize: 28
  },
  textAboutMe: {
    textAlign: "justify",
    fontSize: 16
  },
  grid: {
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
});

class ProfileHeader extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;
    return (
      <div>
        <Grid container>
          <Grid className={classes.grid} item xs />
          <Grid className={classes.grid} item xs={11}>
            <Grid className={classes.grid} item xs={8}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.typograhyTitle}>
                  {profile.user.name}
                </Typography>
                <Typography className={classes.textAboutMe}>
                  <div>{profile.bio}</div>
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={4}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.typograhyTitle}>
                  {profile.user.name}
                </Typography>
                <Typography className={classes.textAboutMe}>
                  <div>{profile.bio}</div>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Grid className={classes.grid} item xs />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileHeader);
